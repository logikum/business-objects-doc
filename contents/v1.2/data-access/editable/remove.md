# Editable data access objects - remove() method

> * [Editable data access objects](/data-access/editable)
> * [create() method](create)
> * [fetch() method](fetch)
> * [insert() method](insert)
> * [update() method](update)
> * _remove() method_

Editable data access objects can have an __remove()__ method. It saves a changed instance
in the store. It has the following arguments:

* __connection__  
  An object with connection information to the store. It depends on
  the persistence procedure. 
* __filter__  
  An optional object that contains the filter criteria of the data removal.
  It is the key of the model instance as described later.
* __callback__  
  _For asynchronous objects:_ A function with callback(err) signature, where
  `err` is the eventual error.
* __returns__  
  _For synchronous objects:_ Nothing.

The following code snippet shows a sample __remove()__ method of an editable data access object:

```
var util = require('util');
var bo = require('business-objects');

var SampleEditableDao = function() {
  SampleEditableDao.super_.call(this, 'SampleEditableDao');
};
util.inherits(SampleEditableDao, bo.dataAccess.DaoBase);

SampleEditableDao.prototype.remove = function(connection, filter, callback) {
  // do something using connection and data...
  // ...that deletes an existing entry from the store
  if (err)
    callback(err);
  else
    callback(null);
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

SampleEditableDao.prototype.remove = function(connection, filter) {
  // do something using connection and data...
  // ...that deletes an existing entry from the store
  return;
};
```

### Key of the object

The properties of a model can be flagged as keys at definition. For example:

```
var orderKey = new Property('orderKey', DataType.Integer, F.key | F.readOnly);
var customerName = new Property('customerName', DataType.Text);
```

A model usually has one key property, however, it can have more ones, or none at all.
If the model has exactly one key property then the key is the value of that property.
When the model has more key properties then the key is an object whose properties
contain the key properties of the instance. In case of no key properties, the key is
an object whose properties contain all properties of the instance, i.e. a data transfer
object.

An example for one key property:

```
// Excerpt of model definition:
var orderItemKey = new Property('orderItemKey', DataType.Integer, F.key | F.readOnly);
var orderKey = new Property('orderKey', DataType.Integer, F.parentKey | F.readOnly);
var productName = new Property('productName', DataType.Text);

// The filter passed in remove() method:
var key = 7345;
```

An example for more key properties:

```
// Excerpt of model definition:
var orderKey = new Property('orderKey', DataType.Integer, F.key | F.parentKey | F.readOnly);
var orderLine = new Property('orderLine', DataType.Integer, F.Key);
var productName = new Property('productName', DataType.Text);

// The filter passed in remove() method:
var key = {
  orderKey: 628,
  orderLine: 3
};
```

An example for no key properties:

```
// Excerpt of model definition:
var orderNumber = new Property('orderKey', DataType.Integer, F.readOnly);
var orderLine = new Property('orderLine', DataType.Integer);
var productName = new Property('productName', DataType.Text);

// The filter passed in remove() method:
var key = {
  orderKey: 628,
  orderLine: 3,
  productName: 'white mug'
};
```

