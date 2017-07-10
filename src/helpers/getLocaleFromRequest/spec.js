var getLocaleFromRequest = require('./')

describe('The `getLocaleFromRequest` helper', function () {
  it('should return hostname.locale from request if any', function () {
    var actual = getLocaleFromRequest()({ hostname: { locale: 'foo' } })
    var expected = 'foo'

    expect(actual).toEqual(expected)
  })

  it('should return acceptedLanguages from request if any', function () {
    var actual = getLocaleFromRequest()({ acceptedLanguages: 'foo' })
    var expected = 'foo'

    expect(actual).toEqual(expected)
  })

  it('should return `accept-language` header from request if any', function () {
    var mockedRequest = {
      get: function (headerKey) {
        return { 'accept-language': 'foo' }[headerKey]
      }
    }
    var actual = getLocaleFromRequest()(mockedRequest)
    var expected = 'foo'

    expect(actual).toEqual(expected)
  })

  it('should return cookies.cookieLocale from request if any', function () {
    var options = { cookieName: 'cookieLocale' }
    var actual = getLocaleFromRequest(options)({ cookies: { cookieLocale: 'foo' } })
    var expected = 'foo'

    expect(actual).toEqual(expected)
  })

  it('should return query.locale from request if any', function () {
    var actual = getLocaleFromRequest()({ query: { locale: 'foo' } })
    var expected = 'foo'

    expect(actual).toEqual(expected)
  })

  it('should respect priority order', function () {
    function mockedRequest (headerKey) {
      return { 'accept-language': '3' }[headerKey]
    }

    var options = { cookieName: 'cookieLocale' }

    let actual = getLocaleFromRequest(options)({
      query: { locale: '1' },
      cookies: { cookieLocale: '2' },
      get: mockedRequest,
      acceptedLanguages: '4',
      hostname: { locale: '5' }
    })
    let expected = '1'
    expect(actual).toEqual(expected)

    actual = getLocaleFromRequest(options)({
      cookies: { cookieLocale: '2' },
      get: mockedRequest,
      acceptedLanguages: '4',
      hostname: { locale: '5' }
    })
    expected = '2'
    expect(actual).toEqual(expected)

    actual = getLocaleFromRequest(options)({
      get: mockedRequest,
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

  it('should return a first value if found locale is an array', function () {
    var actual = getLocaleFromRequest()({ hostname: { locale: ['foo', 'bar'] } })
    var expected = 'foo'

    expect(actual).toEqual(expected)
  })
})
