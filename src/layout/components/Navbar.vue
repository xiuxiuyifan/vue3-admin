<template>
  <div h-50px>
    <Hamburger
      @toggleCollapse="appStore.toggleSidebar"
      :collapse="sidebar.opened"
    ></Hamburger>
    <Breadcrumb />
  </div>
</template>

<style scoped lang="scss"></style>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app"
import { storeToRefs } from "pinia"
// 在解构的时候要考虑值是不是对象，如果非对象解构出来就 丧失响应式了
const appStore = useAppStore()
const { sidebar } = storeToRefs(appStore)
</script>
