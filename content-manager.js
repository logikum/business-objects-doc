'use strict';

var ContentManager = function () {

  var contents = [];
  var map = {};
  var index404;

  this.menu = [];

  this.add = function (content, paths) {
    if (arguments.length > 0) {
      // Store content.
      contents.push(content);
      // Create maps.
      var index = contents.length - 1;
      for (var i = 1; i < arguments.length; i++) {
        var path = arguments[i];
        map[path] = index;
        if (path === '/404')
          index404 = index;
      }
    }
  };

  this.get = function (path) {
    if (map[path])
      return contents[map[path]];
    else if (index404 !== undefined)
      return contents[index404];
    else
      return '';
  }
};

module.exports = ContentManager;
