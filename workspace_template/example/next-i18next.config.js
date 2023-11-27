// https://www.npmjs.com/package/next-i18next

module.exports = {
  i18n: {
    locales: ['ko', 'en'], // default -> 미들웨어에서 언어 대응
    defaultLocale: 'ko',
    localePath:
      typeof window === 'undefined'
        ? require('path').resolve('../../packages/public/locales')
        : '../../packages/public/locales',
    localeDetection: false,
  },
}
