<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="form"
      :rules="loginRules"
      :model="loginForm"
    >
      <div class="admin-logo">
        <img class="logo" src="../../assets/vue.svg" alt="logo" size-80px />
        <h1 class="name">Vue3 Admin</h1>
      </div>
      <el-form-item prop="username">
        <el-input placeholder="请输入用户名" v-model="loginForm.username">
          <template #prepend>
            <span class="svg-container">
              <svg-icon icon-name="ant-design:user-outlined"></svg-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          placeholder="请输入密码"
          autocomplete="on"
          show-password
          v-model="loginForm.password"
          prop="password"
          @keyup.enter="handleLogin"
        >
          <template #prepend>
            <span class="svg-container">
              <svg-icon icon-name="ant-design:lock-outlined"></svg-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-button
        type="primary"
        @click="handleLogin"
        :loading="loading"
        w-full
        mb-30px
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user"
import { FormInstance } from "element-plus"
import { useRouteQuery } from "@/hooks/useRouteQuery.ts"
const { login } = useUserStore()
const router = useRouter()
const { redirect, otherQuery } = useRouteQuery()
const loginState = reactive({
  loginForm: {
    username: "admin",
    password: "123456"
  },
  loginRules: {
    username: [{ required: true, trigger: "blur", message: "请输入用户名" }],
    password: [{ required: true, trigger: "blur", message: "请输入密码" }]
  }
})

const loading = ref(false)
const loginFormInstance = useTemplateRef<FormInstance>("form")
const { loginForm, loginRules } = loginState

const handleLogin = () => {
  loginFormInstance.value?.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true
        await login(loginForm)
        loading.value = false
        // 解析出一个重定向的路径  + 其他的查询参数
        router.push({ path: redirect.value || "/", query: otherQuery.value })
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped lang="scss">
.login-container {
  @apply min-h-screen w-full;
  .login-form {
    @apply w-500px mx-auto py50px;
  }
  .admin-logo {
    @apply flex items-center justify-center my-20px;
  }
}
</style>
