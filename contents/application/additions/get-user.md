# getUser function

> * [Usual additions](/application/additions)
> * [ConnectionManager class](connection-manager)
> * [daoBuilder function](dao-builder)
> * _getUser function_
> * [getLocale function](get-locale)

The function should return the current user or null. The user object must inherit [UserInfo].
The following code shows an user implementation (user.js): 

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

An example function (get-user.js):

```
'use strict';

var User = require('./user.js');

var userReader = function () {
  return new User(
      'ada-lovelace',
      'Ada Lovelace',
      'ada.lovelace@computer.net',
      ['administrators', 'developers', 'designers']
    );
};

module.exports = userReader;
```
