import service from "@/api/config/request.ts"
import { ApiResponse } from "@/api/type.ts"

export interface UserLoginData {
  username: string
  password: string
}

// 返回值的类型
interface LoginResponseData {
  token: string
}

export const login = (
  data: UserLoginData
): Promise<ApiResponse<LoginResponseData>> => {
  return service.post("/auth/login", data)
}
