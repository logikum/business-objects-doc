+++
order: 40
title: Usual additions
+++

# Usual additions

An application that uses business-objects module will usually implement the following
components:

* [ConnectionManager class](#ConnectionManager)
* [daoBuilder function](#daoBuilder)
* [getUser function](#getUser)
* [getLocale function](#getLocale)

The implemented components has to be set in the [configuration](configuration)
of business objects module.

### <a name="ConnectionManager"></a>ConnectionManager class

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

### <a name="daoBuilder"></a>daoBuilder function

The function will provide the data access objects for the business object instances.
It has the following signature:

* __daoBuilder( dataSource, modelPath, modelName )__

%args%||
-|-
dataSource | The name of the data source. _Required string._
modelPath | The model definition path of the business object model instance that the data access object belongs to. _Required string._
modelName | The name of the business object model. _Required string._
returns | The data access object of the business object model. _It must inherit [DaoBase]._

The function composes the full path of the data access object using the arguments, reads
the constructor of it and creates an instance of the type. If the data access object
cannot be instantiated the function returns a [DaoError] object that describes the issue.

> If a model demands a special data access builder, it can be provided via
> [extensions](/model-definitions/extensions#daoBuilder).

The code hereunder demonstrates a `daoBuilder()` function. It searches the file of data access
object in a subdirectory compared to the model file. The name of the subdirectory should match
the name of the data source:

```
'use strict';

var fs = require('fs');
var path = require('path');
var bo = require('business-objects');
var convert = require('../lib/convert.js');

var DaoBase = bo.dataAccess.DaoBase;
var ensureArgument = bo.system.EnsureArgument;

var daoBuilder = function (dataSource, modelPath, modelName) {

  if (typeof dataSource !== 'string' || dataSource.trim().length === 0)
    throw new Error('The dataSource argument of daoBuilder function must be a non-empty string.');

  if (typeof modelPath !== 'string' || modelPath.trim().length === 0)
    throw new Error('The modelPath argument of daoBuilder function must be a non-empty string.');

  var modelStats = fs.statSync(modelPath);
  if (!modelStats.isFile())
    throw new Error('The modelPath argument of daoBuilder function is not a valid file path: ' + modelPath);

  //var daoPath = path.join(path.dirname(modelPath), dataSource, path.basename(modelPath));
  var daoPath = path.join(path.dirname(modelPath), dataSource,
      convert.dashize(modelName) + path.extname(modelPath));

  var daoStats = fs.statSync(daoPath);
  if (!daoStats.isFile())
    throw new Error('The required data access file does not exist: ' + daoPath);

  var daoCtor = require(daoPath);

  if (typeof daoCtor !== 'function')
    throw new Error('The data access file must return a constructor: ' + daoPath);

  return ensureArgument.isMandatoryType(new daoCtor(), DaoBase,
      daoPath + ' must inherit DaoBase type.');
};

module.exports = daoBuilder;
```

The `dashize()` function converts `modelName` to `model-name`. If the model file always
contains one model, then the commented line can be used as well. This simpler solution,
however, cannot be used in all cases. 

### <a name="getUser"></a>getUser function

The function should return the current user or null. The user object must inherit [UserInfo].
The following code shows an user implementation (user.js): 

```
'use strict';

var util = require('util');
var UserInfo = require('../source/system/user-info.js');

function User (userCode, userName, email, roles) {
  User.super_.call(this, userCode);

  this.userName = userName;
  this.email = email;
  this.roles = roles;

  Object.freeze(this);
}
util.inherits(User, UserInfo);

User.prototype.isInRole = function (role) {
  return this.roles.some(function (userRole) {
    return userRole === role;
  });
};

User.prototype.isInSomeRole = function (roles) {
  return this.roles.some(function (userRole) {
    return roles.some(function (role) {
      return userRole === role;
    });
  });
};

User.prototype.isInEveryRole = function (roles) {
  return roles.every(function (role) {
    return User.roles.some(function (userRole) {
      return userRole === role;
    });
  });
};

module.exports = User;
```

An example function (get-user.js):

```
'use strict';

var User = require('./user.js');

var userReader = function () {
  return new User(
      'ada-lovelace',
      'Ada Lovelace',
      'ada.lovelace@computer.net',
      ['administrators', 'developers', 'designers']
    );
};

module.exports = userReader;
```

### <a name="getLocale"></a>getLocale function

The function should return the current locale or an empty string. An example:

```
var express = require('express');
var session = require('express-session');

var app = express();

app.use(session({
  secret: 'barking pumpkin',
  resave: false,
  saveUninitialized: true
}));

// Middleware to set language.
app.use(function (req, res, next) {
  if (!req.session) {
    req.session = { language: 'hu' };
  } else if (!req.session.language) {
    req.session.language = 'hu';
  }
  next();
});

// Route to change language.
app.use('/set-language', function (req, res, next) {
  req.session.language = req.url.length > 1 ? req.url.substr(1) : 'hu';
  res.redirect('/');
});
...

function getLocale() {
  return req.session.language;
}
```
