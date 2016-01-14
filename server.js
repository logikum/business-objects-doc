'use strict';

var express = require( 'express' );
var path = require( 'path' );
var favicon = require( 'serve-favicon' );
var helmet = require( 'helmet' );
var compression = require( 'compression' );
var serveStatic = require( 'serve-static') ;
var session = require( 'express-session' );
var RedisStore = require( 'connect-redis' )( session );
var config = require( './engine/configuration.js' );
var ContentManager = require( './engine/content-manager.js' );

// Set up content manager.
var contents = new ContentManager( config.content.contents, config.content.layouts );

// Create application.
var app = module.exports = express();

// Serve favicon.
app.use( favicon( path.join( __dirname, config.content.public, 'favicon.ico' ) ) );

// Secure the application.
app.use( helmet() );

// Set up session handling.
app.use( session( {
  store: new RedisStore( config.redis ),
  secret: config.session.secret,
  resave: config.session.resave,
  saveUninitialized: config.session.saveUninitialized
} ) );

// Compress all requests.
app.use( compression() );

// Serve static files.
app.use( serveStatic( config.content.public, { index: false } ) );

// Set language and markdown routes.
contents.setRoutes( app );

var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;
var server = app.listen( port, host, function () {
  console.log( 'Business objects documentation listening at http://%s:%s', host, port );
} );
