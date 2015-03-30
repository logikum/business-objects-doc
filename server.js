'use strict';

var express = require('express');
var serveStatic = require('serve-static');

var app = module.exports = express();

// Set static folders.
app.use(serveStatic('public', { index: 'index.html' }));

var host = '127.0.0.1';
var port = 3000;
var server = app.listen(port, host, function () {
  console.log('Business objects documentation listening at http://%s:%s', host, port)
});
