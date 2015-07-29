# Editable data access objects - update() method

> * [Editable data access objects](/data-access/editable)
> * [create() method](create)
> * [fetch() method](fetch)
> * [insert() method](insert)
> * _update() method_
> * [remove() method](remove)

Editable data access objects can have an __update()__ method. It saves a changed instance
in the store. It has the following arguments:

* __connection__  
  An object with connection information to the store. It depends on
  the persistence procedure. 
* __data__  
  An object whose properties contains the values of the properties of the changed instance. 
* __callback__  
  _For asynchronous objects:_ A function with callback(err, result) signature, where
  `err` is the eventual error and `result` is a return object. The properties of the
  return object hold the updated values of the properties of the saved instance.
* __returns__  
  _For synchronous objects:_ An object whose properties hold the updated values of the
  properties of the saved instance.

The following code snippet shows a sample __update()__ method of an editable data access object:

```
var util = require('util');
var bo = require('business-objects');

var SampleEditableDao = function() {
  SampleEditableDao.super_.call(this, 'SampleEditableDao');
};
util.inherits(SampleEditableDao, bo.dataAccess.DaoBase);

SampleEditableDao.prototype.update = function(connection, data, callback) {
  // do something using connection and data...
  // ...that updates an existing entry in the store and produces the return object
  if (err)
    callback(err);
  else {
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

SampleEditableDao.prototype.update = function(connection, data) {
  // do something using connection and data...
  // ...that updates an existing entry in the store and produces the return object
  data.timestamp = timestamp;
  return data;
};
```
