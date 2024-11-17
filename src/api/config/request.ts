import axios from "axios"
import { getToken } from "@/utils/auth.ts"
import { ElMessage } from "element-plus"

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
    console.log(error)
    return Promise.reject(error)
  }
)
export default service
