# Predefined validation rules

> * [Validation](/model-definitions/validation)
> * _Predefined validation rules_
> * [Custom validation rules](custom)

The bo.commonRules namespaces contains some validation rules that provides
the frequently applied validation rules.

### RequiredRule

The [RequiredRule] ensures that the value of a property is not null, and - in
case of a [Text] property - is not an empty string.

The constructor of the rule has no additional argument:

```
var property = new Property('name', DataType.Text);
var rule = cr.required(property, 'message', 50, false);
```

Default values:
* message = 'Property {0} is required.'
  * {0}: the property name
* priority = 50
* stopsProcessing = false

### MinValueRule

The [MinValueRule] ensures that the value of a property is equal or greater
than a given value.

The constructor of the rule has one additional argument:
* minValue: A number that defines the minimum value of the property.

```
var property = new Property('price', DataType.Decimal);
var rule = cr.minValue(property, 33.3, 'message', 10, false);
```

Default values:
* message = 'The value of property {0} has to be {1} at least.'
  * {0}: the property name
  * {1}: the minimum value of the property
* priority = 10
* stopsProcessing = false

### MaxValueRule

The [MaxValueRule] ensures that the value of a property is equal or less
than a given value.

The constructor of the rule has one additional argument:
* maxValue: A number that defines the maximum value of the property.

```
var property = new Property('width', DataType.Integer);
var rule = cr.maxValue(property, 123, 'message', 10, false);
```

Default values:
* message = 'The value of property {0} cannot exceed {1}.'
  * {0}: the property name
  * {1}: the maximum value of the property
* priority = 10
* stopsProcessing = false

### MinLengthRule

The [MinLengthRule] ensures that the length of a property value is equal or
greater than a given value. The value of the property is converted to string.

The constructor of the rule has one additional argument:
* minLength: A number that defines the minimum length of the property value.

```
var property = new Property('description', DataType.Text);
var rule = cr.minValue(property, 57, 'message', 10, false);
```

Default values:
* message = 'The length of property {0} has to be {1} character(s) at least.'
  * {0}: the property name
  * {1}: the minimum length of the property value
* priority = 10
* stopsProcessing = false

### MaxLengthRule

The [MaxLengthRule] ensures that the length of a property value is equal or
less than a given value. The value of the property is converted to string.

The constructor of the rule has one additional argument:
* maxLength: A number that defines the maximum length of the property value.

```
var property = new Property('abstract', DataType.Text);
var rule = cr.maxValue(property, 256, 'message', 10, false);
```

Default values:
* message = 'The length of property {0} cannot exceed {1} character(s).'
  * {0}: the property name
  * {1}: the maximum length of the property value
* priority = 10
* stopsProcessing = false

### LengthIsRule

The [LengthIsRule] ensures that the length of a property value is equal to a
given value. The value of the property is converted to string.

The constructor of the rule has one additional argument:
* length: A number that defines the length of the property value.

```
var property = new Property('code', DataType.Integer);
var rule = cr.lengthIs(property, 8, 'message', 10, false);
```

Default values:
* message = 'The length of property {0} has to be {1} character(s).'
  * {0}: the property name
  * {1}: the length of the property value
* priority = 10
* stopsProcessing = false

### ExpressionRule

### InformationRule

### DependencyRule

