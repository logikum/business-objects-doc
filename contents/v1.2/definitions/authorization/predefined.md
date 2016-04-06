# Predefined authorization rules

> * [Authorization](/definitions/authorization)
> * _Predefined authorization rules_
> * [Custom authorization rules](custom)

The bo.commonRules namespaces contains some authorization rules that provides
the frequently applied authorization rules.

* [IsInRoleRule](#a)
* [IsNotInRoleRule](#b)
* [IsInAnyRoleRule](#c)
* [IsNotInAnyRoleRule](#d)
* [IsInAllRolesRule](#e)

### <a name="a"></a>IsInRoleRule

The [IsInRoleRule] ensures that the user is member of a given role.

The constructor of the rule has one additional argument:
* __role__: A string that defines the name of the role the user must be member of.

```
var property = new Property('price', DataType.Decimal);
var rule = cr.isInRole(Action.writeProperty, property, 'sales', 'message', 100, false);
```

Default values:
* _message_ = 'The user is not member of {0} role.'
  * {0}: the role name
* _priority_ = 100
* _stopsProcessing_ = false

### <a name="b"></a>IsNotInRoleRule

The [IsNotInRoleRule] ensures that the user is not member of a given role.

The constructor of the rule has one additional argument:
* __role__: A string that defines the name of the role the user must not be member of.

```
var property = new Property('wages', DataType.Decimal);
var rule = cr.isNotInRole(Action.readProperty, property, 'workers', 'message', 100, false);
```

Default values:
* _message_ = 'The user is member of {0} role.'
  * {0}: the role name
* _priority_ = 100
* _stopsProcessing_ = false

### <a name="c"></a>IsInAnyRoleRule

The [IsInAnyRoleRule] ensures that the user is member of at least one role in a group of roles.

The constructor of the rule has one additional argument:
* __roles__: A string array that defines the names of the roles the user can be
member of.

```
var rule = cr.isInAnyRole(Action.fetchObject, null, ['managers', 'officers'], 'message', 100, false);
```

Default values:
* _message_ = 'The user is not member of any role of the following: {0}'
  * {0}: the role names
* _priority_ = 100
* _stopsProcessing_ = false

### <a name="d"></a>IsNotInAnyRoleRule

The [IsNotInAnyRoleRule] ensures that the user is not member of any role in a group of roles.

The constructor of the rule has one additional argument:
* __roles__: A string array that defines the names of the roles the user cannot
be member of.

```
var rule = cr.isNotInAnyRole(Action.updateObject, null, ['sales', 'marketing'], 'message', 100, false);
```

Default values:
* _message_ = 'The user is member of some roles of the following: {0}'
  * {0}: the role names
* _priority_ = 100
* _stopsProcessing_ = false

### <a name="e"></a>IsInAllRolesRule

The [IsInAllRolesRule] ensures that the user is member of all roles in a group of roles.

The constructor of the rule has one additional argument:
* __roles__: A string array that defines the names of the roles the user must be
member of.

```
var rule = cr.isInAllRoles(Action.removeObject, null, ['managers', 'sales'], 'message', 100, false);
```

Default values:
* _message_ = 'The user is not member of all roles of the following: {0}'
  * {0}: the role names
* _priority_ = 100
* _stopsProcessing_ = false

