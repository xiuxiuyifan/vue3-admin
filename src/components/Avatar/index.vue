<script setup lang="ts">
import avatar from "@/assets/avatar.svg"
import { useUserStore } from "@/stores/user.ts"
const { proxy } = getCurrentInstance()!
const userStore = useUserStore()
const logout = () => {
  // 调用 退出接口
  userStore.logout()
  proxy?.$message.success("退出登录成功！")
  window.location.reload()
}
</script>

<template>
  <el-dropdown>
    <img :src="avatar" size-35px rounded-sm cursor-pointer outline-none />
    <template #dropdown>
      <el-dropdown-menu>
        <router-link to="/">
          <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <router-link to="/profile/index">
          <el-dropdown-item>个人设置</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided @click="logout">
          <span block @click="logout">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss"></style>
