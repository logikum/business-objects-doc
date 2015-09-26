# Custom validation rules

> * [Validation](/model-definitions/validation)
> * [Predefined validation rules](predefined)
> * _Custom validation rules_

If predefined validation rules do not cover the requirements, then custom validation rules
are needed. A new validation rule can be created inheriting the [ValidationRule] class.
Each rule requires a descriptive and preferably unique name. The name identifies the rule
in the collection of broken rules. The business-objects library follows the practice that
the class name of the validation rule is the name of the rule and the appended Rule string.

The parameters of the rule definition are passed in the constructor of the new rule:

* __primaryProperty__  
  _Required [PropertyInfo] object._  
  The definition of the property the rule relates to.
* __arg1, arg2, ...__  
  _Optional._  
  Additional parameters required by the rule to check the validation of the value of the
  primary property.
* __message__  
  _Optional string. The rule has to provide a default message._  
  Human-readable description of the failure of the rule, or the key of the localizable
  description.
* __priority__  
  _Optional integer. The default value is 10._  
  The priority of the rule, greater number means higher priority. 
  The rules of a property are evaluated in descending order of the priority.
* __stopsProcessing__  
  _Optional Boolean. The default value is false._  
  Indicates whether processing of the rules for a property stops when the rule fails.

If the rule needs one or more additional business object properties to check the validation
of the value of the primary property, then these properties can be added to the collection
of input properties using the __addInputProperty()__ method. If the rule - depending on the
conditions - requires checking or rechecking the validation of one or more additional
business object properties, then these properties can be added to the collection of affected
properties using the __addAffectedProperty()__ method. Other parameters are to be stored in
properties of the validation rule object itself.

Each validation rule has to be initialized in the constructor using the standard parameters.

The custom validation rules has to override the __execute()__ method of the base object.
The logic of the validation is implemented in that method. The method has one argument that
is an array of the values of the input properties. It contains at least the value of the
primary property. If validation succeeds the method simply returns, otherwise it returns a
[ValidationResult] object using __result()__ method to indicate the failure of the checking.

See API reference for the detailed description of [ValidationRule]'s methods.

### Example

The following example shows a custom validation rule that ensures the value of the primary
property is not null (and not empty in case of [Text] data type) only when another property
has a specified value:

```
'use strict';

var util = require('util');
var bo = require('business-objects');
var t = bo.i18n('', 'CustomRules');
var ValidationRule = bo.rules.ValidationRule;
var RuleSeverity = bo.rules.RuleSeverity;

// Constructor of RequiredIfRule class.
function RequiredIfRule (primaryProperty, conditionProperty, conditionValue, message, priority, stopsProcessing) {
  // Define the name of the rule.
  ValidationRule.call(this, 'RequiredIf');

  // Save the condition value.
  this.conditionValue = conditionValue;

  // Add the condition property to the input properties to retrieve its value.
  this.addInputProperty(conditionProperty);

  // Initialize base properties.
  this.initialize(
      primaryProperty,
      message || t('requiredIf', primaryProperty.name, conditionProperty.name, conditionValue),
      priority || 45,
      stopsProcessing
  );

  // Immutable object.
  Object.freeze(this);
}
util.inherits(RequiredIfRule, ValidationRule);

// Override execute() method.
RequiredIfRule.prototype.execute = function (inputs) {

  // Get property values.
  var value = inputs[this.primaryProperty.name];
  var condition = inputs[this.conditionProperty.name];

  // Check the condition.
  if (condition === this.conditionValue) {
    // Check the property value.
    if (!this.primaryProperty.hasValue(value))
      // Return a result object that indicates the failure of the rule.
      return this.result(this.message, RuleSeverity.error);
  }
};

module.exports = RequiredIfRule;
```

The default.json file in the directory of locales contains the default error message
when the validation fails:

```
{
  ...
  "CustomRules": {
    ...
    "requiredIf": "Property {0} is required when the value of property {1} is {2}.",
    ...
  },
  ...
}
```
