var get = require('lodash.get')
var getLocale = require('./helpers/getLocale')

function middleware (options) {
  var key = get(options, 'key', 'locale')

  return function (request, response, next) {
    request[key] = getLocale(options)(request)
    next()
  }
}

module.exports = middleware
