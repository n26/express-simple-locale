import locale, {
  getLocaleFromRequest,
  getLanguage,
  getLocale,
  isLocaleSupported,
  getSupportedLocale
} from './'

describe('The `getLocaleFromRequest` helper', () => {
  it('should return hostname.locale from request if any', () => {
    const actual = getLocaleFromRequest()({ hostname: { locale: 'foo' } })
    const expected = 'foo'

    expect(actual).toEqual(expected)
  })

  it('should return acceptedLanguages from request if any', () => {
    const actual = getLocaleFromRequest()({ acceptedLanguages: 'foo' })
    const expected = 'foo'

    expect(actual).toEqual(expected)
  })

  it('should return headers.accept-language from request if any', () => {
    const actual = getLocaleFromRequest()({ headers: { 'accept-language': 'foo' } })
    const expected = 'foo'

    expect(actual).toEqual(expected)
  })

  it('should return cookies.cookieLocale from request if any', () => {
    const options = { cookieName: 'cookieLocale' }
    const actual = getLocaleFromRequest(options)({ cookies: { cookieLocale: 'foo' } })
    const expected = 'foo'

    expect(actual).toEqual(expected)
  })

  it('should return query.locale from request if any', () => {
    const actual = getLocaleFromRequest()({ query: { locale: 'foo' } })
    const expected = 'foo'

    expect(actual).toEqual(expected)
  })

  it('should respect priority order', () => {
    const options = { cookieName: 'cookieLocale' }

    let actual = getLocaleFromRequest(options)({
      query: { locale: '1' },
      cookies: { cookieLocale: '2' },
      headers: { 'accept-language': '3' },
      acceptedLanguages: '4',
      hostname: { locale: '5' }
    })
    let expected = '1'
    expect(actual).toEqual(expected)

    actual = getLocaleFromRequest(options)({
      cookies: { cookieLocale: '2' },
      headers: { 'accept-language': '3' },
      acceptedLanguages: '4',
      hostname: { locale: '5' }
    })
    expected = '2'
    expect(actual).toEqual(expected)

    actual = getLocaleFromRequest(options)({
      headers: { 'accept-language': '3' },
      acceptedLanguages: '4',
      hostname: { locale: '5' }
    })
    expected = '3'
    expect(actual).toEqual(expected)

    actual = getLocaleFromRequest(options)({
      acceptedLanguages: '4',
      hostname: { locale: '5' }
    })
    expected = '4'
    expect(actual).toEqual(expected)

    actual = getLocaleFromRequest(options)({
      hostname: { locale: '5' }
    })
    expected = '5'
    expect(actual).toEqual(expected)
  })

  it('should return a first value if found locale is an array', () => {
    const actual = getLocaleFromRequest()({ hostname: { locale: ['foo', 'bar'] } })
    const expected = 'foo'

    expect(actual).toEqual(expected)
  })
})

describe('The `getLanguage` helper', () => {
  it('should explode locale on hyphens', () => {
    const actual = getLanguage('en-GB')
    const expected = 'en'

    expect(actual).toEqual(expected)
  })

  it('should explode locale on underscores', () => {
    const actual = getLanguage('en_GB')
    const expected = 'en'

    expect(actual).toEqual(expected)
  })

  it('should explode locale on spaces', () => {
    const actual = getLanguage('en GB')
    const expected = 'en'

    expect(actual).toEqual(expected)
  })

  it('should trim result', () => {
    const actual = getLanguage('en -')
    const expected = 'en'

    expect(actual).toEqual(expected)
  })
})

describe('The `isLocaleSupported` helper', () => {
  it('should return `true` if locale is supported', () => {
    const options = { supportedLanguages: ['en'] }
    const actual = isLocaleSupported(options)('en')
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('should return `false` if locale is not supported', () => {
    const options = { supportedLanguages: ['en'] }
    const actual = isLocaleSupported(options)('foobar')
    const expected = false

    expect(actual).toEqual(expected)
  })
})

describe('The `getSupportedLocale` helper', () => {
  it('should return locale if supported', () => {
    const options = { supportedLanguages: ['fr'], defaultLanguage: 'en' }
    const actual = getSupportedLocale(options)('fr')
    const expected = 'fr'

    expect(actual).toEqual(expected)
  })

  it('should return default locale if not supported', () => {
    const options = { supportedLanguages: ['fr'], defaultLanguage: 'en' }
    const actual = getSupportedLocale(options)('foobar')
    const expected = 'en'

    expect(actual).toEqual(expected)
  })
})

describe('The `getLocale` helper', () => {
  it('should return locale', () => {
    const actual = getLocale()()
    const expected = 'en'

    expect(actual).toEqual(expected)
  })
})

describe('The middleware', () => {
  it('should apply locale to the request', () => {
    const request = {}
    const middleware = locale()

    middleware(request, {}, () => void 0)

    const actual = request.locale
    const expected = 'en'

    expect(actual).toEqual(expected)
  })
})
