+++
--- Search engine
title:        business-objects
description:  Definition of business object models.
keywords:     business-objects, JavaScript, node.js
--- Menu system
order:        10
text:         Model definition
+++

# Model definition

Model definitions suppose the following variables for simplicity and easier reading:

```
var bo = require('business-objects');

var Properties = bo.shared.PropertyManager;
var Rules = bo.rules.RuleManager;
var Action = bo.rules.AuthorizationAction;
var Extensions = bo.shared.ExtensionManager;     // for asynchronous models
// var Extensions = bo.shared.ExtensionManagerSync; for synchronous models
var Property = bo.shared.PropertyInfo;
var F = bo.shared.PropertyFlag;
var dt = bo.dataTypes;
var cr = bo.commonRules;
```

A model definition in general looks like this:

```
var definition = bo.<ModelType>(properties, rules, extensions);
```

In the above statement ```<ModelType>``` represents one of the following model types:

%indent1%| Asynchronous models | Synchronous models |&nbsp;
-| ------------------------- | ----------------------------- |-
 | [EditableRootObject]       | [EditableRootObjectSync]       |
 | [EditableRootCollection]  | [EditableRootCollectionSync]  |
 | [EditableChildObject]      | [EditableChildObjectSync]      |
 | [EditableChildCollection] | [EditableChildCollectionSync] |
 | [ReadOnlyRootObject]       | [ReadOnlyRootObjectSync]       |
 | [ReadOnlyChildObject]      | [ReadOnlyChildObjectSync]      |
 | [ReadOnlyRootCollection]  | [ReadOnlyRootCollectionSync]  |
 | [ReadOnlyChildCollection] | [ReadOnlyChildCollectionSync] |
 | [CommandObject]           | [CommandObjectSync]           |

Argument ```properties``` is an instance of [PropertyManager] class that requires a name
and some properties:

```
var key = new Property('key', DataType.Integer, F.key | F.readOnly);
var name = new Property('name', DataType.Text);
var hasCar = new Property('hasCar', DataType.Boolean);

var properties1 = new Properties('Person');
properties1.add(key);
properties1.add(name);
properties1.add(hasCar);

// or simply
var properties2 = new Properties('Person', key, name, hasCar);
```

The first argument of the constructor is required, and it will be the name of
the business object defined.
See [Property definitions](/definitions/properties) page for more information.

Argument ```rules``` is an instance of [RuleManager] class that contains the rules
of the business object:

```
var rules = new Rules(
    cr.required(name),
    cr.isInRole(Action.fetchObject, null, 'managers', 'You are not authorized to manage persons.')
);
```

The rule manager holds the validation rules and the authorization ones, respectively.
See [Rule definitions](/definitions/rules) page for more information.

Argument ```extensions``` is an instance of [ExtensionManager] or [ExtensionManagerSync]
class. It serves as an extension point of the business model. Its constructor has two
mandatory arguments: the name of the data source and the full path of the model definition.

```
var extensions = new Extensions('dao', __filename);
```

See [Extensions](/definitions/extensions) page for more information.

Business objects are designed to be instantiated by static methods. Factory objects can be
created for root models making their usage simpler. For example:

```
var Person = bo.EditableRootObject(properties, rules, extensions);

var PersonFactory = {
  create: function (eventHandlers) {
    return Person.create(eventHandlers);
  },
  getByKey: function (key, eventHandlers) {
    return Person.fetch(key, null, eventHandlers);
  },
  getByName: function (name, eventHandlers) {
    return Person.fetch(name, 'fetchByName', eventHandlers);
  }
};
```

See [Factory objects](/definitions/factory-objects) page for more information.
