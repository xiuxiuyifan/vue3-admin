import { ITreeItemData } from "@/stores/menu.ts"

export interface IMeta {
  title: string
  icon: string
  hidden?: boolean // 隐藏菜单
  alwaysShow?: boolean // 默认情况下，如果只有一个子路由就不显示父路由， alwaysShow 为 true 可始终显示父路由
  activeMenu?: string // 标识激活的菜单路径
  breadcrumb?: boolean // 是否在 面包屑中展示
  [key: string]: string | boolean | undefined
}

// 联合操作，表示两个对象里面的属性都要存在
export type ITreeItemDataWithMenuData = ITreeItemData & {
  meta: IMeta
}
