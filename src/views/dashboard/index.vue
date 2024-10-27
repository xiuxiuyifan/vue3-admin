<template>
  <div>
    <el-input v-model="value" placeholder="请输入" />
  </div>
</template>

<script lang="ts" setup>
const value = ref("")
// 希望每个路由组件都会有 name 属性
// 所以路由组件和配置中的 name 必须一致
defineOptions({ name: "dashboard" })
</script>
