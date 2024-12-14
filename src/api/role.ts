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

// 分页参数
export interface RoleParams {
  pageNum: number
  pageSize: number
}

export const getRoles = (
  params: RoleParams
): Promise<ApiResponse<IRoleState>> => {
  return request.get("/role", {
    params
  })
}

export const addRole = (data: IRole): Promise<ApiResponse> => {
  return request.post("/role", data)
}

export const updateRole = (
  id: number,
  data: Partial<IRole>
): Promise<ApiResponse> => {
  return request.put(`/role/${id}`, data)
}

export const deleteRole = (id: string): Promise<ApiResponse> => {
  return request.delete(`/role/${id}`)
}

// 角色授权菜单
export const roleSetMenu = (id: number, data: { access: number[] }) => {
  return request.post(`/role_access/${id}`, data)
}
