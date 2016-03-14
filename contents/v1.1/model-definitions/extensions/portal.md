# Custom data portal functions

> * [Extensions + Custom DAO builder function](/model-definitions/extensions)
> * [Custom conversion functions for transfer objects](transfer)
> * _Custom data portal functions_

The data portal functions are called when a business object needs some data
from a data source or want to persist its data. The function called depends
on the action the user does and the state of the business object instance.
It is rare that a data portal function should be changed, however, it is an
option to modify the working of the business object.

> An example case when custom data portal functions are required if the data
> access objects are available on another host or via a service.

The next table summarizes the data portal functions by the business object types: 

 |dataCreate|dataFetch|dataInsert|dataUpdate|dataRemove|dataExecute
-|-|-|-|-|-|-
[EditableRootModel]       |x|x|x|x|x|-
[EditableRootCollection]  |-|x|-|-|-|-
[EditableChildModel]      |x|x|x|x|x|-
[EditableChildCollection] |-|-|-|-|-|-
[ReadOnlyRootModel]       |-|x|-|-|-|-
[ReadOnlyChildModel]      |-|x|-|-|-|-
[ReadOnlyRootCollection]  |-|x|-|-|-|-
[ReadOnlyChildCollection] |-|-|-|-|-|-
[CommandObject]           |-|-|-|-|-|x


All data portal function have a `context` argument of type [DataPortalContext].
The context object provides the following properties and methods:

* __dao__  
  The data access object of the actual model, it inherits [DaoBase].
* __properties__  
  An array of [PropertyInfo] objects that define the properties of the business object.
* __user__  
  The current user, an object that inherits [UserInfo].
* __locale__  
  A string that determines the current locale. For more info see
  [Internationalization](/application/i18n) page.
* __connection__  
  The connection object for the data source. For more info see [Data access objects](/data-access) page.
* __isSelfDirty__  
  A Boolean value that indicates whether the current model instance itself has been changed.
* __setState( connection, isSelfDirty )__  
  The method sets the new state of the model instance, and returns the context.
* __getValue( propertyName )__  
  The method expects the name of a property of the business object, and returns
  the value of the property.
* __setValue( propertyName, value )__  
  The method expects the name of a property of the business object and its value,
  and writes the value into the property.

The last argument of data portal functions of asynchronous business objects is always a
`callback` function.

### dataCreate( context, callback )

%args%||
-|-
context | A [DataPortalContext] object.
callback | A function that expects an optional error: callback(err) { }

The function is called when a new instance of the business object is being created.
It provides a way to initialize a new objects using data from the data store. 
It always calls a function named __create__ on the data access object.

The default create method works in a similar way to that:

```
// For asynchronous models:
function dataCreate (context, callback) {
  context.dao.create(context.connection, function (err, dto) {
    if (err)
      callback(err);
    else {
      context.setValue('propertyName1', dto.propertyName1);
      context.setValue('propertyName2', dto.propertyName2);
      ...
      context.setValue('propertyNameN', dto.propertyNameN);
      callback(null);
    }
  });
}

// For synchronous models:
function dataCreate (context) {
  var dto = context.dao.create(context.connection);
  context.setValue('propertyName1', dto.propertyName1);
  context.setValue('propertyName2', dto.propertyName2);
  ...
  context.setValue('propertyNameN', dto.propertyNameN);
}
```

### dataFetch( context, dto, method, callback )

%args%||
-|-
context | A [DataPortalContext] object.
filter | A filter object that contains parameters to fetch the data of the required business objects. 
method | The name of the function on the data access object to call.
callback | A function that expects the response data transfer object or an optional error: callback(err, dto) { }

The function is called when an existing instance of the business object is being created.
The argument `method` contains the name of the function of the data access object to be called.
Its default value is __fetch__. Argument `method` ensures the opportunity to retrieve
the business object using different filter conditions.

The default fetch method works in a similar way to that:

```
// For asynchronous models:
function dataFetch (ctx, dto, method, callback) {
  function cb (err, dto) {
    if (err)
      callback(err);
    else {
      context.setValue('propertyName1', dto.propertyName1);
      context.setValue('propertyName2', dto.propertyName2);
      ...
      context.setValue('propertyNameN', dto.propertyNameN);
      callback(null, dto);
    }
  }
  var methodName = method || 'fetch';
  dto = context.dao[methodName](context.connection, filter, cb);
}

// For synchronous models:
function dataFetch (ctx, filter, method) {
  var methodName = method || 'fetch';
  dto = context.dao[methodName](context.connection, filter);
  context.setValue('propertyName1', dto.propertyName1);
  context.setValue('propertyName2', dto.propertyName2);
  ...
  context.setValue('propertyNameN', dto.propertyNameN);
  return dto;
}
```

### dataInsert( context, callback )

%args%||
-|-
context | A [DataPortalContext] object.
callback | A function that expects an optional error: callback(err) { }

The function is called when a new instance of the business object is being saved.
It always calls a function named __insert__ on the data access object.

The default insert method works in a similar way to that:

```
// For asynchronous models:
function dataInsert (context, callback) {
  var dto = {
    propertyName1: context.getValue('propertyName1'),
    propertyName2: context.getValue('propertyName2'),
    ...
    propertyNameN: context.getValue('propertyNameN')
  };
  context.dao.insert(context.connection, dto, function (err, dto) {
    if (err)
      callback(err);
    else {
      context.setValue('propertyKey', dto.propertyKey);
      callback(null);
    }
  });
}

// For synchronous models:
function dataInsert (context, callback) {
  var dto = {
    propertyName1: context.getValue('propertyName1'),
    propertyName2: context.getValue('propertyName2'),
    ...
    propertyNameN: context.getValue('propertyNameN')
  };
  dto = context.dao.insert(context.connection, dto);
  context.setValue('propertyKey', dto.propertyKey);
  context.setValue('propertyTimestamp', dto.propertyTimestamp);
}
```

### dataUpdate( context, callback )

%args%||
-|-
context | A [DataPortalContext] object.
callback | A function that expects an optional error: callback(err) { }

The function is called when a modified instance of the business object is being saved.
It always calls a function named __update__ on the data access object.

The default update method works in a similar way to that:

```
// For asynchronous models:
function dataUpdate (context, callback) {
  if (context.isSelfDirty) {
    var dto = {
      propertyName1: context.getValue('propertyName1'),
      propertyName2: context.getValue('propertyName2'),
      ...
      propertyNameN: context.getValue('propertyNameN')
    };
    context.dao.update(context.connection, dto, function (err, dto) {
      if (err)
        callback(err);
      else {
        context.setValue('propertyTimestamp', dto.propertyTimestamp);
        callback(null);
      }
    });
  }
}

// For synchronous models:
function dataUpdate (context) {
  if (context.isSelfDirty) {
    var dto = {
      propertyName1: context.getValue('propertyName1'),
      propertyName2: context.getValue('propertyName2'),
      ...
      propertyNameN: context.getValue('propertyNameN')
    };
    dto = context.dao.update(context.connection, dto);
    context.setValue('propertyTimestamp', dto.propertyTimestamp);
  }
}
```

### dataRemove( context, callback )

%args%||
-|-
context | A [DataPortalContext] object.
callback | A function that expects an optional error: callback(err) { }

The function is called when a business object instance that is marked for removal is being saved.
It always calls a function named __remove__ on the data access object.

The default remove method works in a similar way to that:

```
// For asynchronous models:
function dataRemove (context, callback) {
  var primaryKey = context.getValue('propertyKey');
  context.dao.remove(context.connection, primaryKey, function (err) {
    if (err)
      callback(err);
    else
      callback(null);
  });
}

// For synchronous models:
function dataRemove (context) {
  var primaryKey = context.getValue('propertyKey');
  context.dao.remove(context.connection, primaryKey);
}
```

### dataExecute( context, method, callback )

%args%||
-|-
context | A [DataPortalContext] object.
method | The name of the function on the data access object to call.
callback | A function that expects the response data transfer object or an optional error: callback(err, dto) { }

The function is called when an instance of a command object is being executed.
The argument `method` contains the name of the function of the data access object to be called.
Its default value is __execute__. Argument `method` provides the opportunity to execute
more actions utilizing the same command object. Its usage is practical when the parameters
and the result data of the actions are similar.

The default execute method works in a similar way to that:

```
// For asynchronous models:
function dataExecute (context, method, callback) {
  function cb (err, dto) {
    if (err)
      callback(err);
    else {
      context.setValue('propertyResult', dto.propertyResult);
      callback(null, dto);
    }
  }
  var dto = {
    propertyName1: context.getValue('propertyName1'),
    propertyName2: context.getValue('propertyName2'),
    ...
    propertyNameN: context.getValue('propertyNameN')
  };
  var methodName = method || 'execute';
  context.dao[methodName](context.connection, dto, cb);
}

// For synchronous models:
function dataExecute (ctx, method) {
  var dto = {
    propertyName1: context.getValue('propertyName1'),
    propertyName2: context.getValue('propertyName2'),
    ...
    propertyNameN: context.getValue('propertyNameN')
  };
  var methodName = method || 'execute';
  dto = context.dao[methodName](context.connection, dto);
  ctx.setValue('propertyResult', dto.propertyResult);
  return dto;
}
```
