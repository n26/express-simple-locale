var getLocale = require('./')
var getMockedRequest = require('../../mocks/getMockedRequest')

describe('The `getLocale` helper', function () {
  it('should return locale', function () {
    var actual = getLocale()(getMockedRequest())
    var expected = 'en'

    expect(actual).toEqual(expected)
  })
})
