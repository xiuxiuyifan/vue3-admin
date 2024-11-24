<template>
  <div p-20px>
    <!--  角色给菜单授权-->
    <div p-b-20px>
      <el-button :icon="AddIcon" @click="handleAddRole">添加角色</el-button>
    </div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%" border>
      <el-table-column fixed prop="name" label="角色名称" />
      <el-table-column prop="description" label="说明" />
      <el-table-column prop="is_default" label="是否默认角色" />
      <el-table-column prop="createdAt" label="创建时间">
        <template #default="{ row }">
          {{ formatTime(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间">
        <template #default="{ row }">
          {{ formatTime(row.updatedAt) }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick">
            菜单权限
          </el-button>
          <el-button link type="primary" size="small">编辑</el-button>
          <el-button link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <right-panel
      v-model="showEditRole"
      :title="actionType === 'add' ? '新增角色' : '编辑角色'"
    ></right-panel>
  </div>
</template>

<script lang="tsx" setup>
import SvgIcon from "@/components/SvgIcon/index.vue"
import { getRoles, IRole } from "@/api/role.ts"
import { formatTime } from "@/utils/date.ts"
import { ActionType } from "@/types/type.ts"

const AddIcon = <SvgIcon iconName="ant-design:plus-outlined" />
const handleClick = () => {
  console.log("click")
}

const tableData = ref<IRole[]>([])

const loading = ref(false)

const showEditRole = ref(false)
const actionType = ref<ActionType>("add")

const handleAddRole = () => {
  showEditRole.value = true
  actionType.value = "add"
}
onMounted(() => {
  initData()
})

const initData = async () => {
  try {
    loading.value = true
    let res = getRoles()
    tableData.value = (await res).data.roles
  } finally {
    loading.value = false
  }
}
</script>
