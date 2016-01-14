'use strict';

var fs = require( 'fs' );
var path = require( 'path' );
var marked = require( 'marked' );
var config = require( './configuration.js' );
var i18n = require( './i18n.js' );
var getRenderer = require( './marked-renderer.js' );

var CAPTCHA_JS = '<script src="https://www.google.com/recaptcha/api.js?hl=§"></script>';

var LANGUAGE = '{{language}}';
var TITLE = '{{title}}';
var DESCRIPTION = '{{description}}';
var KEYWORDS = '{{keywords}}';
var HEAD = '{{head}}';

var MAIN = '{{main}}';
var HEADER = '{{header}}';
var MENU = '{{menu}}';
var CONTENT = '{{content}}';
var FOOTER = '{{footer}}';

var renderer = getRenderer( marked );

var LayoutStore = function( layoutDir, documentFile, layoutFile, menus ) {

  var layouts = { };
  var components = { };
  var defaultLayout = path.basename( layoutFile, '.html' );
  var languages = [ ];

  //region Helper

  function getRE( pattern ) {
    var re = new RegExp( pattern.replace( /\{/g, '\\{' ), 'g' );
    //var src = re.source;
    return re;
  }

  function merge( first, second, separator ) {
    var merged = first || '';
    merged +=  second ? separator + second : '';
    return merged;
  }

  //endregion

  //region Layout reading

  function getAll() {
    var layoutsPath = path.join( process.cwd(), layoutDir );

    // Find document file.
    getDocument( layoutsPath );

    // Read subdirectory items as language containers.
    var items = fs.readdirSync( layoutsPath );
    items.forEach( function( item ) {

      // Get full path of item.
      var itemPath = path.join( layoutsPath, item );
      // Get item info.
      var stats = fs.statSync( itemPath );

      if (stats.isDirectory()) {
        // Create new placeholders for the language.
        layouts[item] = { };
        components[item] = { };

        // Find and add components.
        getComponents( components[item], itemPath );

        // Find and add layouts.
        getLayouts( layouts[item], components[item], itemPath );
      }
    } );
  }

  function getDocument( documentDir ) {
    var documentPath = path.join( documentDir, documentFile );

    // Get layouts info.
    var stats = fs.statSync( documentPath );

    if (stats && stats.isFile())
      layouts.document = fs.readFileSync( documentPath, { encoding: 'utf8' } );
    else
      throw new Error( 'Document file not found: ' + documentPath );
  }

  function getComponents( itemStore, itemDir ) {
    // Read directory items.
    var items = fs.readdirSync( itemDir );

    items.forEach( function( item ) {
      var itemPath = path.join( itemDir, item );

      // Get item info.
      var stats = fs.statSync( itemPath );

      if (stats.isFile() && path.extname( item ) === '.md') {

        // Read, convert and store the markdown file.
        var basename = path.basename( item, '.md' );

        // Get file content.
        var text = fs.readFileSync( itemPath, { encoding: 'utf-8' } );

        // Convert content.
        text = marked( text, { renderer: renderer } );

        // Store content.
        itemStore[basename] = text;
      }
    } );
  }

  function getLayouts( itemStore, partStore, itemDir ) {
    // Read directory items.
    var items = fs.readdirSync( itemDir );
    var hasDefault = false;

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var itemPath = path.join( itemDir, item );

      // Get item info.
      var stats = fs.statSync( itemPath );

      if (stats.isFile() && path.extname( item ) === '.html') {

        // Read, process and store the layout file.
        var basename = path.basename( item, '.html' );

        // Get file content.
        var text = fs.readFileSync( itemPath, { encoding: 'utf8' } );

        // Process the layout.
        var header = partStore.header || '';
        var footer = partStore.footer || '';
        text = text.replace( getRE( HEADER ), header );
        text = text.replace( getRE( FOOTER ), footer );

        // Store content.
        itemStore[basename] = text;

        // Check default layout.
        if (item == layoutFile)
          hasDefault = true;
      }
    }
    // Default layout has found?
    if (!hasDefault)
      throw new Error( 'Default layout file not found: ' + path.join( itemDir, layoutFile ) );
  }

  //endregion

  //region Menu building

  function getMenu( baseUrl, language ) {
    var menu = '';
    menu += '<ul class="nav navbar-nav">\n';
    menu += getMenuItems( menus[language], baseUrl );
    menu += '</ul>\n';
    menu += '<ul class="nav navbar-nav navbar-right">\n';
    menu += getLanguageItems( language );
    menu += '</ul>\n';
    return menu;
  }

  function getMenuItems( items, baseUrl ) {
    var menu = '';
    items.sort( function( a, b ) {
      if (a.order < b.order)
        return -1;
      if (a.order > b.order)
        return 1;
      return 0;
    } ).forEach( function( item ) {
      if (item.paths) {
        if (item.text === '---')
        // Separator:
          menu += '<li class="divider"></li>';
        else
        // Menu line:
          menu += '<li' + (item.isActive(baseUrl) ? ' class="active"' : '') +
              '><a href="' + item.paths[0] + '">' + item.text + '</a></li>\n';
      } else if (!item.hidden) {
        // Menu node:
        menu += '<li class="dropdown' + (item.isActive(baseUrl) ? ' active' : '') + '">\n';
        menu += '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">' +
            item.text + ' <span class="caret"></span></a>\n';
        menu += '<ul class="dropdown-menu" role="menu">\n';
        menu += getMenuItems(item.children, baseUrl);
        menu += '</ul>\n';
        menu += '</li>\n';
      }
    });
    return menu;
  }

  function getLanguageItems( language ) {

    function nameOf( item ) {
      return config.locale[ item ] || item;
    }
    function linkOf( item ) {
      return '<li><a href="/set-language/' + item + '">' + nameOf(item) + '</a></li>\n';
    }

    if (languages.length > 2) {

      // Dropdown list of selectable languages.
      var list = '<li class="dropdown">\n';
      list += '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">' +
          nameOf(language) + ' <span class="caret"></span></a>\n';
      list += '<ul class="dropdown-menu" role="menu">\n';
      languages.forEach( function( lang ) {
        if (lang !== language)
          list += linkOf(lang);
      });
      list += '</ul>\n';
      list += '</li>\n';
      return list;

    } else if (languages.length == 2) {

      // Link to alternate language.
      var lang = languages[0] === language ? languages[1] : languages[0];
      return linkOf(lang);

    } else
      // No language selection.
      return '';
  }

  //endregion

  //region Function get()

  this.get = function( store, baseUrl, language ) {

    var layoutStore = layouts[language];
    var componentStore = components[language];

    if (layoutStore && componentStore) {
      var t = i18n( language, 'layout' );
      var definition = store.getDefinition( baseUrl );

      var document = layouts.document;
      var layout = definition.layout && layoutStore[definition.layout] ?
          layoutStore[definition.layout] : layoutStore[defaultLayout];

      var title = merge( t.title, definition.title, ' ♦ ' );
      var description = definition.description || '';
      var keywords = merge( t.keywords, definition.keywords, ', ' );
      var head = baseUrl == '/kapcsolat' || baseUrl == '/contact' ?
          CAPTCHA_JS.replace( /§/, language ) : '';

      document = document.replace( getRE( LANGUAGE ), language );
      document = document.replace( getRE( TITLE ), title );
      document = document.replace( getRE( DESCRIPTION ), description );
      document = document.replace( getRE( KEYWORDS ), keywords );
      document = document.replace( getRE( HEAD ), head );

      var leftSide = '';
      var rightSide = '';
      if (definition.left && definition.right) {
        leftSide  = '    <div class="col-lg-3 col-md-3 col-sm-3">\n' +
            '      <h1>&nbsp;</h1>\n      ' +
            (componentStore[definition.left] || '') +
            '\n    </div>\n' +
            '    <div class="col-lg-6 col-md-6 col-sm-6">\n';
        rightSide = '\n    </div>\n' +
            '    <div class="col-lg-3 col-md-3 col-sm-3">\n' +
            '      <h1>&nbsp;</h1>\n      ' +
            (componentStore[definition.right] || '') +
            '\n    </div>\n';
      } else if (definition.left) {
        leftSide  = '    <div class="col-lg-3 col-md-3 col-sm-3">\n' +
            '      <h1>&nbsp;</h1>\n      ' +
            (componentStore[definition.left] || '') +
            '\n    </div>\n' +
            '    <div class="col-lg-9 col-md-9 col-sm-9">\n';
        rightSide = '\n    </div>\n';
      } else if (definition.right) {
        leftSide  = '    <div class="col-lg-9 col-md-9 col-sm-9">\n';
        rightSide = '\n    </div>\n' +
            '    <div class="col-lg-3 col-md-3 col-sm-3">\n' +
            '      <h1>&nbsp;</h1>\n      ' +
            (componentStore[definition.right] || '') +
            '\n    </div>\n';
      } else {
        leftSide  = '    <div class="col-lg-12 col-md-12 col-sm-12">\n';
        rightSide = '\n    </div>\n';
      }

      layout = layout.replace( getRE( MENU ), getMenu( baseUrl, language ) );
      layout = layout.replace( getRE( CONTENT ), leftSide + store.getContent( baseUrl ) + rightSide );
      return document.replace( getRE( MAIN ), layout );
    } else
      return '<html><head></head><body>Unknown language: ' + language + '</body></html>';
  };

  //endregion

  getAll();

  for (var prop in menus) {
    if( menus.hasOwnProperty( prop ) ) {
      languages.push( prop );
    }
  }
};

module.exports = LayoutStore;
