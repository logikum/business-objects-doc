'use strict';

var express = require('express');
var serveStatic = require('serve-static');
var contentReader = require('./content-reader.js');
var LayoutManager = require('./layout-manager.js');

var app = module.exports = express();

var layout = new LayoutManager('/public/index.html');
var contents = contentReader('/contents', '');

app.use('*', function (req, res, next) {
  if (req.baseUrl.length > 6 && req.baseUrl.substr(0, 7) === '/public')
    next();
  //res.status(200).send( markdown.toHTML('Hello *World*!') );
  res.status(200).send( layout.get( contents.get(req.baseUrl) ));
});

// Set static folders.
app.use(serveStatic('public'));

var host = '127.0.0.1';
var port = 3000;
var server = app.listen(port, host, function () {
  console.log('Business objects documentation listening at http://%s:%s', host, port)
});
