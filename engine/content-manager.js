'use strict';

var fs = require('fs');
var path = require('path');
var marked = require('marked');
var highlight = require('highlight.js');
var referenceReader = require('./reference-reader.js');
var LayoutStore = require('./layout-store.js');
var ContentStore = require('./content-store.js');
var MenuStore = require('./menu-store.js');

//region Marked customization

// Synchronous highlighting with highlight.js
marked.setOptions({
  highlight: function (code) {
    return highlight.highlightAuto(code, ['javascript']).value;
  }
});

var renderer = new marked.Renderer();

renderer.table = function (header, body) {
  var match = /%(\w+\d?)%/.exec(header);
  if (match === null) {
    header = header.replace(/<\/th>\n<th>/g, '</th>\n<th class="text-center">');
    body = body.replace(/<\/td>\n<td>/g, '</td>\n<td class="text-center">');
    return '<table class="table table-condensed">\n' +
        '  <thead>\n' +
        header + '\n' +
        '  </thead>\n' +
        '  <tbody>\n' +
        body + '\n' +
        '  </tbody>\n' +
        '</table>\n';
  } else
  switch (match[1]) {
    case 'args':
      body = body
          .replace(/<tr>\n<td>/g, '<tr>\n<td class="arg-name"><code>')
          .replace(/<\/td>\n<td>/g, '</code></td>\n<td class="arg-desc">');
      return '<div class="arguments">\n' +
          '  <table class="table table-condensed">\n' +
          '    <tbody>\n' +
          body + '\n' +
          '    </tbody>\n' +
          '  </table>\n' +
          '</div>\n';
    case 'indent1':
    case 'indent2':
    case 'indent3':
    case 'indent4':
      header = header.replace(match[0], '');
      return  '<div class="row">' +
          //    '  <div class="col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">\n' +
          '  <div class="' + getDivClass(match[1]) + '">\n' +
          '    <table class="table table-condensed">\n' +
          '      <thead>\n' +
          header + '\n' +
          '      </thead>\n' +
          '      <tbody>\n' +
          body + '\n' +
          '      </tbody>\n' +
          '    </table>\n' +
          '  </div>\n' +
          '</div>\n';
    default:
      return '<p class="bg-danger">' + match[0] + '</p>';
  }
};
function getDivClass(name) {
  var offset = new Number(name.substr(6));
  var width = 12 - 2 * offset;
  return 'col-sm-' + width + ' col-sm-offset-' + offset +
    ' col-md-' + width + ' col-md-offset-' + offset +
    ' col-lg-' + width + ' col-lg-offset-' + offset;
}

renderer.link = function (href, title, text) {
  if (href.substr(0, 7) === 'http://')
    return '<a href="' + href + '" title="' + title + '" class="bo-api">' + text + '</a>';
  else
    return '<a href="' + href + '" title="' + title + '">' + text + '</a>';
};

//endregion

function ContentManager (contentDir, layoutFile, referenceFile) {

  var self = this;
  var references = null;
  var layout = null;
  var contents = new ContentStore();
  var menus = new MenuStore();

  //region Menu building

  function createMenuItem (menu, definition, contentPath, isDirectory) {

    // Default values for item properties,
    var order = parseInt(definition.order || 1, 10);
    var title = definition.title || '-?-';
    var umbel = definition.umbel && definition.umbel.toLowerCase() == 'true';
    if (isNaN(order)) {
      order = 0;
      title = '* ' + title;
    }

    if (isDirectory)
    // Add sub-menu item.
      return menu.branch(title, order);
    else {
      // Add menu item.
      var path = contentPath;
      var length = path.length;
      if (length >= 6 && path.substr(-6) === '/index') {
        // Cut down closing index.
        var end = length > 6 ? 6 : 5;
        path = path.substr(0, length - end);
      }
      menu.add(title, order, path, umbel);
      return title !== '---';
    }
  }

  function buildDefinition (context) {
    var definition = null;

    var lines = context.text.split('\n');

    // Starts with menu info?
    if (lines.length && lines[0].substring(0, 3) === '+++') {

      definition = { };
      var line = lines.shift();
      var canDo = true;

      // Build menu definition.
      do {
        line = lines.shift();
        if (line.substring(0, 3) === '+++')
          canDo = false;
        else {
          var pair = line.split(':');
          if (pair.length > 1) {
            definition[pair[0].trim()] = pair[1].trim();
          }
        }
      } while (canDo);

      context.text = lines.join('\n');
    }
    return definition;
  }

  function buildMenuItem (menu, context) {

    // Starts with menu info?
    var definition = buildDefinition(context);
    if (definition)
      return createMenuItem(menu, definition, context.path, false);
    else
      return true;
  }

  function buildSubMenu (menu, itemPath, contentPath) {
    // Get sub-menu info.
    try {
      var stats = fs.statSync(itemPath);
      if (stats && stats.isFile()) {
        var context = { };

        // Read sub-menu info.
        context.text = fs.readFileSync(itemPath, { encoding: 'utf8' });
        var definition = buildDefinition(context);

        // Create sub-menu item.
        if (definition)
          return createMenuItem(menu, definition, contentPath, true);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  //endregion

  //region Content reading

  function addContents (cm, contentDir, contentRoot, menuNode) {

    // Read directory items.
    var items = fs.readdirSync(contentDir);

    items.forEach(function (item) {

      // Get full path of item.
      var itemPath = path.join(contentDir, item);
      // Get item info.
      var stats = fs.statSync(itemPath);

      if (stats.isDirectory()) {
        // Determine content path.
        var directoryPath = contentRoot + '/' + item;
        // Create menu item.
        var directoryNode = buildSubMenu(menuNode, itemPath + '.menu', directoryPath);
        // Read subdirectory.
        if (directoryNode)
          addContents(cm, itemPath, directoryPath, directoryNode.children);
        else
          addContents(cm, itemPath, directoryPath, menuNode);
      }
      else if (stats.isFile() && path.extname(item) === '.md') {
        var context = { };
        // Read, convert and store the markdown file.
        var basename = path.basename(item, '.md');
        // Determine content path.
        context.path = contentRoot + '/' + basename;
        // Get content.
        context.text = fs.readFileSync(itemPath, { encoding: 'utf-8' });
        // Create menu item.
        if (buildMenuItem(menuNode, context)) {
          // Convert content.
          var html = marked(context.text + references, { renderer: renderer });
          // Store content.
          cm.add(html, context.path);
        }
        //console.log('Content added: ' + contentPath);
      }
    });
  }

  //endregion

  //region Initialization

  function initialize() {
    references = referenceReader(referenceFile);
    addContents(contents, path.join(process.cwd(), contentDir), '', menus);
    layout = new LayoutStore(layoutFile, menus);
  }

  //endregion

  initialize();

  //region Public methods

  this.get = function (path) {
    return layout.get( contents.get(path), path );
  };

  this.restart = function () {
    var layout = null;
    var contents = new ContentStore();
    var menus = new MenuStore();

    initialize();

    return self.get('/');
  };

  this.setRoutes = function (app) {

    // Reread the contents.
    app.use('/restart', function (req, res, next) {
      res.status(200).send( self.restart() );
    });

    // Serve markdown contents.
    app.use('*', function (req, res, next) {
      res.status(200).send( self.get(req.baseUrl) );
    });
  };

  //endregion
}

module.exports = ContentManager;
