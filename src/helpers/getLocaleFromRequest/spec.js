var getLocaleFromRequest = require('./')
var getMockedRequest = require('../../mocks/getMockedRequest')

describe('The `getLocaleFromRequest` helper', function () {
  it('should return hostname.locale from request if any', function () {
    var request = getMockedRequest({ hostname: { locale: 'foo' } })
    var actual = getLocaleFromRequest()(request)
    var expected = 'foo'

    expect(actual).toEqual(expected)
  })

  it('should return acceptedLanguages from request if any', function () {
    var request = getMockedRequest({ acceptedLanguages: 'foo' })
    var actual = getLocaleFromRequest()(request)
    var expected = 'foo'

    expect(actual).toEqual(expected)
  })

  it('should return `accept-language` header from request if any', function () {
    var request = getMockedRequest({
      get: function (headerKey) {
        return { 'accept-language': 'foo' }[headerKey]
      }
    })
    var actual = getLocaleFromRequest()(request)
    var expected = 'foo'

    expect(actual).toEqual(expected)
  })

  it('should return cookies.cookieLocale from request if any', function () {
    var options = { cookieName: 'cookieLocale' }
    var request = getMockedRequest({ cookies: { cookieLocale: 'foo' } })
    var actual = getLocaleFromRequest(options)(request)
    var expected = 'foo'

    expect(actual).toEqual(expected)
  })

  it('should return query.locale from request if any', function () {
    var request = getMockedRequest({ query: { locale: 'foo' } })
    var actual = getLocaleFromRequest()(request)
    var expected = 'foo'

    expect(actual).toEqual(expected)
  })

  it('should not throw if failing to decode query from request', function () {
    var request = getMockedRequest({ query: { locale: '/at//%c0%ae%c0%ae%c0%ae%c0%c0%a%c0%c0%c0%c0%af%c0%af%c0%af%c0%c0%ae%c0%c0%ae%c0%ae%c0%afwindowswin.ini' } })
    var actual = () => getLocaleFromRequest()(request)

    expect(actual).not.toThrow()
  })

  it('should return locale from query option if any', function () {
    var request = getMockedRequest({ query: { foo: 'foo' } })
    const options = {
      queryParams: 'foo'
    }
    var actual = getLocaleFromRequest(options)(request)
    var expected = 'foo'

    expect(actual).toEqual(expected)
  })

  it('should return locale from multiple query options if present', function () {
    var request = getMockedRequest({ query: { foo: 'foo' } })
    const options = {
      queryParams: ['foo', 'bar']
    }
    var actual = getLocaleFromRequest(options)(request)
    var expected = 'foo'

    expect(actual).toEqual(expected)
  })

  it('should return first of many query options as priority', function () {
    var request = getMockedRequest({ query: { foo: 'foo', bar: 'bar' } })
    const options = {
      queryParams: ['foo', 'bar']
    }
    var actual = getLocaleFromRequest(options)(request)
    var expected = 'foo'

    expect(actual).toEqual(expected)
  })

  it('should respect priority order', function () {
    function mockedGet (headerKey) {
      return { 'accept-language': '3' }[headerKey]
    }

    var options = { cookieName: 'cookieLocale' }

    var actual = getLocaleFromRequest(options)(getMockedRequest({
      query: { locale: '1' },
      cookies: { cookieLocale: '2' },
      get: mockedGet,
      acceptedLanguages: '4',
      hostname: { locale: '5' }
    }))
    var expected = '1'
    expect(actual).toEqual(expected)

    actual = getLocaleFromRequest(options)(getMockedRequest({
      cookies: { cookieLocale: '2' },
      get: mockedGet,
      acceptedLanguages: '4',
      hostname: { locale: '5' }
    }))
    expected = '2'
    expect(actual).toEqual(expected)

    actual = getLocaleFromRequest(options)(getMockedRequest({
      get: mockedGet,
      acceptedLanguages: '4',
      hostname: { locale: '5' }
    }))
    expected = '3'
    expect(actual).toEqual(expected)

    actual = getLocaleFromRequest(options)(getMockedRequest({
      acceptedLanguages: '4',
      hostname: { locale: '5' }
    }))
    expected = '4'
    expect(actual).toEqual(expected)

    actual = getLocaleFromRequest(options)(getMockedRequest({
      hostname: { locale: '5' }
    }))
    expected = '5'
    expect(actual).toEqual(expected)
  })

  it('should return a first value if found locale is an array', function () {
    var request = getMockedRequest({ hostname: { locale: ['foo', 'bar'] } })
    var actual = getLocaleFromRequest()(request)
    var expected = 'foo'

    expect(actual).toEqual(expected)
  })
})
