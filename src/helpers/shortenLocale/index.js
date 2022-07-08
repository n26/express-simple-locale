function shortenLocale (locale) {
  locale = locale || ''
  return locale.split(/[-_\s,]/g)[0].trim()
}

module.exports = shortenLocale
