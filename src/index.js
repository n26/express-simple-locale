import get from 'lodash.get'

export const getLocaleFromRequest = options => request => {
  const cookieName = get(options, 'cookieName', 'locale')

  const locale = (
    decodeURIComponent(get(request, 'query.locale', '')) ||
    get(request, ['cookies', cookieName]) ||
    get(request, 'headers.accept-language', '').split(';')[0] ||
    get(request, 'acceptedLanguages') ||
    get(request, 'hostname.locale')
  )

  return Array.isArray(locale) ? locale[0] : locale
}

export const getLanguage = (locale = '') => {
  return locale.split(/[-_\s]/g)[0].trim()
}

export const isLocaleSupported = options => locale => {
  const supportedLanguages = get(options, 'supportedLanguages', [])

  return supportedLanguages.indexOf(locale) > -1
}

export const getSupportedLocale = options => locale => {
  const isSupported = isLocaleSupported(options)
  const defaultLanguage = get(options, 'defaultLanguage', 'en')

  return isSupported(locale) ? locale : defaultLanguage
}

export const getLocale = options => request => {
  const getFromRequest = getLocaleFromRequest(options)
  const getSupported = getSupportedLocale(options)

  return getSupported(getLanguage(getFromRequest(request)))
}

export default options => (request, response, next) => {
  const key = get(options, 'key', 'locale')

  request[key] = getLocale(options)(request)
  next()
}
