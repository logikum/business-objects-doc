+++
order: 80
title: Data types
+++

# Data types

The business objects have their own data types. All data types can have null value.
They inherits the [DataType] class, this way they implements two abstract methods:

* __parse( value )__  
  It checks whether the value conforms to the data type definition. Returns the
  value when it has the required data type. If not, but it can be converted into
  the required data type, then returns the converted value. Otherwise returns
  `undefined` to mark the value as invalid.
* __hasValue( value )__  
  It checks if the data type of the value conforms to the data type definition
  and it is not null.

The library provides the following data types:

Name | Description
-|:-
[Boolean] | Represents a Boolean value, i.e. true, false or null.
[Text] | Represents any string, including empty string and null.
[Email] | Represents an e-mail address of format name@domain.tld or null.
[Integer] | Represents an integer or null.
[Decimal] | Represents any number or null.
[Enum] | Represents an enumeration value or null. See [Enumerations](/application/miscellaneous/enumerations) page for more information.
[DateTime] | Represents a date and time value or null.

Custom types can be created inheriting [DataType] class and overriding `parse()` and
`hasValue()` methods. The example below provides a time data type in hh:mm and h:mm
format.

```
var util = require('util');
var bo = require('business-objects');

var DataType = bo.dataTypes.DataType;
var reTime = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

// Define Time class.
function Time () {
  DataType.call(this);
}
util.inherits(Time, DataType);

// Override parse() function.
Time.prototype.parse = function (value) {

  // Test whether input has value.
  if (value === null || value === undefined)
    return null;

  // Normalize input value.
  var time;
  if (typeof value === 'string')
    time = value;
  else if (value instanceof String)
    time = value.valueOf();
  else
    time = new String(value).valueOf();

  // Check input value.
  return time.length && reTime.test(time) ? time : undefined;
};

// Override hasValue() function.
Time.prototype.hasValue = function (value) {

  // Evaluate input value.
  var parsed = this.parse(value);
  return parsed !== undefined && parsed !== null;
};
```
