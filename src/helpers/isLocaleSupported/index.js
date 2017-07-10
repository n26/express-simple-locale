var get = require('lodash.get')

function isLocaleSupported (options) {
  var supportedLocales = get(options, 'supportedLocales', [])

  return function (locale) {
    return supportedLocales.indexOf(locale) > -1
  }
}

module.exports = isLocaleSupported
