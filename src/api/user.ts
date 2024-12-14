import service from "@/api/config/request.ts"
import { ApiResponse } from "@/api/type.ts"
import request from "@/api/config/request.ts"
import { IRole } from "@/api/role.ts"

export interface UserLoginData {
  username: string
  password: string
}

export interface IUser {
  username: string
  password: string
  mobile: string
  email: string
  status: boolean
  description: string
}

export type IUserInfo = IUser & {
  roleIds: string[]
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

/**
 * 添加用户
 * @param data
 */
export const addUser = (data): Promise<ApiResponse> => {
  return service.post("/auth/register", data)
}

export const updateUser = (
  id: number,
  data: Partial<IRole>
): Promise<ApiResponse> => {
  return request.put(`/user/${id}`, data)
}

export const deleteUser = (id: string): Promise<ApiResponse> => {
  return request.delete(`/user/${id}`)
}

/**
 * 获取用户列表
 * @param params
 */
export const getUsers = (params): Promise<ApiResponse> => {
  return service.get("/user", params)
}

export const getPermission = (): Promise<ApiResponse> => {
  return service.get("/user/permission")
}

export const getUserInfo = (): Promise<ApiResponse> => {
  return service.post("/auth/info")
}

// 获取 角色对应的权限
