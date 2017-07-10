var get = require('lodash.get')

function getAcceptedLanguage (request) {
  if (!request || typeof request.get !== 'function') {
    return
  }

  var header = request.get('accept-language') || ''
  var acceptedLanguages = header.split(';')

  return acceptedLanguages[0]
}

function getLocaleFromRequest (options) {
  var cookieName = get(options, 'cookieName', 'locale')

  return function (request) {
    var locale = (
      decodeURIComponent(get(request, 'query.locale', '')) ||
      get(request, ['cookies', cookieName]) ||
      getAcceptedLanguage(request) ||
      get(request, 'acceptedLanguages') ||
      get(request, 'hostname.locale')
    )

    return Array.isArray(locale) ? locale[0] : locale
  }
}

module.exports = getLocaleFromRequest
