var getSupportedLocale = require('./')

describe('The `getSupportedLocale` helper', function () {
  it('should return locale if passed short locale is supported', function () {
    var options = { supportedLocales: ['fr'], defaultLocale: 'en' }
    var actual = getSupportedLocale(options)('fr')
    var expected = 'fr'

    expect(actual).toEqual(expected)
  })

  it('should return locale if passed long locale is supported', function () {
    var options = { supportedLocales: ['fr'], defaultLocale: 'en' }
    var actual = getSupportedLocale(options)('fr_FR')
    var expected = 'fr'

    expect(actual).toEqual(expected)
  })

  it('should return default locale if passed locale is not supported', function () {
    var options = { supportedLocales: ['fr'], defaultLocale: 'it' }
    var actual = getSupportedLocale(options)('foo_BAR')
    var expected = 'it'

    expect(actual).toEqual(expected)
  })

  it('should return fallback locale if passed locale is not supported and default locale is not defined', function () {
    var options = { supportedLocales: ['fr'] }
    var actual = getSupportedLocale(options)('foo_BAR')
    var expected = 'en'

    expect(actual).toEqual(expected)
  })
})
