'use strict';

var Menu = require('./menu.js');

var ContentManager = function () {

  var contents = [];
  var map = {};
  var index404;

  this.menu = new Menu();

  this.add = function (content, path) {
    if (arguments.length > 1) {
      // Store content.
      contents.push(content);

      // Create default map.
      var index = contents.length - 1;
      addMap(path, index);

      // Add optional alternate maps.
      var length = path.length;
      if (length >= 6 && path.substr(-6) === '/index') {
        addMap(path.substr(0, length - 5), index);
        addMap(path.substr(0, length - 6), index);
      }
    }
  };

  function addMap (path, index) {
    map[path] = index;
    // Find custom error content.
    if (path === '/404')
      index404 = index;
  }

  this.get = function (path) {
    if (map[path] !== undefined)
      // The requested content is found.
      return contents[map[path]];
    else if (index404 !== undefined)
      // The requested content is not found - custom error.
      return contents[index404];
    else
    // The requested content is not found - no content.
      return '';
  }
};

module.exports = ContentManager;
