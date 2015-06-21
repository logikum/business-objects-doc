[//]: # (80, Data types)

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
[Enum] | Represents an enumeration value or null. See [Eumerations](/advanced/miscellaneous/enumerations) page for more information.
[DateTime] | Represents a date and time value or null.

