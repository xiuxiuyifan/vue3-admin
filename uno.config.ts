import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerDirectives,
  presetIcons
} from "unocss"

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  transformers: [transformerDirectives()]
})

// 可以使用 apply
