# getLocale function

> * [Usual additions](/application/additions)
> * [ConnectionManager class](connection-manager)
> * [daoBuilder function](dao-builder)
> * [getUser function](get-user)
> * _getLocale function_

The function should return the current locale or an empty string. An example:

```
var express = require('express');
var session = require('express-session');

var app = express();

app.use(session({
  secret: 'barking pumpkin',
  resave: false,
  saveUninitialized: true
}));

// Middleware to set language.
app.use(function (req, res, next) {
  if (!req.session) {
    req.session = { language: 'hu' };
  } else if (!req.session.language) {
    req.session.language = 'hu';
  }
  next();
});

// Route to change language.
app.use('/set-language', function (req, res, next) {
  req.session.language = req.url.length > 1 ? req.url.substr(1) : 'hu';
  res.redirect('/');
});
...

function getLocale() {
  return req.session.language;
}
```
