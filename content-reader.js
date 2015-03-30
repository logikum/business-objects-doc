'use strict';

var fs = require('fs');
var path = require('path');
var markdown = require('markdown').markdown;
var ContentManager = require('./content-manager.js');

var cm = new ContentManager();

function addContents (contentDir, contentRoot) {

  // Read directory items.
  var items = fs.readdirSync(contentDir);

  items.forEach(function (item) {

    // Get full path of item.
    var itemPath = path.join(contentDir, item);
    // Get item info.
    var stats = fs.statSync(itemPath);

    if (stats.isDirectory())
      // Read subdirectory.
      addContents(itemPath, contentRoot + '/' + item);

    else if (stats.isFile() && path.extname(item) === '.md') {
      // Read, convert and store the markdown file.
      var basename = path.basename(item, '.md');
      // Determine content path.
      var contentPath = contentRoot + '/' + basename;
      // Get content.
      var text = fs.readFileSync(itemPath, { encoding: 'utf8' });
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
  addContents(path.join(process.cwd(), contentDir), contentRoot);
  // Return the content manager.
  return cm;
}

module.exports = contentReader;
