'use strict';

var express = require('express');
var serveStatic = require('serve-static');
var ContentManager = require('./engine/content-manager.js');

var app = module.exports = express();

var contents = new ContentManager('/contents', '/public/layout.html', '/contents/references.txt');

// Set static folders.
app.use(serveStatic('public'));

// Set language and markdown routes.
contents.setRoutes(app);

var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;
var server = app.listen(port, host, function () {
  console.log('Business objects documentation listening at http://%s:%s', host, port)
});
