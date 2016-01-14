+++
--- Search engine
title:        business-objects
description:  Property definitions of business object models.
keywords:     business-objects, JavaScript, node.js
--- Menu system
order:        20
text:         Property definitions
+++

# Property definitions

Model properties are defined using [PropertyInfo] class. A general property
definition looks like that:

```
var property = new Property(name, type, flags, getter, setter);
```

Arguments `name` and `type` are required. Argument `name` is a string, and it defines
the name of the property. Argument `type` is either a [DataType] member or another model's type:

```
var price = new Property('price', DataType.Decimal);
var customer = new Property('customer', Customer);
```

The following data types are supported out of the box: [Boolean], [Text], [Email],
[Integer], [Decimal], [Enum] and [DateTime]. Custom data types can be created as well.
See [Data types](data-types) page for details.

> Properties representing child models or collections are read-only ones to prevent
> their unintended deletions.

Arguments `flags`, `getter` and `setter` can be used when `type` is a [DataType] member.
Argument `flags` is a combination of [PropertyFlag] values:

* __none__  
  The default value. The property is a normal read-write property.
* __readOnly__  
  The property can be read but cannot be written, i.e. it has getter only.
  This flag is ignored for read-only business objects.
* __key__  
  The property is a key element of the business object.
* __parentKey__  
  The property holds the key element of the parent business object.
* __notOnDto__  
  The property is not cloned onto the data transfer object, i.e. it is not persisted.
  It usually marks a calculated property that is required by the client application.
* __notOnCto__  
  The property is not cloned onto the client transfer object, but it is required for
  the business logic.

> Keys are internally used in business objects as well. In remove actions keys are passed
> as filter arguments to data access objects. Keys are also used in child collections to
> identify collection items when a business object is rebuilt from the client transfer object.

Some examples:

```
var orderItemKey = new Property('orderItemKey', DataType.Integer, F.key | F.readOnly);
var orderKey = new Property('orderKey', DataType.Integer, F.parentKey | F.readOnly);
var fullName = new Property('fullName', DataType.Text, F.notOnDto | F.readOnly);
var secret = new Property('secret', DataType.Text, F.notOnCto);
```

Argument `getter` is a function that replaces the internal getter function that is
equivalent to the following custom getter:

```
function getFirstName (ctx) {
  return ctx.getValue('firstName');
}
```

E.g. a fullName property can be defined in this way:

```
function getFullName (ctx) {
  return ctx.getValue('firstName') + ' ' + ctx.getValue('lastName');
}
var firstName = new Property('firstName', DataType.Text);
var lastName = new Property('lastName', DataType.Text);
var fullName = new Property('fullName', DataType.Text, F.notOnDto | F.readOnly, getFullName);
```

Similarly, argument `setter` is a function that replaces the internal setter function.
Custom setter is ignored for read-only properties. The internal setter function is
equivalent to the following custom one:

```
function setLastName (ctx, value) {
  ctx.setValue('lastName', value);
}
```

E.g. firstName and lastName properties can be defined in this way:

```
function setFullName (ctx, value) {
  ctx.setValue('fullName', value);
  var names = value.split(' ');
  ctx.setValue('firstName', name[0]);
  ctx.setValue('lastName', name[1]);
}
var firstName = new Property('firstName', DataType.Text, F.notOnCto | F.readOnly);
var lastName = new Property('lastName', DataType.Text, F.notOnCto | F.readOnly);
var fullName = new Property('fullName', DataType.Text, F.notOnDto, null, setFullName);
```

The context argument is a [PropertyContext] object that has the following members to use:

* __primaryProperty__  
  A read-only property that returns a [PropertyInfo] object that contains the definition
  of the property itself.
* __properties__  
  A read-only property that returns an array of [PropertyInfo] objects that contain the 
  definitions of all properties.
* __getValue(propertyName)__  
  The method returns the value of the property determined by the given name. 
* __setValue(propertyName, value)__  
  The method sets the value of the property determined by the given name. 
