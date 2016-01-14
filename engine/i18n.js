'use strict';

var fs = require( 'fs' );
var path = require( 'path' );
var config = require( './configuration.js' );

//region Locale reading

function addLocales( cm, localeDir ) {

  // Read directory items.
  var items = fs.readdirSync( localeDir );

  items.forEach( function( item ) {

    // Get full path of item.
    var itemPath = path.join( localeDir, item );
    // Get item info.
    var stats = fs.statSync( itemPath );

    if (stats.isDirectory()) {
      cm[item] = { };
      // Read subdirectory.
      addContents( cm[item], itemPath );
    }
    else if (stats.isFile() && path.extname( item ) === '.json') {
      // Read and store the locale file.
      var basename = path.basename( item, '.json' );
      // Get locale collection.
      cm[basename] = require( itemPath );
    }
  } );
}

//endregion

//region Initialization

var locales = { };
var localesDir = path.join( process.cwd(), config.content.locales );

// Read subdirectory items as language containers.
var items = fs.readdirSync( localesDir );
items.forEach( function( item ) {

  // Get full path of item.
  var itemPath = path.join( localesDir, item );
  // Get item info.
  var stats = fs.statSync( itemPath );

  if (stats.isDirectory()) {
    // Create new managers for the language.
    locales[item] = { };
    // Find and add localization strings.
    addLocales( locales[item], itemPath, '' );
  }
} );

//endregion

module.exports = function ( language, keyPath ) {
  var current = locales;

  var keys = [ language ];
  keyPath.split( '.' ).forEach( function( key ) {
    keys.push( key );
  } );

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (current[key])
      current = current[key];
    else
      break;
  }
  return current;
};
