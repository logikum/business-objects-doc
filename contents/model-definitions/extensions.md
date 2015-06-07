[//]: # (40, Extensions)

# Extensions

Extension manager classes provide opportunities to change or extend the
fumctioning of business objects. [ExtensionManager] is for asynchronous
objects abd [ExtensionManagerSync] is for synchronous ones, respectively.
Their constructors require two arguments:

* __dataSource__  
  The name of the data source.
* __modelPath__  
  The full path of the model.

Both arguments is used by the data access object builder function. Argument
`dataSource` can be any non-empty string. Argument `modelPath` is typically
the `__filename` global object of node.js. The default builder of business-objects
library creates the path of the data access object for the business object
inserting the `dataSource` string into the `modelPath` as secondary extension:

```
// Path of the model definition file: /path/to/model.js
var extensions = new Extensions('dao', __filename);

// Path of data access object will be: /path/to/model.dao.js
```

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

### Custom DAO Builder function

The data access object builder function can replaced globally in configuration.
The extension manager provides a way to change it per model.

* __daoBuilder( dataSource, modelPath, modelName )__  


||
-|-
dataSource | description
modelPath | description
modelName | description
returns | description

```
var daoPath = path.join(
  path.dirname(modelPath),
  path.basename(modelPath, path.extname(modelPath)) + '.' + dataSource + path.extname(modelPath)
);
var daoConstructor = require(daoPath);
return new daoConstructor();
```

### Custom conversion functions for transfer objects

* __toDto( context )__  

* __fromDto( context, dto )__  

* __toCto( context )__  

* __fromCto( context, cto )__  


### Custom data portal functions

* __dataCreate( context, callback )__  

* __dataFetch( context, filter, method, callback )__  

* __dataInsert( context, callback )__  

* __dataUpdate( context, callback )__  

* __dataRemove( context, callback )__  

* __dataExecute( context, mthod, callback )__  
