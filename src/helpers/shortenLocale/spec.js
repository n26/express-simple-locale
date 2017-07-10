var shortenLocale = require('./')

describe('The `shortenLocale` helper', function () {
  it('should explode locale on hyphens', function () {
    var actual = shortenLocale('en-GB')
    var expected = 'en'

    expect(actual).toEqual(expected)
  })

  it('should explode locale on underscores', function () {
    var actual = shortenLocale('en_GB')
    var expected = 'en'

    expect(actual).toEqual(expected)
  })

  it('should explode locale on spaces', function () {
    var actual = shortenLocale('en GB')
    var expected = 'en'

    expect(actual).toEqual(expected)
  })

  it('should trim result', function () {
    var actual = shortenLocale('en -')
    var expected = 'en'

    expect(actual).toEqual(expected)
  })
})
