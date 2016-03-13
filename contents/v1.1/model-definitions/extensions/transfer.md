# Custom conversion functions for transfer objects

> * [Extensions + Custom DAO builder function](/model-definitions/extensions)
> * _Custom conversion functions for transfer objects_
> * [Custom data portal functions](portal)

The transfer objects are used to pass the values of business object instances
to the data access objects and the client application, respectively, and vice versa.
The data transfer objects serve as courier between the business objects and the data
access objects, the client transfer objects run between the business objects and the
client application. In base case the values of all properties of a business object
are copied to the transfer object. One ore more properties can be excluded from the
transfer object using the `flag` argument of [PropertyInfo] constructor. For details
see the [Property definitions](/model-definitions/properties) page.

In situations where passing the value of aproperty is conditional or it requires
transformation, a custom function has to be used. These functions have a `context`
argument of type [TransferContext] that provides the following property and methods:

* __properties__  
  An array of [PropertyInfo] objects that define the properties of the business object.
* __getValue( propertyName )__  
  The method expects the name of a property of the business object, and returns
  the value of the property. _This method is undefined for read-only models in
  fromDto() functions._
* __setValue( propertyName, value )__  
  The method expects the name of a property of the business object and its value,
  and writes the value into the property. _This method is undefined for read-only
  models in toCto() functions._

> In case of client transfer object methods, the permissions of the user to read or write
> the given properties are also checked.

The following custom conversion functions can be applied.

* __toDto( context )__

Argument `context` is the transfer context object, and the method returns the data transfer object.
The method copies the values of the properties of the business object onto the data transfer object.

> This method is invalid for read-only business objects.

The default function works like that:

```
function toDto(context) {
  var dto = {};
  context.properties.filter(function (property) {
    return property.isOnDto;
  }).forEach(function (property) {
    dto[property.name] = context.getValue(property.name);
  });
  return dto;
}
```

An alternative solution to change readily:

```
function toDto(context) {
  return {
    propertyName1: context.getValue('propertyName1'),
    propertyName2: context.getValue('propertyName2'),
    ...
    propertyNameN: context.getValue('propertyNameN')
  };
}
```

* __fromDto( context, dto )__

Argument `context` is the transfer context object, argument `dto` is the data transfer object.
The method copies the values of the properties of data transfer object onto the the business object.

The default function works like that:

```
function fromDto(context, dto) {
  context.properties.filter(function (property) {
    return property.isOnDto;
  }).forEach(function (property) {
    if (dto.hasOwnProperty(property.name) && typeof dto[property.name] !== 'function') {
      context.setValue(property.name, dto[property.name]);
    }
  });
}
```

An alternative solution to change easily:

```
function fromDto(context, dto) {
  context.setValue('propertyName1',  dto.propertyName1);
  context.setValue('propertyName2',  dto.propertyName2);
  ...
  context.setValue('propertyNameN',  dto.propertyNameN);
}
```

* __toCto( context )__  

Argument `context` is the transfer context object, and the method returns the client transfer object.
The method copies the values of the properties of the business object onto the client transfer object.

> This method is invalid for command objects.

The default function works like that:

```
function toCto(context) {
  var cto = {};
  context.properties.filter(function (property) {
    return property.isOnCto;
  }).forEach(function (property) {
    cto[property.name] = context.getValue(property.name);
  });
  return cto;
}
```

An alternative solution to change lightly:

```
function toCto(context) {
  return {
    propertyName1: this.propertyName1,
    propertyName2: this.propertyName2,
    ...
    propertyNameN: this.propertyNameN
  };
}
```

* __fromCto( context, cto )__

Argument `context` is the transfer context object, argument `cto` is the client transfer object.
The method copies the values of the properties of client transfer object onto the the business object.

> This method is invalid for command objects and read-only business objects.

The default function works like that:

```
function fromCto(context, cto) {
  if (cto && typeof cto === 'object') {
    context.properties.filter(function (property) {
      return property.isOnCto;
    }).forEach(function (property) {
      if (cto.hasOwnProperty(property.name) && typeof cto[property.name] !== 'function') {
        context.setValue(property.name, cto[property.name]);
      }
    });
  }
}
```

An alternative solution to change quickly:

```
function fromCto(context, cto) {
  this.propertyName1 = cto.propertyName1;
  this.propertyName2 = cto.propertyName2;
  ...
  this.propertyNameN = cto.propertyNameN;
}
```
