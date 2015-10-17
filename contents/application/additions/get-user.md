# getUser function

> * [Usual additions](/application/additions)
> * [ConnectionManager class](connection-manager)
> * [daoBuilder function](dao-builder)
> * [User class](user)
> * _getUser function_
> * [getLocale function](get-locale)

The function should return the current user or null. The user object must inherit
[UserInfo] class and implement its `isInRole()` method. See [User class](user) page.

The example application uses a middleware named _accessToken_ to handle authentication:

```
'use strict';

var express = require('express');
var accessToken = require('./access-token.js');

var createNamespace = require('continuation-local-storage').createNamespace;
var namespace = createNamespace('com.example');

var app = express();
...
app.all('*', accessToken.verify);
...
```

The middleware stores the user information in the context of the request.
The context is maintained by the
[continuation-local-storage](https://github.com/othiym23/node-continuation-local-storage)
module:

```
var getNamespace = require('continuation-local-storage').getNamespace;
var namespace = getNamespace('com.example');

// Extract the token from the header Authorization.
function extractTokenFromHeader (headers) {
  ...
}

// Gets the associated data of the token from the session store.
function getDataByToken (token, callback) {
  ...
}

// Middleware to verify the token and store the user data in the request context.
exports.verify = function(req, res, next) {
  var headers = req.headers;
  if (headers == null) next();

  // Get token.
  try {
    var token = extractTokenFromHeader(headers);
  } catch (err) {
    console.log(err);
    return next();
  }

  // Verify it in session store and set data into user property of the context.
  getDataByToken(token, function(err, data) {
    if (err) {
      console.log(err);
      return next();
    }

    namespace.bindEmitter(req);
    namespace.bindEmitter(res);
    
    namespace.run(function() {
      namespace.set('user', data);
      next();
    });
  });
};

```

So the `getUser()` function will be:

```
'use strict';

var getNamespace = require('continuation-local-storage').getNamespace;
var namespace = getNamespace('com.example');

var getUser = function (req) {
  return namespace.get('user');
};

module.exports = getUser;
```
