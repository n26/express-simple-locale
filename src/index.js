import get from 'lodash.get'

const FALLBACK_LOCALE = 'en'

const getAcceptedLanguage = (request = {}) => {
  if (typeof request.get !== 'function') {
    return
  }

  const header = request.get('accept-language') || ''
  const acceptedLanguages = header.split(';')

  return acceptedLanguages[0]
}

export const getLocaleFromRequest = options => request => {
  const cookieName = get(options, 'cookieName', 'locale')

  const locale = (
    decodeURIComponent(get(request, 'query.locale', '')) ||
    get(request, ['cookies', cookieName]) ||
    getAcceptedLanguage(request) ||
    get(request, 'acceptedLanguages') ||
    get(request, 'hostname.locale')
  )

  return Array.isArray(locale) ? locale[0] : locale
}

export const shortenLocale = (locale = '') => {
  return locale.split(/[-_\s]/g)[0].trim()
}

export const isLocaleSupported = options => locale => {
  const supportedLocales = get(options, 'supportedLocales', [])

  return supportedLocales.indexOf(locale) > -1
}

export const getSupportedLocale = options => locale => {
  const shortLocale = shortenLocale(locale)
  const isSupported = isLocaleSupported(options)(shortLocale)
  const defaultLocale = get(options, 'defaultLocale', FALLBACK_LOCALE)
  const shortDefaultLocale = shortenLocale(defaultLocale)

  return isSupported ? shortLocale : defaultLocale
}

export const getLocale = options => request => {
  const locale = getLocaleFromRequest(options)(request)

  return getSupportedLocale(options)(locale)
}

export default options => (request, response, next) => {
  const key = get(options, 'key', 'locale')

  request[key] = getLocale(options)(request)
  next()
}
