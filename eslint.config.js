import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"

import { createRequire } from "module"
const require = createRequire(import.meta.url)
const autoImportConfig = require("./.eslintrc-auto-import.json")

export default [
  // 检测文件的格式
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  // 检测不同环境的全局变量
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...autoImportConfig.globals
      }
    }
  },
  // js 推荐规则
  pluginJs.configs.recommended,
  // ts 推荐规则
  ...tseslint.configs.recommended,
  // vue 推荐规则
  ...pluginVue.configs["flat/essential"],
  // 检测 vue 中的 ts 代码采用 tsparser
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } }
  },
  {
    rules: {
      "no-console": "warn",
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-explicit-any": "off"
    }
  },
  eslintPluginPrettierRecommended
]
