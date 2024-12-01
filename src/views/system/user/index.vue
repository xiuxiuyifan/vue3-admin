<template>
  <div p-20px>
    <!--  角色给菜单授权-->
    <div p-b-10px>
      <el-button :icon="AddIcon" @click="handleAddRole">添加用户</el-button>
      <el-button :icon="SearchIcon" @click="initData">搜索</el-button>
      <el-button :icon="ResetIcon" @click="initData">重置</el-button>
    </div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%" border>
      <el-table-column
        fixed
        prop="username"
        label="用户名"
        show-overflow-tooltip
      />
      <el-table-column prop="mobile" label="手机" show-overflow-tooltip />
      <el-table-column prop="email" label="邮箱" show-overflow-tooltip />
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag type="primary" v-if="row.status">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="roleIds" label="角色">
        <template #default="{ row }">
          <el-tag
            type="primary"
            v-for="(item, index) in row.roles"
            :key="index"
            m-r-4px
            m-b-2px
            >{{ item.name }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" show-overflow-tooltip />
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
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="{ row }">
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
      v-model="showEditUser"
      :title="actionType === 'add' ? '新增用户' : '编辑用户'"
    >
      <edit-role
        @submit="handleSubmitRole"
        :actionType="actionType"
        :data="userData"
      />
    </right-panel>
  </div>
</template>

<script lang="tsx" setup>
import SvgIcon from "@/components/SvgIcon/index.vue"
import { formatTime } from "@/utils/date.ts"
import { ActionType } from "@/types/type.ts"
import EditRole from "@/views/system/user/components/editUser.vue"
import {
  addUser,
  deleteUser,
  getUsers,
  IUserInfo,
  updateUser
} from "@/api/user.ts"

const AddIcon = <SvgIcon iconName="ant-design:plus-outlined" />
const SearchIcon = <SvgIcon iconName="ant-design:search-outlined" />
const ResetIcon = <SvgIcon iconName="ant-design:undo-outlined" />
const { proxy } = getCurrentInstance()

const initUserData = (): IUserInfo => {
  return {
    username: "",
    password: "",
    mobile: "",
    email: "",
    status: false,
    description: "",
    roleIds: []
  }
}
const tableData = ref<IUserInfo[]>([])

const loading = ref(false)

const showEditUser = ref(false)
const actionType = ref<ActionType>("add")
const userData = ref<IUserInfo>(initUserData())

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
  showEditUser.value = true
  actionType.value = "add"
  userData.value = initUserData()
}

const handleEditRole = (user: IUserInfo) => {
  showEditUser.value = true
  actionType.value = "edit"
  const roleIds = user.roles.map((item) => item.id)
  userData.value = { ...unref(user), roleIds }
}

const handleDeleteRole = (row: IUserInfo) => {
  proxy
    .$confirm(`您确认要删除用户${row.username}?`, "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    })
    .then(() => {
      // 调用删除接口
      if (!row.id) return
      deleteUser(row.id).then((res) => {
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

const addNewUser = (data: IUserInfo) => {
  addUser(data).then((res) => {
    if (res.code === 0) {
      proxy?.$message.success("用户添加成功！")
      showEditUser.value = false
      userData.value = initUserData()
      initData()
    }
  })
}

const handleSubmitRole = (data: IUserInfo) => {
  // 判断是新增还是编辑
  if (actionType.value === "add") {
    addNewUser(data)
  } else if (actionType.value === "edit") {
    if (userData.value.id) {
      updateUser(+userData.value.id, data).then((res) => {
        if (res.code === 0) {
          proxy?.$message.success("用户编辑成功！")
          showEditUser.value = false
          userData.value = initUserData()
          initData()
        }
      })
    }
  }
}
onMounted(() => {
  initData()
})

const initData = async () => {
  try {
    loading.value = true
    const params = {
      pageSize: pageSize.value,
      pageNum: currentPage.value - 1
    }
    let res = getUsers(params)
    tableData.value = (await res).data.users
    total.value = (await res).data.count
  } finally {
    loading.value = false
  }
}
</script>
