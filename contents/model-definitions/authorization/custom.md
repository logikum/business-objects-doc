# Custom authorization rules

> * [Authorization](/model-definitions/authorization)
> * [Predefined authorization rules](predefined)
> * _Custom authorization rules_

Beyond the predefined authorization rules, new ones can be created to satisfy the
special requirements of an application. A custom authorization rule must inherit the
[AuthorizationRule] class. Each rule requires a descriptive and preferably unique name.
The name identifies the rule in the collection of broken rules. The business-objects
library follows the practice that the class name of the authorization rule is the name
of the rule and the appended Rule string.

The parameters of the rule definition are passed in the constructor of the new rule:

* __action__  
  _Required [AuthorizationAction] object._  
  The action to be authorized.
* __target__  
  _Required or optional depending on the action._  
  Eventual parameter of the authorization action. See below.
* __arg1, arg2, ...__  
  _Optional._  
  Additional parameters required by the rule to authorize the current user.
* __message__  
  _Optional string. The rule has to provide a default message._  
  Human-readable description of the failure of the rule, or the key of the localizable
  description.
* __priority__  
  _Optional integer. The default value is 100._  
  The priority of the rule, greater number means higher priority. 
  The authorization rules are evaluated in descending order of the priority.
* __stopsProcessing__  
  _Optional Boolean. The default value is false._  
  Indicates whether processing of the rules for a property stops when the rule fails.

The following table shows the possible values of the 'target' argument by actions:

%indent1%| Action | Target | Description |&nbsp;
-| ---------------| -------| ----------- |-
 | fetchObject    | null   | - |
 | createObject   | null   | - |
 | updateObject   | null   | - |
 | removeObject   | null   | - |
 | executeCommand | null   | - |
 | executeMethod  | string | The name of the custom fetch or execute method. |
 | readProperty   | [PropertyInfo] | The definition of the property the action relates to. |
 | writeProperty  | [PropertyInfo] | The definition of the property the action relates to. |

If rule logic requires one or more additional parameters then their values shoul be stored
in properties of the authorization rule object.

Each authorization rule has to be initialized in the constructor using the standard parameters.

The custom authorization rules has to override the __execute()__ method of the base object.
The logic of the authorization is implemented in that method. The method has one argument:
the 'userInfo' object represents the current user. It inherits the [UserInfo] class.
If authorization succeeds the method simply returns, otherwise it returns an [AuthorizationResult]
object using __result()__ method to indicate the failure of the authorization.

See API reference for the detailed description of [AuthorizationRule]'s methods.

### Example

The following example shows a custom authorization rule that ensures the age of the user
is greater or equal than a specified value. The implemented user object should have an age
property:

```
'use strict';

var util = require('util');
var bo = require('business-objects');
var UserInfo = bo.system.UserInfo;

function User (userCode, userName, email, age, roles) {
  User.super_.call(this, userCode);

  this.userName = userName;
  this.email = email;
  this.age = age;
  this.roles = roles;

  Object.freeze(this);
}
util.inherits(User, UserInfo);

User.prototype.isInRole = function (role) {
  return this.roles.some(function (userRole) {
    return userRole === role;
  });
};

module.exports = User;
```

For more information of how to implement a User class, see the
[User class](/application/additions/user) page. Using this user object
the creation of the IsAdultRule class is very simple: 

```
'use strict';

var util = require('util');
var bo = require('business-objects');
var t = bo.i18n('', 'CustomRules');
var AuthorizationRule = bo.rules.AuthorizationRule;
var RuleSeverity = bo.rules.RuleSeverity;
var EnsureArgument = bo.system.EnsureArgument;

// Constructor of IsAdultRule class.
function IsAdultRule (action, target, ageLimit, message, priority, stopsProcessing) {
  // Define the name of the rule.
  AuthorizationRule.call(this, 'IsAdult');

  // Check and save the age limit.
  this.ageLimit = EnsureArgument.isMandatoryInteger(ageLimit, 'c_manInteger', 'IsAdultRule', 'ageLimit');

  // Initialize base properties.
  this.initialize(
      action,
      target,
      message || t('isAdult', ageLimit),
      priority,
      stopsProcessing
  );

  // Immutable object.
  Object.freeze(this);
}
util.inherits(IsAdultRule, AuthorizationRule);

// Override execute() method.
IsAdultRule.prototype.execute = function (userInfo) {

  // Check argument.
  userInfo = EnsureArgument.isOptionalType(userInfo, UserInfo,
    'm_optType', 'IsAdultRule', 'execute', 'userInfo', 'UserInfo');

  // Determine entitlement.
  var hasPermission = userInfo.age < this.ageLimit;

  if (!hasPermission)
    // Return a result object that indicates the failure of the rule.
    return this.result(this.message, RuleSeverity.error);
};

module.exports = IsAdultRule;
```

The default.json file in the directory of locales contains the default error message
when the authorization fails:

```
{
  ...
  "CustomRules": {
    ...
    "isAdult": "The {1} argument of {0} constructor must be an integer value.",
    ...
  },
  ...
}
```
