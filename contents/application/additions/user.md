# User class

> * [Usual additions](/application/additions)
> * [ConnectionManager class](connection-manager)
> * [daoBuilder function](dao-builder)
> * _User class_
> * [getUser function](get-user)
> * [getLocale function](get-locale)

The authorization of business objects requires an user object and a [function](get-user)
that provides it. The user object must inherit [UserInfo] class and implement its
`isInRole()` method. The method decides whether the user is member of the specified
role.

The following code shows an implementation of the User class: 

```
'use strict';

var util = require('util');
var UserInfo = require('../source/system/user-info.js');

function User (userCode, userName, email, roles) {
  User.super_.call(this, userCode);

  this.userName = userName;
  this.email = email;
  this.roles = roles;

  Object.freeze(this);
}
util.inherits(User, UserInfo);

User.prototype.isInRole = function (role) {
  return this.roles.some(function (userRole) {
    return userRole === role;
  });
};

User.prototype.isInSomeRole = function (roles) {
  return this.roles.some(function (userRole) {
    return roles.some(function (role) {
      return userRole === role;
    });
  });
};

User.prototype.isInEveryRole = function (roles) {
  return roles.every(function (role) {
    return User.roles.some(function (userRole) {
      return userRole === role;
    });
  });
};

module.exports = User;
```

For demonstration purposes the class implements two additional methods. The
`isInSomeRole()` method returns _true_ when the user is member of __any__ of the
specified `roles`, otherwise returns _false_. The `isInEveryRole()` method returns
_true_ when the user is member of __all__ of the specified `roles`, otherwise
returns _false_.