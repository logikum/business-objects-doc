[//]: # (40, Command objects)

# Command data access objects

Command data access objects should have an __execute()__ method, and optionally
its alternate methods. It has the hereunder arguments:

* __connection__  
  An object with connection information to the store. It depends on
  the persistence procedure. 
* __data__  
  An optional object that contains the input values of the command. 
* __callback__  
  _For asynchronous objects:_ A function with callback(err, result) signature, where
   `err` is the eventual error and `result` is an optional return object of the command.
* __returns__  
  _For synchronous objects:_ An optional object that holds the result of the command.

The following code snippet shows a sample command data access object:

```
var util = require('util');
var bo = require('business-objects');

var SampleCommandDao = function() {
  SampleCommandDao.super_.call(this, 'SampleCommandDao');
};
util.inherits(SampleCommandDao, bo.dataAccess.DaoBase);

SampleCommandDao.prototype.execute = function(connection, data, callback) {
  // do something using connection and data...
  // ...that produces the 'result' object
  if (err)
    callback(err);
  else {
    data.result = result;
    callback(null, data);
  }
};
```

The synchronous version of the above example:

```
var util = require('util');
var bo = require('business-objects');

var SampleCommandDao = function() {
  SampleCommandDao.super_.call(this, 'SampleCommandDao');
};
util.inherits(SampleCommandDao, bo.dataAccess.DaoBase);

SampleCommandDao.prototype.execute = function(connection, data) {
  // do something using connection and data...
  // ...that produces the 'result' object
  data.result = result;
  return data;
};
```
