'use strict';

var fs = require('fs');
var path = require('path');
var markdown = require('markdown').markdown;
var ContentManager = require('./content-manager.js');

var cm = new ContentManager();

//region Menu building

function buildMenuItem (menu, contentPath, text) {
  var firstLine = text.substr(0, text.indexOf('\n'));
  if (firstLine.length > 9 && firstLine.substr(0, 9) === '[//]: # (') {
    var definition = firstLine.substr(9, firstLine.indexOf(')') - 9);
    createMenuItem(menu, definition, contentPath, false);
  }
}

function buildSubMenu (menu, itemPath, contentPath) {
  var stats = fs.statSync(itemPath);
  if (stats && stats.isFile()) {
    var definition = fs.readFileSync(itemPath, { encoding: 'utf8' });
    return createMenuItem(menu, definition, contentPath, true);
  }
}

function createMenuItem (menu, definition, contentPath, isDirectory) {
  var order = '1';
  var title = '-?-';

  if (definition.indexOf(',') > 0) {
    var both = definition.split(',');
    order = both[0].trim();
    title = both[1].trim();
  } else
    title = definition.trim();

  console.log(contentPath + ': [' + order + '] ' + title);

  var menuItem = {
    title: title,
    //path: contentPath,
    order: order,
    children: []
  };
  if (isDirectory)
    menuItem.children = [];
  else
    menuItem.path = contentPath;

  menu.push(menuItem);

  return menuItem;
}

//endregion

function addContents (contentDir, contentRoot, menuNode) {

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
      addContents(itemPath, directoryPath, directoryNode.children);
    }
    else if (stats.isFile() && path.extname(item) === '.md') {
      // Read, convert and store the markdown file.
      var basename = path.basename(item, '.md');
      // Determine content path.
      var contentPath = contentRoot + '/' + basename;
      // Get content.
      var text = fs.readFileSync(itemPath, { encoding: 'utf8' });
      // Create menu item.
      buildMenuItem(menuNode, contentPath, text);
      // Store content.
      var html = markdown.toHTML(text);
      // Store content.
      if (basename === 'index')
        cm.add(html, contentRoot, contentRoot + '/', contentPath);
      else
        cm.add(html, contentPath);
      //console.log('Content added: ' + contentPath);
    }
  });
}

function contentReader (contentDir, contentRoot) {

  // Find and add markdown contents.
  addContents(path.join(process.cwd(), contentDir), contentRoot, cm.menu);
  // Return the content manager.
  return cm;
}

module.exports = contentReader;
