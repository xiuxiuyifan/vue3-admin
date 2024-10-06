import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import UnoCSS from "unocss/vite"

import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src")
      }
    ]
  },
  plugins: [
    vue(),
    UnoCSS(),
    // 自动导入
    AutoImport({
      imports: ["vue", "vue-router"],
      dts: "src/auto-import.d.ts",
      resolvers: [ElementPlusResolver()],
      eslintrc: { enabled: false } //改成true⽣成⼀次后禁⽤即可
    }),
    Components({
      // 针对 src/components 下面的目录实现自动导入
      // 布局组件也希望自动导入
      dirs: ["src/components", "src/layout/components"],
      dts: "src/components.d.ts",
      // ⽣成的组件的类型放到这⾥
      resolvers: [ElementPlusResolver()]
    })
  ]
})
