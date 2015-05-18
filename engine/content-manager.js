'use strict';

var fs = require('fs');
var path = require('path');
var marked = require('marked');
var LayoutStore = require('./layout-store.js');
var ContentStore = require('./content-store.js');
var MenuStore = require('./menu-store.js');

function ContentManager (contentDir, layoutFile) {

  var self = this;
  var contentsPath = path.join(process.cwd(), contentDir);
  var layout = null;
  var contents = new ContentStore();
  var menus = new MenuStore();

  //region Menu building

  function createMenuItem (menu, definition, contentPath, isDirectory) {
    // Default values for item properties,
    var order = 1;
    var title = '-?-';

    // Get item properties,
    if (definition.indexOf(',') > 0) {
      var both = definition.split(',');
      order = parseInt(both[0].trim(), 10);
      title = both[1].trim();
      if (isNaN(order))
        throw new Error('Invalid order in menu definition (' + contentPath + '): ' + definition);
    } else
      title = definition.trim();

    //console.log(contentPath + ': [' + order + '] ' + title);

    if (isDirectory)
    // Add sub-menu item.
      return menu.branch(title, order);
    else {
      // Add menu item.
      var length = contentPath.length;
      if (length >= 6 && contentPath.substr(-6) === '/index') {
        // Cut down closing index.
        var end = length > 6 ? 6 : 5;
        menu.add(title, order, contentPath.substr(0, length - end));
      }
      else
        menu.add(title, order, contentPath);
      return title !== '---';
    }
  }

  function buildMenuItem (menu, contentPath, text) {
    // Find sub-menu info.
    var firstLine = text.substr(0, text.indexOf('\n'));
    if (firstLine.length > 9 && firstLine.substr(0, 9) === '[//]: # (') {
      // Get sub-menu info.
      var definition = firstLine.substr(9, firstLine.indexOf(')') - 9);
      // Create menu item.
      return createMenuItem(menu, definition, contentPath, false);
    } else
      return true;
  }

  function buildSubMenu (menu, itemPath, contentPath) {
    // Get sub-menu info.
    try {
      var stats = fs.statSync(itemPath);
      if (stats && stats.isFile()) {
        // Read sub-menu info.
        var definition = fs.readFileSync(itemPath, { encoding: 'utf8' });
        // Create sub-menu item.
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
        // Read, convert and store the markdown file.
        var basename = path.basename(item, '.md');
        // Determine content path.
        var contentPath = contentRoot + '/' + basename;
        // Get content.
        var text = fs.readFileSync(itemPath, { encoding: 'utf-8' });
        // Create menu item.
        if (buildMenuItem(menuNode, contentPath, text)) {
          // Convert content.
          var html = marked(text);
          // Store content.
          cm.add(html, contentPath);
        }
        //console.log('Content added: ' + contentPath);
      }
    });
  }

  //endregion

  //region Initialization

  function initialize() {
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
