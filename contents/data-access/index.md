[//]: # (10, Data access objects)

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
[EditableRootModel]       |x|x|x|x|x|-
[EditableChildModel]      |x|x|x|x|x|-
[EditableChildCollection] |-|-|-|-|-|-
[ReadOnlyRootModel]       |-|x|-|-|-|-
[ReadOnlyChildModel]      |-|-|-|-|-|-
[ReadOnlyRootCollection]  |-|x|-|-|-|-
[ReadOnlyChildCollection] |-|-|-|-|-|-
[CommandObject]           |-|-|-|-|-|x

Each editable model requires a data access object. The data access models usually have
`create()`, `fetch*()`, `insert()`, `update()` and `remove()` methods. Editable collections
have no data access objects.

Read-only root business objects require data access objects that have `fetch*()` methods.
Read-only child business objects do not have data access objects.

> If a read-only root business object have child objects, then the root `fetch()` method
> retrieve the data of the child objects as well, and passes them to the child objects.
> This way requires less data store resources and is faster.

Command objects require data access objects that have `execute*()` methods.

__fetch\*() and execute\*()__

Basically `fetch*()` and `execute*()` methods can have any name, and can have more methods
with different names. The names of the methods are defined in the factory objects. If these
static methods do not define a name for the actual method, then the `fetch()` and `execute()`
method names are used.
