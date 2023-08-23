import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
    transformers: [transformerDirectives()],

    theme: {
        colors: {
            'brand-red': '#ee0000',
        },
    },
})
