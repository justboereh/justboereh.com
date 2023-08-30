import { fileURLToPath } from 'url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    alias: {
        '#utils': fileURLToPath(new URL('./server/utils', import.meta.url)),
    },
    css: [
        '@unocss/reset/tailwind.css',
        fileURLToPath(new URL('./assets/styles/main.css', import.meta.url)),
    ],
    modules: ['@unocss/nuxt', 'nuxt-icon'],
})
