export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    '/r': {
      redirect: {
        to: '/',
        statusCode: 302
      }
    }
  },
  nitro: {
    storage: { db: { driver: 'cloudflare-kv-binding' } },
    devStorage:{ db: { driver: 'fs', base: '.nuxt/data/db' } }
  }
})
