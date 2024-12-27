<script setup lang="tsx">
import type Node from "element-plus/es/components/tree/src/model/node"
import type { AllowDropType } from "element-plus/es/components/tree/src/tree.type"
import SvgIcon from "@/components/SvgIcon/index.vue"
import { ActionType } from "@/types/type.ts"
import EditMenu from "@/views/system/menu/components/editMenu.vue"
import {
  addMenu,
  deleteMenu,
  getMenu,
  IMenu,
  updateMenu,
  updateMenuByTree
} from "@/api/menu.ts"
import { generateTree, ITreeItemData, traverseTree } from "@/utils/tree.ts"

const AddIcon = <SvgIcon iconName="ant-design:plus-outlined" />

const { proxy } = getCurrentInstance()

const treeRef = ref(null)
const expandTree = ref(false)

const DownIcon = () => {
  return (
    <SvgIcon
      style={{
        transform: expandTree.value ? "rotate(180deg)" : "rotate(0deg)"
      }}
      iconName="ant-design:down-outlined"
    />
  )
}

// 菜单拖拽，一般不能把 子菜单拖拽成为一级菜单
// 一级菜单也不能拖拽成为 子菜单
const handleDrop = () => {
  // 每次退拽完成之后，重新根据当前树形结构修改 排序字段  和 parent_id 字段
  traverseTree<ITreeItemData>(
    data.value,
    (node: ITreeItemData, index?: number, parent_id) => {
      if (index !== undefined) {
        node.sort_id = index
        node.parent_id = parent_id
      }
    }
  )
  updateMenuByTree(data.value).then((res) => {
    if (res.code == 0) {
      proxy?.$message.success("更新成功！")
      expandTree.value = false
      initData()
    }
  })
}

//判断节点能否被拖拽
// 一级节点，只能被拖拽到一级节点的前面或者后面
// 子节点，不能被拖拽成为一级节点
/**
 *
 * @param draggingNode 当前拖拽元素
 * @param dropNode  目标元素
 * @param type  拖拽结束的类型
 */
const allowDrop = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {
  // 顶层节点只能移动 菜单顺序
  if (
    draggingNode.data.parent_id === null &&
    dropNode.data.parent_id === null &&
    ["prev", "next"].includes(type)
  ) {
    return true
  }
  // 如果拖拽的非顶层节点 放下的时候如果是 顶层节点，则只能是 inner 否则三者都可以
  else if (draggingNode.data.parent_id !== null) {
    // 判断放下的 如果是父节点，则前面和后面都不可以
    if (dropNode.data.parent_id === null && ["next", "prev"].includes(type)) {
      return false
    }
    return true
  } else {
    return false
  }
}

const allowDrag = () => {
  return true
}

const data = ref<ITreeItemData[]>([])

const menuData = ref({})

const actionType = ref<ActionType>("add")
const showEditMenu = ref<boolean>(false)

const handleAddMenu = () => {
  showEditMenu.value = true
  actionType.value = "add"
  menuData.value = {}
}

const handleEditMenu = (node: Node) => {
  showEditMenu.value = true
  actionType.value = "edit"
  menuData.value = node.data
}

const handleSubmitMenu = (data: IMenu) => {
  expandTree.value = false
  if (actionType.value === "add") {
    addMenu(data).then((res) => {
      if (res.code === 0) {
        proxy?.$message.success("添加成功！")
        showEditMenu.value = false
        initData()
      }
    })
  } else if (actionType.value === "edit") {
    if (!data.id) return
    updateMenu(data.id, data).then((res) => {
      if (res.code === 0) {
        proxy?.$message.success("编辑成功！")
        showEditMenu.value = false
        initData()
      }
    })
  }
}
const initData = () => {
  getMenu().then((res) => {
    data.value = generateTree(res.data)
  })
}

const handleDeleteMenu = (node: Node) => {
  proxy
    .$confirm(`您确认要删除菜单${node.data.title}?`, "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    })
    .then(() => {
      // 调用删除接口
      if (!node.data.id) return
      deleteMenu(node.data.id).then((res) => {
        if (res.code === 0) {
          expandTree.value = false
          proxy.$message({
            type: "success",
            message: "删除成功！"
          })
          initData()
        }
      })
    })
    .catch(() => {
      proxy.$message({
        type: "info",
        message: "取消删除！"
      })
    })
}

const expandAll = () => {
  if (treeRef.value) {
    let nodes = treeRef.value.store._getAllNodes()
    nodes.forEach((node) => {
      if (!expandTree.value) {
        node.expanded = true
      } else {
        node.expanded = false
      }
    })
    expandTree.value = !expandTree.value
  }
}

onMounted(() => {
  initData()
})
</script>

<template>
  <div class="menu">
    <div p-b-10px>
      <el-button :icon="AddIcon" @click="handleAddMenu">新增菜单</el-button>
      <el-button :icon="DownIcon" @click="expandAll">{{
        expandTree ? "折叠所有" : "展开所有"
      }}</el-button>
    </div>
    <el-tree
      ref="treeRef"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      :data="data"
      draggable
      highlight-current
      node-key="id"
      @node-drop="handleDrop"
    >
      <template #default="{ node }">
        <span class="custom-tree-node">
          <span>
            <span>{{ node.data.title }}</span>
            <el-tag type="primary">Tag 1</el-tag>
          </span>
          <span>
            <el-button link type="primary" m-r-4px @click="handleEditMenu(node)"
              >编辑</el-button
            >
            <el-dropdown border-none class="down-more-menu">
              <el-button link type="primary" border-none class="more-button">
                更多
                <el-icon class="el-icon--right"> <DownIcon /> </el-icon
              ></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>添加下级</el-dropdown-item>
                  <el-dropdown-item @click="handleDeleteMenu(node)"
                    >删除</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </span>
        </span>
      </template>
    </el-tree>
    <RightPanel
      v-model="showEditMenu"
      :size="600"
      :title="actionType === 'add' ? '新增菜单' : '编辑菜单'"
    >
      <EditMenu
        :action-type="actionType"
        :data="menuData"
        :tree-data="data"
        @submit="handleSubmitMenu"
      />
    </RightPanel>
  </div>
</template>

<style scoped lang="scss">
.menu {
  @apply p-20px;
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .down-more-menu {
    &:hover {
      @apply border-none;
    }
  }
  .more-button {
    &:hover {
      @apply border-none;
    }
    &:focus-visible {
      outline: none;
    }
  }
}
</style>
