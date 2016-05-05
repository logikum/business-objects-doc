+++
--- Search engine
title:        business-objects
description:  Event handler definitions of business object models.
keywords:     business-objects, JavaScript, node.js
--- Menu system
order:        60
text:         Events
+++

# Business object events

Data portal functions and Save method trigger events in business objects. Each function
initiates two events: one before executing the action and another after having executed it.
The events are named for the functions prefixing pre and post to them. The following table
summarizes the business object events by model types:

 |preCreate<br>postCreate|preFetch<br>postFetch|preSave<br>postSave|preInsert<br>postInsert|preUpdate<br>postUpdate|preRemove<br>postRemove|preExecute<br>postExecute
-|-|-|-|-|-|-|-
[EditableRootObject]       |x|x|x|x|x|x|-
[EditableRootCollection]   |x|x|x|x|x|x|-
[EditableChildObject]      |x|x|-|x|x|x|-
[EditableChildCollection]  |-|-|-|-|-|-|-
[ReadOnlyRootObject]       |-|x|-|-|-|-|-
[ReadOnlyChildObject]      |-|x|-|-|-|-|-
[ReadOnlyRootCollection]   |-|x|-|-|-|-|-
[ReadOnlyChildCollection]  |-|-|-|-|-|-|-
[CommandObject]            |-|-|-|-|-|-|x

The save events are sort of wrapper events in the sense that they will contribute to
insert, update or remove events depending on the state of the root object:

* preSave, preInsert, ... child events, ... postInsert, postSave
* preSave, preUpdate, ... child events, ... postUpdate, postSave
* preSave, preRemove, ... child events, ... postRemove, postSave

Event handlers are bound to the business object instances when they are instantiating,
i.e. in constructors or fetch methods. These functions expect an [EventHandlerList]
object, that is usually passed in a factory method. For more information see
[Factory objects](/definitions/factory-objects) page.

The list of event handlers can be extended by the `add` method of the [EventHandlerList]
object:

* __add( modelName, event, handler )__

%args%|
-|-
modelName | The name of the model. 
event | A member of the [DataPortalEvent] enumeration.
handler | The event handler with function(eventArgs, businessObject) signature.

The event handler takes one argument: a [DataPortalEventArgs] object
that contains information about the event context:

* __modelName__  
  The name of the business object model, of either root or child object.
* __methodName__  
  The name of the data access object method called.
* __eventName__  
  The name of the data portal event.
* __action__  
  The type of the data portal operation, it is a [DataPortalAction] member.
* __locale__  
  The current locale.
* __user__  
  The current user, an object that inherits [UserInfo].
* __error__  
  The error occurred in data portal action, otherwise null. Its type is [DataPortalError].

The `this` keyword in event handler functions always refers to the business object
instance that emitted the event. 

A verbose example of event handlers' definition:

```
var bo = require('business-objects');
var EventHandlerList = bo.shared.EventHandlerList;
var DataPortalEvent = bo.shared.DataPortalEvent;
var Order = require('./models/order.js');

function logEvent (eventArgs) {
  var info = eventArgs.modelName + '.' + eventArgs.methodName + ':' + eventArgs.eventName + ' event.';
  console.log(this.orderNumber + ': ' + info);
}

var ehOrder = new EventHandlerList();
ehOrder.add('Order', DataPortalEvent.preCreate, logEvent);
ehOrder.add('Order', DataPortalEvent.postCreate, logEvent);
ehOrder.add('Order', DataPortalEvent.preFetch, logEvent);
ehOrder.add('Order', DataPortalEvent.postFetch, logEvent);
ehOrder.add('Order', DataPortalEvent.preSave, logEvent);
ehOrder.add('Order', DataPortalEvent.postSave, logEvent);
ehOrder.add('Order', DataPortalEvent.preInsert, logEvent);
ehOrder.add('Order', DataPortalEvent.postInsert, logEvent);
ehOrder.add('Order', DataPortalEvent.preUpdate, logEvent);
ehOrder.add('Order', DataPortalEvent.postUpdate, logEvent);
ehOrder.add('Order', DataPortalEvent.preRemove, logEvent);
ehOrder.add('Order', DataPortalEvent.postRemove, logEvent);
ehOrder.add('OrderItem', DataPortalEvent.preCreate, logEvent);
ehOrder.add('OrderItem', DataPortalEvent.postCreate, logEvent);
ehOrder.add('OrderItem', DataPortalEvent.preFetch, logEvent);
ehOrder.add('OrderItem', DataPortalEvent.postFetch, logEvent);
ehOrder.add('OrderItem', DataPortalEvent.preInsert, logEvent);
ehOrder.add('OrderItem', DataPortalEvent.postInsert, logEvent);
ehOrder.add('OrderItem', DataPortalEvent.preUpdate, logEvent);
ehOrder.add('OrderItem', DataPortalEvent.postUpdate, logEvent);
ehOrder.add('OrderItem', DataPortalEvent.preRemove, logEvent);
ehOrder.add('OrderItem', DataPortalEvent.postRemove, logEvent);

var order = Order.create(ehOrder);
```
