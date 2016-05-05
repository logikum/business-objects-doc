+++
--- Search engine
title:        business-objects
description:  Model composer's property methods.
keywords:     business-objects, JavaScript, node.js
--- Menu system
order:        30
text:         Properties
+++

# Model composer's property methods

As the name hints, property methods define properties. Since collections
cannot have properties, model composer's property methods apply to objects
only. For more information see [Property definitions](/definitions/properties)
and [Data types](/definitions/data-types) pages.

* __boolean__( propertyName, flags, getter, setter )
* __text__( propertyName, flags, getter, setter )
* __email__( propertyName, flags, getter, setter )
* __integer__( propertyName, flags, getter, setter )
* __decimal__( propertyName, flags, getter, setter )
* __enum__( propertyName, flags, getter, setter )
* __dateTime__( propertyName, flags, getter, setter )

%args%|
-|-
propertyName | The name of the property. _Required string._
flags |  Other attributes of the property. _Optional [PropertyFlag]._
getter | Custom _function_ to read the value of the property. _Optional._
setter | Custom _function_ to write the value of the property. _Optional._ 

A property with custom data type can be defined using the following method:

* __property__( propertyName, typeCtor, flags, getter, setter )

%args%|
-|-
typeCtor | The data type of the property. *Required [DataType].*

It can be defined in similar way when the property is a child model:

* __property__( propertyName, childModel )

%args%|
-|-
childModel | The type of the child model, i.e. a model definition. *Required.*

The application matrix of model composer's property methods:

| %indent2% Method | ero | erc | eco | ecc | rro | rrc | rco | rcc | co |
|:-------- |:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| boolean  |  x  |     |  x  |     |  x  |     |  x  |     |  x  |
| text     |  x  |     |  x  |     |  x  |     |  x  |     |  x  |
| email    |  x  |     |  x  |     |  x  |     |  x  |     |  x  |
| integer  |  x  |     |  x  |     |  x  |     |  x  |     |  x  |
| decimal  |  x  |     |  x  |     |  x  |     |  x  |     |  x  |
| enum     |  x  |     |  x  |     |  x  |     |  x  |     |  x  |
| dateTime |  x  |     |  x  |     |  x  |     |  x  |     |  x  |
| property |  x  |     |  x  |     |  x  |     |  x  |     |  x  |

<center><small><i>
ero = editable root object, eco = editable child object,
rro = read-only root object, rco = read-only child object<br/>
erc = editable root collection, ecc = editable child collection,
rrc = read-only root collection, rcc = read-only child collection<br/>
co = command object
</i></small></center>

An example:

```
var bo = require( 'business-objects' );
var Model = bo.ModelComposer;
var F = bo.shared.PropertyFlag;

var OrderItems = require( './order-items.js' );

function getOrderCode( ctx ) {
    return ctx.getValue( 'orderKey' ).toString( 2 );
}

var Order = Model( 'Order' )
    .editableRootObject( 'dal', __filename )
    // --- Properties
    .integer( 'orderKey', F.key | F.readOnly )
    .text( 'orderCode', F.onCtoOnly, getOrderCode )
    .text( 'customerName' )
        .required()
    .dateTime( 'shippingDate' )
        .required()
    .decimal( 'totalPrice', F.readOnly )
    .boolean( 'approved' )
        .required()
    .property( 'items', OrderItems )
    // --- Build model class
    .compose();
```
