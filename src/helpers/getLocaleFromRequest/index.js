var get = require('lodash.get')

function getAcceptedLanguage (request) {
  if (!request || typeof request.get !== 'function') {
    return
  }

  var header = request.get('accept-language') || ''
  var acceptedLanguages = header.split(';')

  return acceptedLanguages[0]
}

function getQueryFromRequest (request) {
  return function (param, key) {
    if (param) {
      return param
    }

    try {
      return request.query[key] ? decodeURIComponent(request.query[key]) : null
    } catch (error) {
      return null
    }
  }
}

function getLocaleFromRequest (options) {
  var cookieName = get(options, 'cookieName', 'locale')
  var params = get(options, 'queryParams', ['locale'])
  var queryParams = typeof params === 'string' ? [params] : params

  return function (request) {
    var locale = (
      queryParams.reduce(getQueryFromRequest(request), null) ||
      get(request, ['cookies', cookieName]) ||
      getAcceptedLanguage(request) ||
      get(request, 'acceptedLanguages') ||
      get(request, 'hostname.locale')
    )

    return Array.isArray(locale) ? locale[0] : locale
  }
}

module.exports = getLocaleFromRequest
