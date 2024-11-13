<script setup lang="ts">
import useSettingStore from "@/stores/settings.ts"

const settingStore = useSettingStore()

const tagsView = computed({
  get() {
    return settingStore.settings.tagsView
  },
  set(value: boolean) {
    settingStore.changeSetting({ key: "tagsView", value: value })
  }
})

const isShowLogo = computed({
  get() {
    return settingStore.settings.sidebarLogo
  },
  set(value: boolean) {
    settingStore.changeSetting({ key: "sidebarLogo", value: value })
  }
})
</script>

<template>
  <div class="drawer-item">
    <span>主题色</span>
    <theme-picker />
  </div>
  <div class="drawer-item">
    <span>是否展示标签栏</span>
    <el-switch v-model="tagsView" />
  </div>
  <div class="drawer-item">
    <span>是否展示Logo</span>
    <el-switch v-model="isShowLogo" />
  </div>
</template>

<style scoped lang="scss"></style>
