import { fileURLToPath } from 'url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        '@unocss/reset/tailwind.css',
        // 'primevue/resources/themes/viva-dark/theme.css',
        // 'primevue/resources/primevue.css',
        fileURLToPath(new URL('./assets/styles/main.css', import.meta.url)),
    ],
    build: {
        transpile: ['primevue'],
    },
    modules: ['@unocss/nuxt', 'nuxt-icon'],
})
