import { MenuData } from "@/api/menu.ts"
import { IMeta } from "@/utils/gentrateTree.ts"

export interface ITreeItemData extends MenuData {
  meta: IMeta
  children?: ITreeItemData[]
}

// 全局存储菜单的 store
