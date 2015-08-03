+++
order: 30
title: Configuration
+++

# Configuration

The configuration of business objects has to be loaded at startup of the application:

```
var bo = require('business-objects');

// Initialize business objects.
bo.initialize('/config/business-objects.js');
```

The `initialize()` method expects a string argument which is the relative path of the
configuration file. It can be a JSON file or a JavaScript file that returns an object
with the following properties:

* __connectionManager__  
  A required string that returns the relative path of the connection manager.  
  _For more information see [ConnectionManager](additions#ConnectionManager) class._
  
* __daoBuilder__  
  An optional string that returns the relative path of the data access object builder.  
  _For more information see [daoBuilder](additions#daoBuilder) function._
  
* __userReader__  
  An optional string that returns the relative path of a method that returns the
  current user. The default method returns null, i.e. anonymous user is assumed.  
  _For more information see [getUser](additions#getUser) function._
  
* __localeReader__  
  An optional string that returns the relative path of a method that returns the
  current locale. The default method returns an empty string, i.e. the business objects
  will use the default messages.  
  _For more information see [getLocale](additions#getLocale) function._
  
* __pathOfLocales__  
  An optional string that returns the relative path of the directory containing project
  locales. If not supplied, the business objects cannot interpret the first message
  argument as the message key, i.e. the first message argument must be the message text.  
  _For more information see [Project localization](i18n/project) page._
  
* __noAccessBehavior__  
  An optional string that returns the default behavior for unauthorized operations.  
  Valid options are:  
  * __throwError__: Failed authorization rule throws an authorization error.
  * __showError__: The result of a failed rule is a broken rule with error severity.
  * __showWarning__: The result of a failed rule is a broken rule with warning severity.
  * __showInformation__: The result of a failed rule is a broken rule with information severity.
  
  _For more information see [Authorization rules](/model-definitions/authorization)
  and [Error handling](errors) pages._

An example configuration:

```
module.exports = {
  connectionManager: '/models/connection-manager.js',
  daoBuilder: '/models/dao-builder.js',
  userReader: '/lib/get-user.js',
  localeReader: '/lib/get-locale.js',
  pathOfLocales: '/locales',
  noAccessBehavior: 'throwError'
};
```
