'use strict';

var express = require('express');
var serveStatic = require('serve-static');
var contentReader = require('./content-reader.js');
var LayoutManager = require('./layout-manager.js');

var app = module.exports = express();

var contents = contentReader('/contents', '');
var layout = new LayoutManager('/public/layout.html', contents.menu);

// Set static folders.
app.use(serveStatic('public'));

// Serve markdown contents.
app.use('*', function (req, res, next) {
  if (req.baseUrl.length > 6 && req.baseUrl.substr(0, 7) === '/public')
    next();
  res.status(200).send( layout.get( contents.get(req.baseUrl), req.baseUrl ));
});

var host = '127.0.0.1';
var port = 3000;
var server = app.listen(port, host, function () {
  console.log('Business objects documentation listening at http://%s:%s', host, port)
});
