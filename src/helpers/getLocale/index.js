var getLocaleFromRequest = require('../getLocaleFromRequest')
var getSupportedLocale = require('../getSupportedLocale')

function getLocale (options) {
  return function (request) {
    var locale = getLocaleFromRequest(options)(request)

    return getSupportedLocale(options)(locale)
  }
}

module.exports = getLocale
