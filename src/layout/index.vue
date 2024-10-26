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
        <AppMain />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const matched = route.matched
console.log(matched)
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
      @apply bg-cyan;

      .navbar {
        @apply h-[var(--navbar-height)] bg-blue;
      }

      .tags-view {
        @apply h-[var(--tagsview-height)] bg-cyan;
      }
    }

    .app-main {
      @apply bg-red overflow-hidden;
      min-height: calc(100vh - var(--navbar-height) - var(--tagsview-height));
    }
  }
}
</style>
