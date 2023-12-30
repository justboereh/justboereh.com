import { defineConfig, type Preset } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  // transformers: [transformerDirectives(), transformerVariantGroup()],
  // presets: [
  //   presetIcons({
  //     collections: {
  //       fluent: () => import('@iconify-json/fluent/icons.json').then((i) => i.default as any),
  //     },
  //   }) as Preset<Object>,
  // ],
})
