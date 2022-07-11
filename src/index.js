var get = require('lodash.get')
var getLocale = require('./helpers/getLocale')

function middleware (options) {
  console.warn(
    'express-simple-locale has been deprecated and will not be receiving any updates anymore.'
    + '\nPlease, consider using an alternative package.'
  )
  
  var key = get(options, 'key', 'locale')

  return function (request, response, next) {
    request[key] = getLocale(options)(request)
    next()
  }
}

module.exports = middleware
