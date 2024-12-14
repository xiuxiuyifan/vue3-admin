<template>
  <div p-20px>
    <!--  角色给菜单授权-->
    <div p-b-10px>
      <el-button :icon="AddIcon" @click="handleAddRole">添加角色</el-button>
      <el-button :icon="SearchIcon" @click="initData">搜索</el-button>
      <el-button :icon="ResetIcon" @click="initData">重置</el-button>
    </div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%" border>
      <el-table-column
        fixed
        prop="name"
        label="角色名称"
        show-overflow-tooltip
      />
      <el-table-column prop="description" label="描述" show-overflow-tooltip />
      <el-table-column prop="is_default" label="是否默认角色" align="center">
        <template #default="{ row }">
          <el-tag type="primary" v-if="row.is_default">是</el-tag>
          <el-tag type="danger" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" show-overflow-tooltip>
        <template #default="{ row }">
          {{ formatTime(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间" show-overflow-tooltip>
        <template #default="{ row }">
          {{ formatTime(row.updatedAt) }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="170">
        <template #default="{ row }">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleSetRole(row)"
          >
            分配权限
          </el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click="handleEditRole(row)"
            >编辑</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="handleDeleteRole(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div p-t10px p-b-10px flex justify-end>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <right-panel
      v-model="showEditRole"
      :title="actionType === 'add' ? '新增角色' : '编辑角色'"
    >
      <edit-role
        @submit="handleSubmitRole"
        :actionType="actionType"
        :data="roleData"
      />
    </right-panel>
    <right-panel :size="650" v-model="showRoleMenu" title="分配权限">
      <role-menu :row="currentRow" />
    </right-panel>
  </div>
</template>

<script lang="tsx" setup>
import SvgIcon from "@/components/SvgIcon/index.vue"
import { addRole, deleteRole, getRoles, IRole, updateRole } from "@/api/role.ts"
import { formatTime } from "@/utils/date.ts"
import { ActionType } from "@/types/type.ts"
import EditRole from "@/views/system/role/components/editRole.vue"

const AddIcon = <SvgIcon iconName="ant-design:plus-outlined" />
const SearchIcon = <SvgIcon iconName="ant-design:search-outlined" />
const ResetIcon = <SvgIcon iconName="ant-design:undo-outlined" />
const { proxy } = getCurrentInstance()

const tableData = ref<IRole[]>([])

const loading = ref(false)

const showEditRole = ref(false)
const actionType = ref<ActionType>("add")
const roleData = ref<IRole>({ name: "", description: "", is_default: 0 })

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const handleSizeChange = (val: number) => {
  // 每页多少条发生了变化
  pageSize.value = val
  initData()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  initData()
}

const handleAddRole = () => {
  showEditRole.value = true
  actionType.value = "add"
  roleData.value = { name: "", description: "", is_default: 0 }
}

const handleEditRole = (role: IRole) => {
  showEditRole.value = true
  actionType.value = "edit"
  roleData.value = { ...unref(role) }
}

const handleDeleteRole = (row: IRole) => {
  proxy
    .$confirm(`您确认要删除角色${row.name}?`, "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    })
    .then(() => {
      // 调用删除接口
      if (!row.id) return
      deleteRole(row.id).then((res) => {
        if (res.code === 0) {
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

const addNewRole = (data: IRole) => {
  addRole(data).then((res) => {
    if (res.code === 0) {
      proxy?.$message.success("角色添加成功！")
      showEditRole.value = false
      roleData.value = { name: "", description: "", is_default: 0 }
      initData()
    }
  })
}

const handleSubmitRole = (data: IRole) => {
  // 判断是新增还是编辑
  if (actionType.value === "add") {
    addNewRole(data)
  } else if (actionType.value === "edit") {
    if (roleData.value.id) {
      updateRole(+roleData.value.id, data).then((res) => {
        if (res.code === 0) {
          proxy?.$message.success("角色编辑成功！")
          showEditRole.value = false
          roleData.value = { name: "", description: "", is_default: 0 }
          initData()
        }
      })
    }
  }
}

const initData = async () => {
  try {
    loading.value = true
    const params = {
      pageSize: pageSize.value,
      pageNum: currentPage.value - 1
    }
    let res = getRoles(params)
    tableData.value = (await res).data.roles
    total.value = (await res).data.count
  } finally {
    loading.value = false
  }
}

const showRoleMenu = ref(false)
const currentRow = ref<IRole>()
const handleSetRole = (row: IRole) => {
  showRoleMenu.value = true
  currentRow.value = row
}

onMounted(() => {
  initData()
})
</script>
