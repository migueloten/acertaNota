// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  alias:{
    css: "/<rootDir>/assets/css",
  },
  css: ["@/assets/css/main.css"],
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
  ],
});
