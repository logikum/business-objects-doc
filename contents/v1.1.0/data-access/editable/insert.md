# Editable data access objects - insert() method

> * [Editable data access objects](/data-access/editable)
> * [create() method](create)
> * [fetch() method](fetch)
> * _insert() method_
> * [update() method](update)
> * [remove() method](remove)

Editable data access objects can have an __insert()__ method. It saves a new instance
in the store. It has the following arguments:

* __connection__  
  An object with connection information to the store. It depends on
  the persistence procedure. 
* __data__  
  An object whose properties contains the values of the properties of the new instance. 
* __callback__  
  _For asynchronous objects:_ A function with callback(err, result) signature, where
  `err` is the eventual error and `result` is a return object. The properties of the
  return object hold the updated values of the properties of the saved instance.
* __returns__  
  _For synchronous objects:_ An object whose properties hold the updated values of the
  properties of the saved instance.

The following code snippet shows a sample __insert()__ method of an editable data access object:

```
var util = require('util');
var bo = require('business-objects');

var SampleEditableDao = function() {
  SampleEditableDao.super_.call(this, 'SampleEditableDao');
};
util.inherits(SampleEditableDao, bo.dataAccess.DaoBase);

SampleEditableDao.prototype.insert = function(connection, data, callback) {
  // do something using connection and data...
  // ...that creates a new entry in the store and produces the return object
  if (err)
    callback(err);
  else {
    data.key = newKey;
    data.timestamp = timestamp;
    callback(null, data);
  }
};
```

The synchronous version of the above example:

```
var util = require('util');
var bo = require('business-objects');

var SampleEditableDao = function() {
  SampleEditableDao.super_.call(this, 'SampleEditableDao');
};
util.inherits(SampleEditableDao, bo.dataAccess.DaoBase);

SampleEditableDao.prototype.insert = function(connection, data) {
  // do something using connection and data...
  // ...that creates a new entry in the store and produces the return object
  data.key = newKey;
  data.timestamp = timestamp;
  return data;
};
```
