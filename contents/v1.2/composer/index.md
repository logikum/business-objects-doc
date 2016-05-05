+++
--- Search engine
title:        business-objects
description:  Purpose of the model composer.
keywords:     business-objects, JavaScript, node.js
--- Menu system
order:        10
text:         Model composer
+++

# Model composer

Model composer is a helper class to simplify creation of model definitions.
[ModelComposer] creates asynchronous models and [ModelComposerSync] creates
synchronous ones. Model composer uses chaining methods to create easily
readbale model definitions. Using model composer a model definition has the
ollowing basic structure:

```
var bo = require( 'business-objects' );
var Model = bo.ModelComposer;

var AnyModel = Model( 'modelName' )
    // --- Define model type
    .<modelType>( 'dataSource', __filename )
    // --- Model description
    // ...
    // --- Build model class
    .compose();
```

The first call names the model, the next call determines the type of the
model. This method has two mandatory arguments: the name of the data source
and the full path of the model definition. For more information see
[Extensions](/definitions/extensions) page. The subsequent calls describe
the model. The applicable methods depends on the model type. Finally the
`compose()` method creates the model definition itself.

The tables below enlist the methods of the model composer grouped by the
attributes they define:

| %indent3% Model types | Abbreviation |
|:----------------------- |:---:|
| editableRootObject      | ero |
| editableRootCollection  | erc |
| editableChildObject     | eco |
| editableChildCollection | ecc |
| readOnlyRootObject      | rro |
| readOnlyRootCollection  | rrc |
| readOnlyChildObject     | rco |
| readOnlyChildCollection | rcc |
| commandObject           | co  |

In the following tables x marks when the method is applicable on model type:

| %indent2% [Collections](composer/collections) | ero | erc | eco | ecc | rro | rrc | rco | rcc | co |
|:-------- |:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| itemType |     |  x  |     |  x  |     |  x  |     |  x  |     |

| %indent2% [Properties](composer/properties) | ero | erc | eco | ecc | rro | rrc | rco | rcc | co |
|:-------- |:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| boolean  |  x  |     |  x  |     |  x  |     |  x  |     |  x  |
| text     |  x  |     |  x  |     |  x  |     |  x  |     |  x  |
| email    |  x  |     |  x  |     |  x  |     |  x  |     |  x  |
| integer  |  x  |     |  x  |     |  x  |     |  x  |     |  x  |
| decimal  |  x  |     |  x  |     |  x  |     |  x  |     |  x  |
| enum     |  x  |     |  x  |     |  x  |     |  x  |     |  x  |
| dateTime |  x  |     |  x  |     |  x  |     |  x  |     |  x  |
| property |  x  |     |  x  |     |  x  |     |  x  |     |  x  |

| %indent2% [Property rules](composer/property-rules) | ero | erc | eco | ecc | rro | rrc | rco | rcc | co |
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

| %indent2% [Object rules](composer/object-rules) | ero | erc | eco | ecc | rro | rrc | rco | rcc | co |
|:---------- |:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| canCreate  |  x  |  x  |  x  |     |     |     |     |     |     |
| canFetch   |  x  |  x  |  x  |     |  x  |  x  |  x  |     |     |
| canUpdate  |  x  |  x  |  x  |     |     |     |     |     |     |
| canRemove  |  x  |  x  |  x  |     |     |     |     |     |     |
| canExecute |     |     |     |     |     |     |     |     |  x  |
| canCall    |  x  |  x  |  x  |     |  x  |  x  |  x  |     |  x  |

| %indent2% [Extensions](composer/extensions) | ero | erc | eco | ecc | rro | rrc | rco | rcc | co |
|:----------- |:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| daoBuilder  |  x  |  x  |  x  |     |  x  |  x  |     |     |  x  |
| toDto       |  x  |     |  x  |     |     |     |     |     |  x  |
| fromDto     |  x  |     |  x  |     |  x  |     |  x  |     |  x  |
| toCto       |  x  |  x  |  x  |     |  x  |  x  |  x  |     |     |
| fromCto     |  x  |  x  |  x  |     |     |     |     |     |     |
| dataCreate  |  x  |     |  x  |     |     |     |     |     |     |
| dataFetch   |  x  |  x  |  x  |     |  x  |  x  |  x  |     |     |
| dataInsert  |  x  |     |  x  |     |     |     |     |     |     |
| dataUpdate  |  x  |     |  x  |     |     |     |     |     |     |
| dataRemove  |  x  |     |  x  |     |     |     |     |     |     |
| dataExecute |     |     |     |     |     |     |     |     |  x  |
| addMethod   |     |     |     |     |     |     |     |     |  x  |
