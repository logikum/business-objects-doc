'use strict';

var fs = require('fs');
var path = require('path');

var CONTENT = '{{content}}';

var LayoutManager = function (layoutFile) {

  var layoutFront = '';
  var layoutBack = '';

  function getLayout () {
    var layoutPath = path.join(process.cwd(), layoutFile);
    var stats = fs.statSync(layoutPath);
    if (stats && stats.isFile()) {
      var text = fs.readFileSync(layoutPath, { encoding: 'utf8' });
      var index = text.indexOf(CONTENT);
      if (index < 0)
        throw new Error('Missing content placeholder from the layout file.');
      layoutFront = text.substr(0, index);
      layoutBack = text.substr(index + 11);
    }
  }

  getLayout();

  this.get = function (content) {
    return layoutFront + content + layoutBack;
  }
};

module.exports = LayoutManager;
