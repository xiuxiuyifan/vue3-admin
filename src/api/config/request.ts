import axios from "axios"
import { getToken } from "@/utils/auth.ts"
import { ElMessage } from "element-plus"
import { useUserStore } from "@/stores/user.ts"

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { code, message } = response.data
    if (code !== 0) {
      ElMessage.error(message)
      return Promise.reject(message)
    }
    return response.data
  },
  (error) => {
    const res = error.response
    if (res && res.status === 401) {
      // 未登录，或者 token 失效
      const userStore = useUserStore()
      userStore.resetToken()
      window.location.reload()
    }
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)
export default service
