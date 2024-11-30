<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <Sidebar />
    </div>
    <div class="main-container" :style="containerStyle">
      <div class="header">
        <Navbar @showSetting="openSetting" />
        <TagsView v-if="settingStore.settings.tagsView" />
      </div>
      <div class="app-main" :style="outerHeightStyle">
        <AppMain />
      </div>
    </div>
    <!--    增加 rightpanel-->
    <RightPanel v-model="showSetting" title="样式风格设置">
      <settings />
    </RightPanel>
  </div>
</template>

<script setup lang="ts">
import useSettingStore from "@/stores/settings.ts"
import varaibles from "@/style/variables.module.scss"
import { useAppStore } from "@/stores/app.ts"

const showSetting = ref(false)
const settingStore = useSettingStore()
const appStore = useAppStore()
// 打开设置面板
const openSetting = () => {
  showSetting.value = true
}

const outerHeightStyle = computed(() => {
  const outerHeight =
    (settingStore.settings.tagsView
      ? parseInt(varaibles.navBarHeight) + parseInt(varaibles.tagsViewHeight)
      : parseInt(varaibles.navBarHeight)) + "px"
  return {
    "min-height": `calc(100vh - ${outerHeight})`
  }
})

const containerStyle = computed(() => {
  return {
    "padding-left": appStore.sidebar.opened ? "64px" : "210px"
  }
})
</script>

<style lang="scss" scoped>
.app-wrapper {
  @apply flex w-full h-full;

  .sidebar-container {
    @apply bg-[var(--menu-bg)];
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 5000;
    :deep(.sidebar-container-menu:not(.el-menu--collapse)) {
      @apply w-[var(--sidebar-width)];
    }
  }

  .main-container {
    @apply flex flex-1 flex-col pos-fixed top-0 bottom-0 left-0 right-0;
    overflow: hidden;
    .header {
      .navbar {
        @apply h-[var(--navbar-height)];
      }
    }

    .app-main {
      @apply overflow-hidden;
    }
  }
}
</style>
