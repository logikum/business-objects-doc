'use strict';

var fs = require('fs');
var path = require('path');

var referenceDir = '../business-objects/api/v1.1.0/docstrap';
var referenceFile = 'references.txt';
var count = 0;
//var text = '[~]: http://logikum.github.io/business-objects\r\n';
var text = '[~]: /api/v1.1.0/docstrap\r\n';

// Read directory items.
var items = fs.readdirSync(path.join(process.cwd(), referenceDir));

items.forEach(function (item) {

  // Get full path of item.
  var itemPath = path.join(referenceDir, item);
  // Get item info.
  var stats = fs.statSync(itemPath);

  if (stats.isFile() && path.extname(item) === '.html' &&
      path.extname(path.basename(item, '.html')) !== '.js') {

    var name = path.basename(item, '.html');
    if (name.indexOf('.') >= 0)
      name = name.substr(name.lastIndexOf('.') + 1);

    text += '[' + name + ']: ~/' + item + '\r\n';
    count++;
  }
});

fs.writeFile(path.join(process.cwd(), referenceFile), text);

console.log('Count of references: ' + count);
