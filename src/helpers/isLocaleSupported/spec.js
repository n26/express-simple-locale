var isLocaleSupported = require('./')

describe('The `isLocaleSupported` helper', function () {
  it('should return `true` if locale is supported', function () {
    var options = { supportedLocales: ['en'] }
    var actual = isLocaleSupported(options)('en')
    var expected = true

    expect(actual).toEqual(expected)
  })

  it('should return `false` if locale is not supported', function () {
    var options = { supportedLocales: ['en'] }
    var actual = isLocaleSupported(options)('foobar')
    var expected = false

    expect(actual).toEqual(expected)
  })
})
