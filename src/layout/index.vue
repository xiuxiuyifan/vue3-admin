<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <Sidebar />
    </div>
    <div class="main-container">
      <div class="header">
        <Navbar @showSetting="openSetting" />
        <TagsView />
      </div>
      <div class="app-main">
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
const showSetting = ref(false)
// 打开设置面板
const openSetting = () => {
  showSetting.value = true
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  @apply flex w-full h-full;

  .sidebar-container {
    @apply bg-[var(--menu-bg)];
    :deep(.sidebar-container-menu:not(.el-menu--collapse)) {
      @apply w-[var(--sidebar-width)];
    }
  }

  .main-container {
    @apply flex flex-1 flex-col;

    .header {
      .navbar {
        @apply h-[var(--navbar-height)];
      }
    }

    .app-main {
      @apply overflow-hidden;
      min-height: calc(100vh - var(--navbar-height) - var(--tagsview-height));
    }
  }
}
</style>
