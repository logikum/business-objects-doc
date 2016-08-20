+++
--- Search engine
title:        business-objects
description:  Model composer's object rule methods.
keywords:     business-objects, JavaScript, node.js
--- Menu system
order:        50
text:         Object rules
+++

# Model composer's object rule methods

The object rule methods apply authorization rules to the objects themselves.
For more information see [Rule definitions](/definitions/authorization) page.

The model composer has the following methods to apply the authorization
rules to objects:

* __canCreate__( ruleFactory, [&hellip;params], message, priority, stopsProcessing )
* __canFetch__( ruleFactory, [&hellip;params], message, priority, stopsProcessing )
* __canUpdate__( ruleFactory, [&hellip;params], message, priority, stopsProcessing )
* __canRemove__( ruleFactory, [&hellip;params], message, priority, stopsProcessing )
* __canExecute__( ruleFactory, [&hellip;params], message, priority, stopsProcessing )
* __canCall__( methodName, ruleFactory, [&hellip;params], message, priority, stopsProcessing )

%args%|
-|-
ruleFactory | A factory function that return the [AuthorizationRule] to add. _Required._
&hellip;params | Optional parameters depending on the authorization rule.
message | Human-readable description of the rule failure. _Required string._
priority | The priority of the rule. _Optional number._
stopsProcessing | Indicates the rule behavior in case of failure. _Optional Boolean._
methodName | The name of the custom method to execute. _Required string._

The application matrix of model composer's object rule methods:

| %indent2% Method | ero | erc | eco | ecc | rro | rrc | rco | rcc | co |
|:-------- |:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| canCreate  |  x  |  x  |  x  |     |     |     |     |     |     |
| canFetch   |  x  |  x  |  x  |     |  x  |  x  |  x  |     |     |
| canUpdate  |  x  |  x  |  x  |     |     |     |     |     |     |
| canRemove  |  x  |  x  |  x  |     |     |     |     |     |     |
| canExecute |     |     |     |     |     |     |     |     |  x  |
| canCall    |  x  |  x  |  x  |     |  x  |  x  |  x  |     |  x  |

<center><small><i>
ero = editable root object, eco = editable child object,
rro = read-only root object, rco = read-only child object<br/>
erc = editable root collection, ecc = editable child collection,
rrc = read-only root collection, rcc = read-only child collection<br/>
co = command object
</i></small></center>

An example that uses object rule methods of model composer:

```
var bo = require( 'business-objects' );
var Model = bo.ModelComposer;
var cr = bo.commonRules;
var F = bo.shared.PropertyFlag;

var OrderItems = require( './order-items.js' );

var Order = Model( 'Order' )
    .editableRootObject( 'dal', __filename )
    // --- Properties
    .integer( 'orderKey', F.key | F.readOnly )
    .text( 'customerName' )
        .required()
        .maxLength( 50 )
    .dateTime( 'shippingDate' )
    .decimal( 'totalPrice', F.readOnly )
    .boolean( 'approved' )
    .property( 'items', OrderItems )
    // --- Permissions
    .canFetch( cr.isInRole, 'sales', 'You are not authorized to retrieve orders.' )
    .canCreate( cr.isInRole, 'sales', 'You are not authorized to create orders.' )
    .canUpdate( cr.isInRole, 'sales', 'You are not authorized to modify orders.' )
    .canRemove( cr.isInRole, 'sales', 'You are not authorized to delete orders.' )
    // --- Build model class
    .compose();
```
