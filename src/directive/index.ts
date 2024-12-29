import { App } from "vue"
import Permission from "@/directive/permission.ts"

const install = (app: App) => {
  app.directive("auth", Permission)
}

export default install
