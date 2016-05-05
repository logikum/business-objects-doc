+++
--- Search engine
title:        business-objects
description:  Model composer's collection methods.
keywords:     business-objects, JavaScript, node.js
--- Menu system
order:        20
text:         Collections
+++

# Model composer's collection methods

The model composer has one method concerning collections:

* __itemType( itemType )__

%args%|
-|-
itemType | The type of the collections elements, i.e. a model definition. 

The method defines the model type of the objects in the collections.
For example:

```
var bo = require( 'business-objects' );
var Model = bo.ModelComposer;

var OrderListItem = require( './order-list-item.js' );

var OrderList = Model( 'OrderList' )
    .readOnlyRootCollection( 'dao', __filename )
    // --- Collection elements
    .itemType( OrderListItem )
    // --- Build model class
    .compose();
```

The application matrix of model composer's collection method:

| %indent2% Method | ero | erc | eco | ecc | rro | rrc | rco | rcc | co |
|:-------- |:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| itemType |     |  x  |     |  x  |     |  x  |     |  x  |     |

<center><small><i>
ero = editable root object, eco = editable child object,
rro = read-only root object, rco = read-only child object<br/>
erc = editable root collection, ecc = editable child collection,
rrc = read-only root collection, rcc = read-only child collection<br/>
co = command object
</i></small></center>
