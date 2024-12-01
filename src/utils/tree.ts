import { IMenu } from "@/api/menu.ts"

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
  meta?: IMeta
}

/**
 * 树形结构一项的结构
 */
export interface ITreeItemData extends IMenu {
  children?: ITreeItemData[]
}

// 根据 list 生成 树形结构
export const generateTree = (list: ITreeItemData[]): ITreeItemData[] => {
  let tree: ITreeItemData[] = []
  // 遍历原来的数组
  list.forEach((item) => {
    // 在原来的数组中找儿子
    const children = list
      .filter((i: ITreeItemData) => {
        // 谁的 parent_id 和当前项的 id 相等，说明谁就是当前节点的儿子
        return item.id === i.parent_id
      })
      .sort((a, b) => a.sort_id - b.sort_id)
    // 根据 sort 排序
    if (children) {
      item.children = children
    }
  })
  tree = list
    .filter((item) => {
      return item.parent_id == null
    })
    .sort((a, b) => a.sort_id - b.sort_id)
  return tree
}

interface TreeNode<T> {
  children?: TreeNode<T>[]
  // 可以添加其他节点相关的元素
  [key: string]: any
}

export function traverseTree<T>(
  tree: TreeNode<T> | TreeNode<T>[],
  callback: (node: TreeNode<T>, index?: number) => void
) {
  const traverse = (node: TreeNode<T>, index?: number) => {
    callback(node, index)

    // 判断当前节点有没有子节点
    if (node.children && node.children.length > 0) {
      node.children.forEach((item, index) => {
        traverse(item, index)
      })
    }
  }
  // 判断传进来的是不是数组
  if (Array.isArray(tree)) {
    tree.forEach((item, index) => {
      traverse(item, index)
    })
  } else {
    traverse(tree)
  }
}
