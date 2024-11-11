/// <reference types="vite/client" />
declare module "element-plus/dist/locale/zh-cn.mjs"

// 自己编写 包的声明文件
declare module "css-color-function" {
  export function convert(color: string): string
}
