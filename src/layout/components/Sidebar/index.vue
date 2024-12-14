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
    <!--    在外边循环一次，这样在内部只用处理，有子菜单 和没有子菜单的两种情况了-->
    <SidebarItem
      v-for="route in userStore.state.menu"
      :key="route.path"
      :item="route"
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
import { useUserStore } from "@/stores/user.ts"

const route = useRoute()
// 根据路由激活当前的菜单
const activeMenu = computed(() => {
  return route.meta.activeMenu || route.path
})

const appStore = useAppStore()
const settingStore = useSettingStore()
const { sidebar } = storeToRefs(appStore)
const userStore = useUserStore()

console.log(userStore.state.menu)
</script>

<style lang="scss" scoped>
.sidebar-container-menu {
  border: 0;
}
</style>
