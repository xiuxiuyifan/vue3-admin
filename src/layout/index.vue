<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <Sidebar />
    </div>
    <div class="main-container">
      <div class="header">
        <Navbar />
        <div class="tags-view">tagview</div>
      </div>
      <div class="app-main">
        <h2>app main</h2>
        <div i-ant-design:account-book-outlined icon></div>
        <el-button type="primary" @click="handleClickBtn">你好</el-button>
        <SvgIcon
          icon-name="ant-design:account-book-twotone"
          custom-class="text-red-500"
        ></SvgIcon>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "./Navbar.vue"
import Sidebar from "./Sidebar/index.vue"
// eslint 不认识这个 api
const instance = getCurrentInstance()!
const handleClickBtn = () => {
  instance?.proxy?.$message("恭喜你")
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  @apply flex w-full h-full;

  .sidebar-container {
    :deep(.sidebar-container-menu:not(.el-menu--collapse)) {
      @apply w-[var(--sidebar-width)];
    }
  }

  .main-container {
    @apply flex flex-1 flex-col;

    .header {
      @apply bg-cyan;

      .navbar {
        @apply h-[var(--navbar-height)] bg-blue;
      }

      .tags-view {
        @apply h-[var(--tagsview-height)] bg-cyan;
      }
    }

    .app-main {
      @apply bg-red;
      min-height: calc(100vh - var(--navbar-height) - var(--tagsview-height));
    }
  }
}
</style>
