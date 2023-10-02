import process from 'node:process'

export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@vueuse/nuxt'],
  routeRules: {
    '/': {
      ssr: false,
    },
    '/r': {
      redirect: {
        to: '/',
        statusCode: 302,
      },
    },
  },
  nitro: {
    storage: { db: { driver: 'cloudflare-kv-binding', binding: 'shorts' } },
    devStorage: { db: { driver: 'fs', base: '.nuxt/data/db' } },
    runtimeConfig: {
      basicAuth: {
        username: process.env.BASIC_AUTH_USERNAME,
        password: process.env.BASIC_AUTH_PASSWORD,
      },
    },
  },
  devtools: { enabled: true },
})
