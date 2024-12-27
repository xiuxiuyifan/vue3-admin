<script setup lang="ts">
import { getMenu } from "@/api/menu.ts"
import { generateTree, ITreeItemData } from "@/utils/tree.ts"
import { IRole, roleSetMenu } from "@/api/role.ts"

// 选中子节点的时候，必须把父节点也同时选中
// 如果只想显示子菜单，请去调整菜单信息，不要在这里瞎搞
const data = ref<ITreeItemData[]>([])
const treeRef = ref()
const { proxy } = getCurrentInstance()!

const initData = () => {
  getMenu().then((res) => {
    data.value = generateTree(res.data)
  })
}

const rowData = ref<IRole | object>({})
const handleSubmit = () => {
  const menuIds = treeRef.value.getCheckedKeys()
  roleSetMenu(rowData.value!.id, {
    access: menuIds
  }).then((res) => {
    if (res.data === 0) {
      proxy?.$message.success("角色编辑成功！")
    }
  })
}

const { row } = defineProps({
  row: {
    type: Object as PropType<IRole>,
    default: () => ({})
  }
})
watch(
  () => row,
  (newVal) => {
    rowData.value = {
      ...newVal
    }
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
  <el-tree ref="treeRef" show-checkbox :data="data" draggable node-key="id">
    <template #default="{ node }">
      <span class="custom-tree-node">
        <span>{{ node.data.title }}</span>
      </span>
    </template>
  </el-tree>
  <el-button @click="handleSubmit">保存并关闭</el-button>
</template>

<style scoped lang="scss"></style>
