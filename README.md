# static-engine-params

[![Dependency Status](https://david-dm.org/erickmerchant/static-engine-params.svg?style=flat-square)](https://david-dm.org/erickmerchant/static-engine-params) [![devDependency Status](https://david-dm.org/erickmerchant/static-engine-params/dev-status.svg?style=flat-square)](https://david-dm.org/erickmerchant/static-engine-params#info=devDependencies) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

This is a plugin for [static-engine](https://github.com/erickmerchant/static-engine). Traverses every object in the collection and matches up all __file__ properties to a route. Parameters from that matching are added to the object. Call it with a string that's the route to match and a object that is converters for the parameters.

```javascript
var engine = require('static-engine')
var file = require('static-engine-params')
var pluginA = require('plugin-a')
var moment = require('moment')

engine([
  pluginA,
  file('./content/:categories+/:date.:slug.md', {
    date: function (date) {
      return moment(date, 'x')
    }
  })
])
```
