'use strict';

var fs = require('fs');
var path = require('path');

var MENU = '{{menu}}';
var CONTENT = '{{content}}';

var LayoutManager = function (layoutFile, menuItems) {

  var layoutFront = '';
  var layoutMiddle = '';
  var layoutBack = '';

  function getLayout () {
    var layoutPath = path.join(process.cwd(), layoutFile);
    var stats = fs.statSync(layoutPath);
    if (stats && stats.isFile()) {
      var text = fs.readFileSync(layoutPath, { encoding: 'utf8' });

      var menuIndex = text.indexOf(MENU);
      if (menuIndex < 0)
        throw new Error('Missing menu placeholder from the layout file.');
      var contentIndex = text.indexOf(CONTENT);
      if (contentIndex < 0)
        throw new Error('Missing content placeholder from the layout file.');

      layoutFront = text.substr(0, menuIndex);
      layoutMiddle = text.substr(menuIndex + 8, contentIndex - menuIndex - 8);
      layoutBack = text.substr(contentIndex + 11);
    }
  }

  function getMenu (baseUrl) {
    var menu = '';
    menu += '<ul class="nav navbar-nav">\n';
    menu += getMenuItems(menuItems, baseUrl);
    menu += '</ul>\n';
    return menu;
  }

  function getMenuItems (items, baseUrl) {
    var menu = '';
    items.sort(function (a, b) {
      if (a.order < b.order)
        return -1;
      if (a.order > b.order)
        return 1;
      return 0;
    }).forEach(function (item) {
      // Option: <li class="divider"></li>

      if (item.paths) {
        if (item.title === '---')
          menu += '<li class="divider"></li>';
        else
          menu += '<li' + (item.isActive(baseUrl) ? ' class="active"' : '') +
            '><a href="' + item.paths[0] + '">' + item.title + '</a></li>\n';
      } else {
        menu += '<li class="dropdown' + (item.isActive(baseUrl) ? ' active' : '') + '">\n';
        menu += '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">' +
                 item.title + ' <span class="caret"></span></a>\n';
        menu += '<ul class="dropdown-menu" role="menu">\n';
        menu += getMenuItems(item.children, baseUrl);
        menu += '</ul>\n';
        menu += '</li>\n';
      }
    });
    return menu;
  }

  getLayout();
  getMenu();

  this.get = function (content, baseUrl) {
    return layoutFront + getMenu(baseUrl) + layoutMiddle + content + layoutBack;
  }
};

module.exports = LayoutManager;
