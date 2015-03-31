'use strict';

var util = require("util");

var Menu = function () {};

util.inherits(Menu, Array);

Menu.prototype.add = function (title, order, path) {

  // Create menu item.
  var menuItem = {
    title: title,
    order: order,
    paths: [ path ]
  };

  // Add optional alternate paths.
  var length = path.length;
  if (length >= 6 && path.substr(-6) === '/index') {
    menuItem.paths.push( path.substr(0, length - 5) );
    menuItem.paths.push( path.substr(0, length - 6) );
  }

  // Add function to determine if menu item is active.
  menuItem.isActive = function (baseUrl) {
    return this.paths.some(function (path) {
      return path === baseUrl;
    });
  };

  // Store the menu item.
  this.push(menuItem);
};

Menu.prototype.branch = function (title, order) {

  // Create sub-menu item.
  var menuItem = {
    title: title,
    order: order,
    children: new Menu()
  };

  // Add function to determine if sub-menu item is active.
  menuItem.isActive = function (baseUrl) {
    return this.children.some(function (item) {
      return item.isActive(baseUrl);
    });
  };

  // Store the sub-menu item.
  this.push(menuItem);

  // Pass back the sub-menu item.
  return menuItem;
};

module.exports = Menu;
