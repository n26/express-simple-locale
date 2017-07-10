var get = require('lodash.get')
var shortenLocale = require('../shortenLocale')
var isLocaleSupported = require('../isLocaleSupported')
var FALLBACK_LOCALE = 'en'

function getSupportedLocale (options) {
  var _isLocaleSupported = isLocaleSupported(options)

  return function (locale) {
    var shortLocale = shortenLocale(locale)
    var isSupported = _isLocaleSupported(shortLocale)
    var defaultLocale = get(options, 'defaultLocale', FALLBACK_LOCALE)
    var shortDefaultLocale = shortenLocale(defaultLocale)

    return isSupported ? shortLocale : shortDefaultLocale
  }
}

module.exports = getSupportedLocale
