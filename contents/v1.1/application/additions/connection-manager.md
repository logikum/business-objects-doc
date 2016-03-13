# ConnectionManager class

> * [Usual additions](/application/additions)
> * _ConnectionManager class_
> * [daoBuilder function](dao-builder)
> * [User class](user)
> * [getUser function](get-user)
> * [getLocale function](get-locale)

The ConnectionManager object will provide the connections (and transactions) for each
data store inside the business object instances during data portal actions. The class
must inherit the [ConnectionManagerBase] class and override the methods of the base
class:

* __openConnection__( dataSource, callback )
* __closeConnection__( dataSource, connection, callback )
* __beginTransaction__( dataSource, callback )
* __commitTransaction__( dataSource, connection, callback )
* __rollbackTransaction__( dataSource, connection, callback )

> The callback function is valid for asynchronous models only, synchronous models expect
> a return value.

The above functions have the following arguments:

* __dataSource__  
  The name of the data source.
* __connection__  
  The current connection object.
* __callback__  
  _For asynchronous objects:_ A function with callback(err, result) signature, where
  `err` is the eventual error and `result` is a connection object in `openConnection()`
  and `beginTransaction()` functions.
* __returns__  
  _For synchronous objects:_ The connection object in `openConnection()` and
  `beginTransaction()` functions.

The code below shows a sample implementation for a MySQL database:

```
'use strict';

var util = require('util');
var mysql = require('mysql');
var bo = require('business-objects');
var app = require('../server.js');

var pool = mysql.createPool({
  host     : app.config.dataSources.mysql.host,
  port     : app.config.dataSources.mysql.port,
  database : app.config.dataSources.mysql.database,
  user     : app.config.dataSources.mysql.username,
  password : app.config.dataSources.mysql.password,
  multipleStatements: true
});

var ConnectionManagerBase = bo.dataAccess.ConnectionManagerBase;

// Connection manager constructor.
var ConnectionManager = function() {
  ConnectionManager.super_.call(this);
};
util.inherits(ConnectionManager, ConnectionManagerBase);

// Open connection.
ConnectionManager.prototype.openConnection = function (dataSource, callback) {
  pool.getConnection(function (err, connection) {
    if (err)
      callback(err);
    else
      callback(null, connection);
  });
};

// Close connection.
ConnectionManager.prototype.closeConnection = function (dataSource, connection, callback) {
  connection.release();
  callback();
};

// Begin transaction.
ConnectionManager.prototype.beginTransaction = function (dataSource, callback) {
  this.openConnection(dataSource, function (err, connection) {
    if (err)
      callback(err);
    else
      connection.beginTransaction(function (err) {
        if (err)
          callback(err);
        else
          callback(null, connection);
      })
  });
};

// Commit transaction.
ConnectionManager.prototype.commitTransaction = function (dataSource, connection, callback) {
  var self = this;
  connection.commit(function (err) {
    if (err)
      self.rollbackTransaction(dataSource, connection, callback);
    else
      self.closeConnection(dataSource, connection, callback);
  });
};

// Rollback transaction.
ConnectionManager.prototype.rollbackTransaction = function (dataSource, connection, callback) {
  var self = this;
  connection.rollback(function () {
    self.closeConnection(dataSource, connection, callback);
  });
};

module.exports = ConnectionManager;
```

If the projects uses several databases, it can be handled using the `switch(dataSource) { }`
statement.
