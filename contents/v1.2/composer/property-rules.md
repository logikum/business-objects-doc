+++
--- Search engine
title:        business-objects
description:  Model composer's property rule methods.
keywords:     business-objects, JavaScript, node.js
--- Menu system
order:        40
text:         Property rules
+++

# Model composer's property rule methods

The property rule methods add business logic to the properties. For the
sake of simplicity property rules do not require the name of the property
as a parameter, therefore they must follow directly the definition method
of the property they related to. The property rule methods fall in two
categories: they can define validation rules or authorization rules.
For more information see [Rule definitions](/definitions/rules) page.

### Property methods for validation rules

The model composer has the following methods to apply the predefined
validation rules to properties:

* __required__( message, priority, stopsProcessing )
* __maxLength__( maxLength, message, priority, stopsProcessing )
* __minLength__( minLength, message, priority, stopsProcessing )
* __lengthIs__( length, message, priority, stopsProcessing )
* __maxValue__( maxValue, message, priority, stopsProcessing )
* __minValue__( minValue, message, priority, stopsProcessing )
* __expression__( regex, option, message, priority, stopsProcessing )
* __dependency__( dependencies, message, priority, stopsProcessing )
* __information__( message, priority, stopsProcessing )

%args%|
-|-
message | Human-readable description of the rule failure. _Required string._
priority | The priority of the rule. _Optional number._
stopsProcessing | Indicates the rule behavior in case of failure. _Optional Boolean._
maxLength | The maximum length of the property value. _Required number._ 
minLength | The minimum length of the property value. _Required number._ 
length | The required length of the property value. _Required number._ 
maxValue | The maximum value of the property value. _Required number._ 
minValue | The minimum value of the property value. _Required number._ 
regex | The regular expression that specifies the rule. _Required RegExp._ 
option | The action to execute when the value is null. _Required [NullResultOption]._ 
dependencies | A single dependent property or an array of them. _Required [PropertyInfo]&#124;Array.<[PropertyInfo]>._ 

A custom validation rule can be added to a property using the following method:

* __validate__( ruleFactory, [&hellip;params] message, priority, stopsProcessing )

%args%|
-|-
ruleFactory | A factory function that return the [ValidationRule] to add. _Required._
&hellip;params | Optional parameters depending on the validation rule.

For more information see [Validation rules](/definitions/validation) page.

### Property methods for authorization rules

The model composer has two methods to apply the authorization rules to properties:

* __canRead__( ruleFactory, [&hellip;params], message, priority, stopsProcessing )
* __canWrite__( ruleFactory, [&hellip;params], message, priority, stopsProcessing )

%args%|
-|-
ruleFactory | A factory function that return the [AuthorizationRule] to add. _Required._
&hellip;params | Optional parameters depending on the authorization rule.
message | Human-readable description of the rule failure. _Required string._
priority | The priority of the rule. _Optional number._
stopsProcessing | Indicates the rule behavior in case of failure. _Optional Boolean._

For more information see [Authorization rules](/definitions/authorization) page.

<hr />

The application matrix of model composer's property rule methods:

| %indent2% Method | ero | erc | eco | ecc | rro | rrc | rco | rcc | co |
|:----------- |:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| required    |  x  |     |  x  |     |  o  |     |  o  |     |  x  |
| maxLength   |  x  |     |  x  |     |  o  |     |  o  |     |  x  |
| minLength   |  x  |     |  x  |     |  o  |     |  o  |     |  x  |
| lengthIs    |  x  |     |  x  |     |  o  |     |  o  |     |  x  |
| maxValue    |  x  |     |  x  |     |  o  |     |  o  |     |  x  |
| minValue    |  x  |     |  x  |     |  o  |     |  o  |     |  x  |
| expression  |  x  |     |  x  |     |  o  |     |  o  |     |  x  |
| dependency  |  x  |     |  x  |     |  o  |     |  o  |     |  x  |
| information |  x  |     |  x  |     |  o  |     |  o  |     |  x  |
| validate    |  x  |     |  x  |     |  o  |     |  o  |     |  x  |
| canRead     |  x  |     |  x  |     |  x  |     |  x  |     |  x  |
| canWrite    |  x  |     |  x  |     |     |     |     |     |  x  |
_o = allowed but rarely used_

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
var cr = bo.commonRules;
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
        .maxLength( 50 )
    .dateTime( 'shippingDate' )
        .required()
    .decimal( 'totalPrice', F.readOnly )
        .required()
        .minValue( 0 )
    .boolean( 'approved' )
        .required()
        .canWrite( cr.isInRole, 'managers', 'Only managers can approve an order.' )
    .property( 'items', OrderItems )
    // --- Build model class
    .compose();
```
