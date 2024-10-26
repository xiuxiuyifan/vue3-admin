import { ITreeItemData } from "@/stores/menu.ts"

export interface IMeta {
  icon: string
  title: string
  hidden?: boolean // 隐藏菜单
  alwaysShow?: boolean // 默认情况下，如果只有一个子路由就不显示父路由， alwaysShow 为 true 可始终显示父路由
  activeMenu?: string
  [key: string]: string | boolean | undefined
}
export type ITreeItemDataWithMenuData = ITreeItemData & {
  meta: IMeta
}
