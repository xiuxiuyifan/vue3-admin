<template>
  <logo :collapse="sidebar.opened" v-if="settingStore.settings.sidebarLogo" />
  <el-menu
    router
    class="sidebar-container-menu"
    :collapse="sidebar.opened"
    :default-active="activeMenu"
    mode="vertical"
    :background-color="varaibles.menuBg"
    :text-color="varaibles.menuText"
    :active-text-color="settingStore.theme"
    :collapse-transition="true"
  >
    <SidebarItem
      v-for="route in routes"
      :key="route.path"
      :item="route"
      :base-path="route.path"
    ></SidebarItem>
  </el-menu>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app"
import varaibles from "@/style/variables.module.scss"
import { storeToRefs } from "pinia"
import SidebarItem from "./SidebarItem.vue"
import { routes } from "@/router"
import useSettingStore from "@/stores/settings.ts"

const route = useRoute()
// 根据路由激活当前的菜单
const activeMenu = computed(() => {
  return route.meta.activeMenu || route.path
})

const appStore = useAppStore()
const settingStore = useSettingStore()
const { sidebar } = storeToRefs(appStore)
</script>

<style lang="scss" scoped>
.sidebar-container-menu {
  border: 0;
}
</style>
