// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        'primevue/resources/themes/viva-dark/theme.css',
        'primevue/resources/primevue.css',
    ],
    build: {
        transpile: ['primevue'],
    },
    modules: ['@unocss/nuxt'],
})
