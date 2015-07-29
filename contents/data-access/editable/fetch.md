# Editable data access objects - fetch() method

> * [Editable data access objects](/data-access/editable)
> * [create() method](create)
> * _fetch() method_
> * [insert() method](insert)
> * [update() method](update)
> * [remove() method](remove)

Root editable data access objects usually have a __fetch()__ method, and optionally
its alternate methods. It has the hereunder arguments:

* __connection__  
  An object with connection information to the store. It depends on
  the persistence procedure. 
* __filter__  
  An optional object that contains the filter criteria of the data retrieval. 
* __callback__  
  _For asynchronous objects:_ A function with callback(err, result) signature, where
  `err` is the eventual error and `result` is an optional return object of the retrieval.
  The properties of the return object hold the values of the properties of the instance.
* __returns__  
  _For synchronous objects:_ An optional object that holds the result of the retrieval.

The following code snippet shows a sample __fetch()__ method of a root editable data access object:

```
var util = require('util');
var bo = require('business-objects');

var SampleRootDao = function() {
  SampleRootDao.super_.call(this, 'SampleCollectionDao');
};
util.inherits(SampleRootDao, bo.dataAccess.DaoBase);

SampleRootDao.prototype.fetch = function(connection, filter, callback) {
  // do something using connection and filter...
  // ...that produces the 'data' object
  if (err)
    callback(err);
  else
    callback(null, data);
};

SampleRootDao.prototype.fetchByName = function(connection, filter, callback) {
  // do something using connection and filter...
  // ...that produces the 'data' object for the given name
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

var SampleRootDao = function() {
  SampleRootDao.super_.call(this, 'SampleCollectionDao');
};
util.inherits(SampleRootDao, bo.dataAccess.DaoBase);

SampleRootDao.prototype.fetch = function(connection, filter) {
  // do something using connection and filter...
  // ...that produces the 'data' object
  return data;
};

SampleRootDao.prototype.fetchByName = function(connection, filter) {
  // do something using connection and filter...
  // ...that produces the 'data' object for the given name
  return data;
};
```

The root objects are supposed to retrieve the data of the child objects as well.
The purpose of this solution is to accelerate the construction of business objects
by reducing the number of required connections to the data store.

The following is an example __fetch()__ method of a data access object of a composite
root editable object:

```
var util = require('util');
var bo = require('business-objects');

function fetchItems(connection, parentKey, callback) {
  // do something using connection and parentKey...
  // ...that produces the 'items' array
  if (err)
    callback(err);
  else
    callback(null, items);
}

var SampleRootDao = function() {
  SampleRootDao.super_.call(this, 'SampleRootDao');
};
util.inherits(SampleRootDao, bo.dataAccess.DaoBase);

SampleRootDao.prototype.fetch = function(connection, filter, callback) {
  // do something using connection and filter...
  // ...that produces the 'data' object
  if (err) {
    callback(err);
    return;
  }
  fetchItems(connection, data.key, function(err, items) {
    if (err)
      callback(err);
    else {
      // items: the name of the property that holds the child model or collection
      data.items = items;
      callback(null, data);
    }
  };
};
```

The synchronous version of the composite editable example:

```
var util = require('util');
var bo = require('business-objects');

function fetchItems(connection, parentKey) {
  // do something using connection and parentKey...
  // ...that produces the 'items' array
  return items;
}

var SampleRootDao = function() {
  SampleRootDao.super_.call(this, 'SampleRootDao');
};
util.inherits(SampleRootDao, bo.dataAccess.DaoBase);

SampleRootDao.prototype.fetch = function(connection, filter, callback) {
  // do something using connection and filter...
  // ...that produces the 'data' object
  // items: the name of the property that holds the child model or collection
  data.items = fetchItems(connection, data.key);
  return data;
};
```
