export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro', '@nuxthub/core'],
  modules: ['@nuxt/ui', '@vueuse/nuxt'],

  ui: {
    icons: ['ph'],
  },

  runtimeConfig: {
    basicAuth: {
      username: process.env.NUXT_BASIC_AUTH_USERNAME,
      password: process.env.NUXT_BASIC_AUTH_PASSWORD
    },
  },

  routeRules: {
    '/': {
      ssr: false, // To have basic auth.
    },
    '/r': {
      redirect: {
        to: '/',
        statusCode: 302,
      },
    },
  },

  devtools: { enabled: true },
})
