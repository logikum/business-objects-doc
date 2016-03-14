+++
--- Search engine
title:        business-objects
description:  Factory methods of business object models.
keywords:     business-objects, JavaScript, node.js
--- Menu system
order:        50
text:         Factory objects
+++

# Factory objects

Business objects are instantiated by the create() or fetch() factory methods of
the model. The object creation can executed through a factory object of that have
methods that call the create() and fetch() methods of the root model. This way
produces more readable code. For that reason the model definition of root models
are usually extended by a factory class. The fetch() method has filter and method
name arguments that make possible to call several methods on the data access
object using different criteria. Using factory objects provides a way to give this
calls more descriptive names.

The table below summarizes the models and their methods that factory ojects can call:

%indent3%|create|fetch
-|:-:|:-:
[EditableRootModel]       |x|x
[ReadOnlyRootModel]       |-|x
[ReadOnlyRootCollection]  |-|x
[CommandObject]           |x|-

The following examples demonstrate the usage of factory objects:

```
// Editable root model
var Task = bo.EditableRootModel( properties, rules, extensions );

var TaskFactory = {
  create: function (eventHandlers, callback) {
    Task.create(eventHandlers, callback);
  },
  getByKey: function (key, eventHandlers, callback) {
    Task.fetch(key, null, eventHandlers, callback);
  },
  getByName: function (name, eventHandlers, callback) {
    Task.fetch(name, 'fetchByName', eventHandlers, callback);
  }
};

TaskFactory.create(function (err, task) {
  ...
});

// Read-only root model
var TaskView = bo.ReadOnlyRootModel( properties, rules, extensions );

var TaskViewFactory = {
  getByKey: function (key, eventHandlers, callback) {
    TaskView.fetch(key, null, eventHandlers, callback);
  },
  getByName: function (name, eventHandlers, callback) {
    TaskView.fetch(name, 'fetchByName', eventHandlers, callback);
  }
};

TaskViewFactory.getByKey(12345, function (err, taskView) {
  ...
});

// Read-only root collection
var TaskList = bo.ReadOnlyRootCollection( 'TaskList', TaskListItem, rules, extensions );

var TaskListFactory = {
  getAll: function (eventHandlers, callback) {
    TaskList.fetch(null, null, eventHandlers, callback);
  },
  getByOwner: function (owner, eventHandlers, callback) {
    TaskList.fetch(owner, 'fetchByOwner', eventHandlers, callback);
  }
};

TaskListFactory.getByOwner('Azrael', function (err, taskList) {
  ...
});

// Command object
var ScheduleCommand = bo.CommandObject( properties, rules, extensions );

var ScheduleCommandFactory = {
  create: function (eventHandlers, callback) {
    return ScheduleCommand.create(eventHandlers, callback);
  }
};

ScheduleCommandFactory.create(function (err, cmd) {
  ...
});
```

The factory object can be even simpler when event handlers are not used.

Synchronous version of the examples above:

```
// Editable root model
var Task = bo.EditableRootModelSync( properties, rules, extensions );

var TaskFactory = {
  create: function (eventHandlers) {
    return Task.create(eventHandlers);
  },
  getByKey: function (key, eventHandlers) {
    return Task.fetch(key, null, eventHandlers);
  },
  getByName: function (name, eventHandlers) {
    return Task.fetch(name, 'fetchByName', eventHandlers);
  }
};

var task = TaskFactory.create();

// Read-only root model
var TaskView = bo.ReadOnlyRootModelSync( properties, rules, extensions );

var TaskViewFactory = {
  getByKey: function (key, eventHandlers) {
    return TaskView.fetch(key, null, eventHandlers);
  },
  getByName: function (name, eventHandlers) {
    return TaskView.fetch(name, 'fetchByName', eventHandlers);
  }
};

var taskView = TaskViewFactory.getByKey(12345);

// Read-only root collection
var TaskList = bo.ReadOnlyRootCollectionSync( 'TaskList', TaskListItem, rules, extensions );

var TaskListFactory = {
  getAll: function (eventHandlers) {
    return TaskList.fetch(null, null, eventHandlers);
  },
  getByOwner: function (owner, eventHandlers) {
    return TaskList.fetch(owner, 'fetchByOwner', eventHandlers);
  }
};

var taskList = TaskListFactory.getByOwner('Azrael');

// Command object
var ScheduleCommand = bo.CommandObjectSync( properties, rules, extensions );

var ScheduleCommandFactory = {
  create: function (eventHandlers) {
    return ScheduleCommand.create(eventHandlers);
  }
};

var cmd = ScheduleCommandFactory.create();
```
