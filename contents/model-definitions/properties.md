[//]: # (20, Property definitions)

# Property definitions

Model properties are defined using [PropertyInfo] class. A general property
definition looks like that:

```
var property = new Property(name, type, flags, getter, setter);
```

Arguments `name` and `type` are required. Argument `name` is a string, and it defines
the name of the property. Argument `type` either a [DataType] member or another model's type:

```
var price = new Property('price', DataType.Decimal);
var customer = new Property('customer', Customer);
```

The following data types are supported out of the box: [Boolean], [Text], [Email],
[Integer], [Decimal], [Enum] and [DateTime]. Custom data types can be created as well.
See [Data types](data-types) page for details.