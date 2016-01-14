# Editable data access objects - create() method

> * [Editable data access objects](/data-access/editable)
> * _create() method_
> * [fetch() method](fetch)
> * [insert() method](insert)
> * [update() method](update)
> * [remove() method](remove)

Editable data access objects can have a __create()__ method. Its purpose is
the initialization of new instances, especially using data retrieved from the store.
It has the arguments below:

* __connection__  
  An object with connection information to the store. It depends on
  the persistence procedure. 
* __callback__  
  _For asynchronous objects:_ A function with callback(err, result) signature, where
  `err` is the eventual error and `result` is a return object. The properties of the
  return object hold the initial values of the properties of the new instance.
* __returns__  
  _For synchronous objects:_ An object whose properties hold the initial values of the
  properties of the new instance.

The following code snippet shows a sample __create()__ method of an editable data access object:

```
var util = require('util');
var bo = require('business-objects');

var SampleEditableDao = function() {
  SampleEditableDao.super_.call(this, 'SampleEditableDao');
};
util.inherits(SampleEditableDao, bo.dataAccess.DaoBase);

SampleEditableDao.prototype.create = function(connection, callback) {
  // do something using connection...
  // ...that produces the 'data' object
  if (err)
    callback(err);
  else
    callback(null, data);
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

SampleEditableDao.prototype.create = function(connection) {
  // do something using connection...
  // ...that produces the 'data' object
  return data;
};
```
