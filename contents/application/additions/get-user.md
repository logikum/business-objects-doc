# getUser function

> * [Usual additions](/application/additions)
> * [ConnectionManager class](connection-manager)
> * [daoBuilder function](dao-builder)
> * [User class](user)
> * _getUser function_
> * [getLocale function](get-locale)

The function should return the current user or null.

The example application uses the _accessToken_ middleware to handle authentication:

```
'use strict';

var express = require('express');
var accessToken = require('./access-token.js');

var app = express();
...
app.all('*', accessToken.verify);
...
```

The middleware stores the user information in the account property of the request:

```
// Extract the token from the header Authorization.
function extractTokenFromHeader (headers) {
  ...
}

// Gets the associated data of the token from the session store.
function getDataByToken (token, callback) {
  ...
}

// Middleware to verify the token and store the user data in the request object.
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

  // Verify it in session store and set data in req.account property.
  getDataByToken(token, function(err, data) {
    if (err) return next();

    req.account = data;
    next();
  });
};

```

So the 'getUser()' function will be:

```
'use strict';

var getUser = function (req) {
  return req.account;
};

module.exports = getUser;
```
