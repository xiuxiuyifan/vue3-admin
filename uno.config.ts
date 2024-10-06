import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerDirectives
} from "unocss"

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  transformers: [transformerDirectives()]
})

// 可以使用 apply
