+++
--- Search engine
title:        business-objects
description:  Rule definitions for business object models.
keywords:     business-objects, JavaScript, node.js
--- Menu system
order:        30
text:         Rule definitions
+++

# Rule definitions

All rules are based on [RuleBase] type, therefore they have the following properties:

* __ruleName__  
  The name of the rule type.
  The default value usually the name of the constructor, without the Rule suffix.
* __message__  
  Human-readable description of the failure of the rule, or the key of the localizable
  description. Usually rules provide a default localized message.
* __priority__  
  The priority of the rule. Higher number means higher priority. The default value is 10.
  The rules of a property are evaluated in descending order of the priority.
* __stopsProcessing__  
  A Boolean value that indicates whether processing of the rules for a property stops
  when the rule fails.

The rules fall into two categories: validation rules and authorization rules.

### Validation rules

The validation rules ensures that the value of a property meets the required conditions.
Validation rule must inherit [ValidationRule] type, that requires at least the following
additional property:

* __primaryProperty__  
  The definition of the property the rule relates to, it is required.

Validation rules are usually constructed using this pattern:

```
var validation = new RuleName(primaryProperty, [args, ...] message, priority, stopsProcessing);
// optionally:
validation.addInputProperty(property);
validation.addAffectedProperty(property);
```

See [Validation](/definitions/validation) page for more information about validation
rules. 

### Authorization rules

The authorization rules ensures that only users with appropriate privileges can use the
business object. Authorization rules must inherit [AuthorizationRule] type, that adds
the following additional properties: 

* __action__  
  The action to be authorized, it is required.
* __target__  
  Eventual parameter of the authorization action.
* __noAccessBehavior__  
  The action to do when the rule fails.

Construction of authorization rules generally follow this pattern:

```
var authorization = new RuleName(action, target, role, message, priority, stopsProcessing);
```

See [Authorization](/definitions/authorization) page for more information about
authorization rules. 

### Common and custom rules

The [commonRules] namespace contains some frequently used rules. The lists of the predefined
rules are available on [Predefined validation rules](/definitions/validation/predefined)
and [Predefined authorization rules](/definitions/authorization/predefined) pages.
In most cases the these rules are enough to set the constraints of business objects:

```
var rules1 = new Rules(
    cr.required(fullName),
    cr.maxLength(fullName, 50),
    cr.isInRole(Action.fetchObject, null, 'managers', 'You are not authorized to retrieve employee data.')
);

// or
var rules2 = new Rules();
rules2.add( cr.required(fullName) );
rules2.add( cr.maxLength(fullName, 50) );
rules2.add( cr.isInRole(Action.fetchObject, null, 'managers', 'You are not authorized to retrieve employee data.') );
```

If there is no predefined rule in [commonRules] to apply a condition, then a custom
rule can be written as described on these pages:
[Custom validation rules](/definitions/validation/custom) and
[Custom authorization rules](/definitions/authorization/custom).