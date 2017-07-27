# express-simple-locale

A simple Express middleware to guess the **short-locale** of a user. It then saves the found locale on the request for further usage.

It tries, in that order:

1. The `locale` query parameter.
2. The cookie specified by `cookieName` option.
3. The first entry of `accept-language` header.
4. The `acceptedLanguages` key from the request.
5. The `hostname.locale` nested key from the request.

When found, the locale is split on spaces, hyphens and underscores so only the first part gets returned (`en_GB` -> `en`).

## Install

```
npm i --save express-simple-locale
```

## Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| key | String | `locale` | the key to save locale to on the request |
| supportedLocales | String[] | `[]` | available locales for the app |
| defaultLocale | String | `en` | locale to fallback to |
| cookieName | String | `locale` | cookie to try getting the locale from |
| queryParams | String\|String[] | `['locale']` | the query parameter(s) to look the locale from |


## Example

```js
import locale from 'express-simple-locale'

const localeMiddlewareOptions = {
  key: 'userLocale',
  supportedLocales: ['en', 'fr', 'it', 'es', 'de'],
  defaultLocale: 'en',
  cookieName: 'c00ki3z',
  queryParams: ['locale', 'lang']
}

express()
  .use(locale(localeMiddlewareOptions))
  .use((request, response, next) => {
    // request.userLocale
  })
```
