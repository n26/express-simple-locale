var getLocale = require('./')

describe('The `getLocale` helper', function () {
  it('should return locale', function () {
    var actual = getLocale()()
    var expected = 'en'

    expect(actual).toEqual(expected)
  })
})
