import { ApiResponse } from "@/api/type.ts"
import request from "@/api/config/request.ts"

export interface IRole {
  id?: string
  name: string
  description: string
  is_default: number
  createdAt?: string
  updatedAt?: string
}

export interface IRoleState {
  // 角色列表
  roles: IRole[]
  // 总条数
  count: number
}

// 获取角色的参数
export interface RoleParams {
  pageNum: number
  pageSize: number
}

export const getRoles = (
  params = { pageNum: 0, pageSize: 10 }
): Promise<ApiResponse<IRoleState>> => {
  return request.get("/role", {
    params
  })
}
