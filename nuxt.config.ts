import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  modules: ['@nuxt/icon', 'nuxt-auth-utils'],
  runtimeConfig: {
    session: {
      password: '',
      name: 'nuxt-auth',
      cookie: {
        maxAge: 60 * 24 * 7,
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
