+++
order: 40
title: Extensions
umbel: true
+++

# Extensions

> * _Extensions + Custom DAO builder function_
> * [Custom conversion functions for transfer objects](extensions/transfer)
> * [Custom data portal functions](extensions/portal)

Extension manager classes provide opportunities to change or extend the
fumctioning of business objects. [ExtensionManager] is for asynchronous
objects abd [ExtensionManagerSync] is for synchronous ones, respectively.
Their constructors require two arguments:

* __dataSource__  
  The name of the data source.
* __modelPath__  
  The full path of the model.

Both arguments is used by the data access object builder function. Argument
`dataSource` determines the path of the data access objects of the model, it can be 
any non-empty string. Argument `modelPath` is typically the `__filename` global
object of node.js. The default builder of business-objects library creates the path 
of the data access object for the business object inserting the `dataSource` string 
into the `modelPath` as secondary extension:

```
// Path of the model definition file: /path/to/model.js
var extensions = new Extensions('dao', __filename);

// Path of data access object will be: /path/to/model.dao.js
```

For example argument `dataSource` can be the name of the database when the application
uses multiple stores, or the name of the database type if the application supports
multiple databases.

Extension manager classes have the following addtional properties:

```
// Custom DAO Builder function
extensions.daoBuilder = function() { };
// Custom conversion functions for transfer objects
extensions.toDto = function() { };
extensions.fromDto = function() { };
extensions.toCto = function() { };
extensions.fromCto = function() { };
// Custom data portal functions
extensions.dataCreate = function() { };
extensions.dataFetch = function() { };
extensions.dataInsert = function() { };
extensions.dataUpdate = function() { };
extensions.dataRemove = function() { };
extensions.dataExecute = function() { };
```

### <a name="daoBuilder"></a>Custom DAO builder function

The data access object builder function can replaced globally in [configuration](/application/configuration).
The extension manager provides a way to change it per model.

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
The default data access object builder function works in a simplified way like that:

```
function daoBuilder( dataSource, modelPath, modelName ) {
  var daoPath = path.join(
    path.dirname(modelPath),
    path.basename(modelPath, path.extname(modelPath)) + '.' + dataSource + path.extname(modelPath)
  );
  var daoConstructor = require(daoPath);
  return new daoConstructor();
}
```

For more information see [daoBuilder](/application/additions/dao-builder) function.
