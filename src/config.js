require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  facebookAppId: 1511127292441041,
  facebookRedirectUrl: 'discover.apester.com/',
  app: {
    title: 'Apester Discover',
    description: 'Make your content ROAR',
    head: {
      titleTemplate: 'Apester Discover: %s',
      meta: [
        {name: 'description', content: 'Make your content ROAR.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Apester Discover'},
        {property: 'og:image', content: 'https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAKrAAAAJGEyZTRhYjBlLTAxMDctNGY2OS1iYmVlLTI3MzAzYjgzZmJlYw.png'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Apester Discover'},
        {property: 'og:description', content: 'Apester is empowering content creators to publish conversational content, and to close the storytelling loop with the voice of the reader.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@Apester'},
        {property: 'og:creator', content: '@Apester'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
