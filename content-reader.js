'use strict';

var fs = require('fs');
var path = require('path');
var markdown = require('markdown').markdown;
var ContentManager = require('./content-manager.js');

var cm = new ContentManager();

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
  var stats = fs.statSync(itemPath);
  if (stats && stats.isFile()) {
    // Read sub-menu info.
    var definition = fs.readFileSync(itemPath, { encoding: 'utf8' });
    // Create sub-menu item.
    return createMenuItem(menu, definition, contentPath, true);
  }
}

//endregion

//region Content reading

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
      if (buildMenuItem(menuNode, contentPath, text)) {
        // Convert content.
        var html = markdown.toHTML(text);
        // Store content.
        cm.add(html, contentPath);
      }
      //console.log('Content added: ' + contentPath);
    }
  });
}

//endregion

function contentReader (contentDir, contentRoot) {

  // Find and add markdown contents.
  addContents(path.join(process.cwd(), contentDir), contentRoot, cm.menu);
  // Return the content manager.
  return cm;
}

module.exports = contentReader;
