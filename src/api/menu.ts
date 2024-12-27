import service from "@/api/config/request.ts"
import { ApiResponse } from "@/api/type.ts"

export interface MenuData {
  id: number
  title: string
  path: string
  icon: string
  name: string
  sort_id: number
  parent_id: number
}

export interface IMenu {
  id?: number
  type: 0 | 1 | 2 // 菜单类型
  title: string // 菜单名称
  path: string // 访问路径
  component_path: string // 组件路径
  component_name: string // 组件名称
  parent_id?: number | null // 上级菜单
  icon: string //菜单图标
  sort_id: number // 排序
  route: boolean // 是否路由菜单
  hidden: boolean // 隐藏路由
  keep_alive: boolean //是否缓存路由
  internal_or_external: boolean // 打开方式  false 内部 true 外部
  strategy: string // 策略  可见 或者 禁用
  available: string // 按钮是否可用
}

export const addMenu = (data: IMenu): Promise<ApiResponse> => {
  return service.post("/access/menu", data)
}

export const getMenu = (): Promise<ApiResponse> => {
  return service.get("/access/menu")
}

export const deleteMenu = (id: number): Promise<ApiResponse> => {
  return service.delete("/access/menu/" + id)
}

export const updateMenu = (id: number, data: IMenu): Promise<ApiResponse> => {
  return service.put("/access/menu/" + id, data)
}

export const updateMenuByTree = (data: any) => {
  return service.post("/access/menu/updateByTree", data)
}
