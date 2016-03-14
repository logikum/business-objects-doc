# daoBuilder function

> * [Usual additions](/application/additions)
> * [ConnectionManager class](connection-manager)
> * _daoBuilder function_
> * [User class](user)
> * [getUser function](get-user)
> * [getLocale function](get-locale)

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
var DaoError = bo.dataAccess.DaoError;

var daoBuilder = function (dataSource, modelPath, modelName) {

  if (typeof dataSource !== 'string' || dataSource.trim().length === 0)
    throw new Error('The dataSource argument of daoBuilder function must be a non-empty string.');

  if (typeof modelPath !== 'string' || modelPath.trim().length === 0)
    throw new Error('The modelPath argument of daoBuilder function must be a non-empty string.');

  var modelStats = fs.statSync(modelPath);
  if (!modelStats.isFile())
    throw new Error('The modelPath argument of daoBuilder function is not a valid file path: ' + modelPath);

  var daoPath = path.join(
    path.dirname(modelPath),
    path.basename(modelPath, path.extname(modelPath)) + '.' + dataSource + path.extname(modelPath)
  );

  var daoStats = fs.statSync(daoPath);
  if (!daoStats.isFile())
    throw new Error('The required data access file does not exist: ' + daoPath);

  var daoCtor = require(daoPath);

  if (typeof daoCtor !== 'function')
    throw new Error('The data access file must return a constructor: ' + daoPath);

  var daoInstance = new daoConstructor();
  if (!(daoInstance instanceof DaoBase) && daoInstance.super_ !== DaoBase)
    throw new DaoError('daoType', daoPath);
  return daoInstance;
};

module.exports = daoBuilder;
```

The `dashize()` function converts `modelName` to `model-name`. If the model file always
contains one model, then the commented line can be used as well. This simpler solution,
however, cannot be used in all cases. 
