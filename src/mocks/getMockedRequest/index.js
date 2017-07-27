var DEFAULTS = {
  hostname: {},
  query: {},
  get: () => void 0,
  acceptedLanguages: '',
  cookies: {}
}

function getMockedRequest (options) {
  return Object.assign({}, DEFAULTS, options)
}

module.exports = getMockedRequest
