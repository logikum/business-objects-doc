+++
--- Search engine
title:        business-objects
description:  Data access objects.
keywords:     business-objects, JavaScript, node.js
--- Menu system
order:        10
text:         Data access objects
+++

# Data access objects

The data access objects deliver the data between the business objects and the data stores.
The direction of the data move is one way for read-only objects: the data come from the
data store to the business object. For editable objects the data move in both ways: from
the data store to the business object, and from the business object to the data store,
respectively. In case of command objects the data move can be any sort of: from the data
store to the business object only; from the business object to the data store only; or
both directions. If a model supports multiple data store, the business object should have
data access objects for each data store.

The table below summarizes which models have data access objects, and the methods those
data access objects may have: 

 |create()|fetch*()|insert()|update()|remove()|execute*()
-|-|-|-|-|-|-|-
[EditableRootObject]       |x|x|x|x|x|-
[EditableChildObject]      |x|-|x|x|x|-
[EditableRootCollection]  |-|x|-|-|-|-
[EditableChildCollection] |-|-|-|-|-|-
[ReadOnlyRootObject]       |-|x|-|-|-|-
[ReadOnlyChildObject]      |-|-|-|-|-|-
[ReadOnlyRootCollection]  |-|x|-|-|-|-
[ReadOnlyChildCollection] |-|-|-|-|-|-
[CommandObject]           |-|-|-|-|-|x

The data access objects can have `fetch*()` methods in case of __root models and
collections__ only.

> If a root business object have child objects, then the root `fetch()` method retrieve
> the data of the child objects as well, and passes them to the child objects.
> This way is faster for it requires only one call to the data store.

The data access objects of __editable models__ usually have `create()`, `insert()`,
`update()` and `remove()` methods as well.

Editable child collections and read-only child models and collections do not have data
access objects.

Command objects require data access objects that have `execute*()` methods.

__fetch\*() and execute\*()__

Basically `fetch*()` and `execute*()` methods can have any name, and can have more methods
with different names. The names of the methods are defined in the factory objects. If these
static methods do not define a name for the actual method, then the `fetch()` and `execute()`
method names are used.

See [Factory objects](/definitions/factory-objects) page for more information.
