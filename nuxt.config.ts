export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro', '@nuxthub/core'],
  modules: ['@nuxt/ui', '@vueuse/nuxt'],

  ui: {
    icons: ['ph'],
  },

  runtimeConfig: {
    basicAuth: {
      username: '',
      password: '',
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
