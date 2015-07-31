# Typical project structures

> * [Usage of business objects](/advanced/usage)
> * _Typical project structures_
> * [Usual additions](additions)
> * [Business objects in action](in-action)
> * [Error handling](errors)

The first figure displays a typical project structure for a simple project
with one data source:

![Simple project with one data source](/images/bo-sample-1.png)

* __config__ directory contains the configuration files, including the configuration
  of the business objects.

* __models__ directory contains the business object definitions. It is practical to
  collect the models of the application modules into subdirectories. In the sample
  these are the `customers`, `orders` and `products` subdirectories.

* __data-access__ directory contains the data access objects of the models. It mirrors
  the `models` directory.

* __lib__ directory contains the helper files.

The next figure shows a multi-language project with more data sources:

![Multi-language project with multiple data sources](/images/bo-sample-2.png)

* __config__ directory contains the configuration files, including the configuration
  of the business objects.

* __models__ directory contains the business object definitions. The models are grouped
  into subdirectories by the application modules. In the sample these are the `customers`,
  `orders` and `products` subdirectories. The root of the directory contains the data
  helper files as well.

* __models/../{data-source}__ directories contain the data access objects of the models.
  Each data source has its own subdirectory. In the sample these are the `mysql` and
  `oracle` subdirectories.

* __lib__ directory contains the helper files.

* __locales__ directory contains the locale files. It is practical to group the locales
  by the application modules. In the sample these are the `customers`, `orders` and
  `products` subdirectories. The names of the subdirectories function as namespaces for
  the locale keys. 
  _For more information see [Project localization](/advanced/i18n/project) page._

