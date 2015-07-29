+++
order: 20
title: Editable objects
umbel: true
+++

# Editable data access objects

> * _Editable data access objects_
> * [create() method](editable/create)
> * [fetch() method](editable/fetch)
> * [insert() method](editable/insert)
> * [update() method](editable/update)
> * [remove() method](editable/remove)

Editable data access objects usually have `create()`, `fetch*()`, `insert()`, `update()`
and `remove()` methods. The methods are described detailed on their own pages.

The following code portion shows the full picture of an editable data access object: 

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

SampleEditableDao.prototype.fetch = function(connection, filter, callback) {
  // do something using connection and filter...
  // ...that produces the 'list' array
  if (err)
    callback(err);
  else
    callback(null, list);
};

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

SampleEditableDao.prototype.remove = function(connection, filter, callback) {
  // do something using connection and data...
  // ...that deletes an existing entry from the store
  if (err)
    callback(err);
  else
    callback(null);
};
```

The synchronous version of the above structure:

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

SampleEditableDao.prototype.fetch = function(connection, data) {
  // do something using connection and data...
  // ...that produces the 'data' object
  return data;
};

SampleEditableDao.prototype.insert = function(connection, data) {
  // do something using connection and data...
  // ...that creates a new entry in the store and produces the return object
  data.key = newKey;
  data.timestamp = timestamp;
  return data;
};

SampleEditableDao.prototype.update = function(connection, data) {
  // do something using connection and data...
  // ...that updates an existing entry in the store and produces the return object
  data.timestamp = timestamp;
  return data;
};

SampleEditableDao.prototype.remove = function(connection, filter) {
  // do something using connection and data...
  // ...that deletes an existing entry from the store
  return;
};
```
