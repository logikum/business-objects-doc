# Predefined validation rules

> * [Validation](/definitions/validation)
> * _Predefined validation rules_
> * [Custom validation rules](custom)

The bo.commonRules namespaces contains some validation rules that provides
the frequently applied validation rules.

* [RequiredRule](#a)
* [MinValueRule](#b)
* [MaxValueRule](#c)
* [MinLengthRule](#d)
* [MaxLengthRule](#e)
* [LengthIsRule](#f)
* [ExpressionRule](#g)
* [InformationRule](#h)
* [DependencyRule](#i)

### <a name="a"></a>RequiredRule

The [RequiredRule] ensures that the value of a property is not null, and - in
case of a [Text] property - is not an empty string.

The constructor of the rule has no additional argument:

```
var property = new Property('name', DataType.Text);
var rule = cr.required(property, 'message', 50, false);
```

Default values:
* _message_ = 'Property {0} is required.'
  * {0}: the property name
* _priority_ = 50
* _stopsProcessing_ = false

### <a name="b"></a>MinValueRule

The [MinValueRule] ensures that the value of a property is equal or greater
than a given value.

The constructor of the rule has one additional argument:
* __minValue__: A number that defines the minimum value of the property.

```
var property = new Property('price', DataType.Decimal);
var rule = cr.minValue(property, 33.3, 'message', 10, false);
```

Default values:
* _message_ = 'The value of property {0} has to be {1} at least.'
  * {0}: the property name
  * {1}: the minimum value of the property
* _priority_ = 10
* _stopsProcessing_ = false

### <a name="c"></a>MaxValueRule

The [MaxValueRule] ensures that the value of a property is equal or less
than a given value.

The constructor of the rule has one additional argument:
* __maxValue__: A number that defines the maximum value of the property.

```
var property = new Property('width', DataType.Integer);
var rule = cr.maxValue(property, 123, 'message', 10, false);
```

Default values:
* _message_ = 'The value of property {0} cannot exceed {1}.'
  * {0}: the property name
  * {1}: the maximum value of the property
* _priority_ = 10
* _stopsProcessing_ = false

### <a name="d"></a>MinLengthRule

The [MinLengthRule] ensures that the length of a property value is equal or
greater than a given value. The value of the property is converted to string.

The constructor of the rule has one additional argument:
* __minLength__: A number that defines the minimum length of the property value.

```
var property = new Property('description', DataType.Text);
var rule = cr.minValue(property, 57, 'message', 10, false);
```

Default values:
* _message_ = 'The length of property {0} has to be {1} character(s) at least.'
  * {0}: the property name
  * {1}: the minimum length of the property value
* _priority_ = 10
* _stopsProcessing_ = false

### <a name="e"></a>MaxLengthRule

The [MaxLengthRule] ensures that the length of a property value is equal or
less than a given value. The value of the property is converted to string.

The constructor of the rule has one additional argument:
* __maxLength__: A number that defines the maximum length of the property value.

```
var property = new Property('abstract', DataType.Text);
var rule = cr.maxValue(property, 256, 'message', 10, false);
```

Default values:
* _message_ = 'The length of property {0} cannot exceed {1} character(s).'
  * {0}: the property name
  * {1}: the maximum length of the property value
* _priority_ = 10
* _stopsProcessing_ = false

### <a name="f"></a>LengthIsRule

The [LengthIsRule] ensures that the length of a property value is equal to a
given value. The value of the property is converted to string.

The constructor of the rule has one additional argument:
* __length__: A number that defines the length of the property value.

```
var property = new Property('code', DataType.Integer);
var rule = cr.lengthIs(property, 8, 'message', 10, false);
```

Default values:
* _message_ = 'The length of property {0} has to be {1} character(s).'
  * {0}: the property name
  * {1}: the length of the property value
* _priority_ = 10
* _stopsProcessing_ = false

### <a name="g"></a>ExpressionRule

The [ExpressionRule] ensures that the property value matches a regular expression.
The value of the property is converted to string.

The constructor of the rule has two additional arguments:
* __regex__: The regular expression that specifies the rule.
* __option__: A [NullResultOption] member that defines the action to execute when the value is null.
  * returnTrue = The result of the rule will be success.
  * returnFalse = The result of the rule will be failure.
  * convertToEmptyString = The value will be replaced by an empty string.

```
var property = new Property('plateNumber', DataType.Text);
var rule = cr.expression(property, /[A-Z]{3}-\d{3}/, cr.NullResultOption.returnFalse, 'message', 10, false);
```

Default values:
* _message_ = 'Property {0} is invalid.'
  * {0}: the property name
* _priority_ = 10
* _stopsProcessing_ = false

### <a name="h"></a>InformationRule

The [InformationRule] ensures that an information is displayed for the property.

The constructor of the rule has no additional argument:

```
var property = new Property('plateNumber', DataType.Text);
var rule = cr.information(property, 'The plate number must be in AAA-000 format.', 1, false);
```

Default values:
* _message_ = {The information to display. Required.}
* _priority_ = 1
* _stopsProcessing_ = false

### <a name="i"></a>DependencyRule

The [DependencyRule] ensures that the changes of the property value start
the rule checking on the dependent properties as well.

The constructor of the rule has one additional argument:
* __dependencies__: A single dependent property or an array of them. The type
  of each dependency item is [PropertyInfo].

```
var spouse = new Property('spouse', DataType.Text);
...
var isMarried = new Property('isMarried', DataType.Boolean);
var rule = cr.dependency(isMarried, spouse, 'message', -100, false);
```

Default values:
* _message_ = {No message.}
* _priority_ = -100
* _stopsProcessing_ = false

