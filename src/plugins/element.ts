import { ElMessage, ElMessageBox, ElNotification } from "element-plus"
import type { App } from "vue"

const installElementPlus = (app: App) => {
  // 都放到组件的实例上
  app.config.globalProperties.$message = ElMessage
  app.config.globalProperties.$notify = ElNotification
  app.config.globalProperties.$confirm = ElMessageBox.confirm
  app.config.globalProperties.$alert = ElMessageBox.alert
  app.config.globalProperties.$prompt = ElMessageBox.prompt
}

export default installElementPlus

export type Size = "default" | "large" | "small"
