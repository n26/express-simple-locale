var locale = require('./')
var getMockedRequest = require('./mocks/getMockedRequest')
var noop = function () { return void 0 }

describe('The middleware', function () {
  it('should apply locale to the request', function () {
    var request = getMockedRequest()
    var middleware = locale()

    middleware(request, {}, noop)

    var actual = request.locale
    var expected = 'en'

    expect(actual).toEqual(expected)
  })
})
