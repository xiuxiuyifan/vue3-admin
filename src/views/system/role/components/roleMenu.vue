<script setup lang="ts">
import { getMenu } from "@/api/menu.ts"
import { generateTree, ITreeItemData } from "@/utils/tree.ts"
import { getAccessByRole, IRole, roleSetMenu } from "@/api/role.ts"
import { node } from "globals"

// 选中子节点的时候，必须把父节点也同时选中
// 如果只想显示子菜单，请去调整菜单信息，不要在这里瞎搞
const data = ref<ITreeItemData[]>([])
const treeRef = ref()
const { proxy } = getCurrentInstance()!

const checkedKeys = ref([])
const expand = ref(false)

const emit = defineEmits(["submit"])

const initData = () => {
  getMenu().then((res) => {
    data.value = generateTree(res.data)
  })
}

const handleExpand = () => {
  const nodes = treeRef.value.store._getAllNodes()
  // 如果是 展开的
  if (expand.value) {
    nodes.forEach((node) => {
      node.expanded = false
    })
  } else {
    nodes.forEach((node) => {
      node.expanded = true
    })
  }
  expand.value = !expand.value
}

const getRoleWithMenu = (row) => {
  getAccessByRole(row.id).then((res) => {
    let ids = res.data.map((item) => item.access_id)
    checkedKeys.value = ids
    treeRef.value.setCheckedNodes(ids)
  })
}

const rowData = ref<IRole | object>({})
const handleSubmit = () => {
  const menuIds = treeRef.value.getCheckedKeys()
  roleSetMenu(rowData.value!.id, {
    access: menuIds
  }).then((res) => {
    if (res.code === 0) {
      proxy?.$message.success("角色编辑成功！")
      emit("submit")
    }
  })
}

const { row } = defineProps({
  row: {
    type: Object as PropType<IRole>,
    default: () => ({})
  }
})

// 监听行数据发生变化了
watch(
  () => row,
  (newVal) => {
    // 当前行数据为 null，则表示
    rowData.value = {
      ...newVal
    }
    if (!newVal.id) {
      checkedKeys.value = []
      treeRef.value.setCheckedNodes([])
      return
    }
    getRoleWithMenu(newVal)
  },
  {
    immediate: true
  }
)
onMounted(() => {
  initData()
})
</script>

<template>
  <el-button @click="handleExpand" style="height: 24px">
    {{ expand ? "收起所有" : "展开所有" }}
  </el-button>
  <el-tree
    ref="treeRef"
    show-checkbox
    :data="data"
    :default-checked-keys="checkedKeys"
    draggable
    node-key="id"
    check-strictly
  >
    <template #default="{ node }">
      <span class="custom-tree-node">
        <span>{{ node.data.title }}</span>
      </span>
    </template>
  </el-tree>
  <el-button @click="handleSubmit">保存并关闭</el-button>
</template>

<style scoped lang="scss"></style>
