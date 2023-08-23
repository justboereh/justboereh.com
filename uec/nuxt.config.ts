import { fileURLToPath } from 'url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        '@unocss/reset/tailwind.css',
        fileURLToPath(new URL('./assets/styles/main.css', import.meta.url)),
    ],
    modules: ['@unocss/nuxt', 'nuxt-icon', '@ant-design-vue/nuxt'],
})
