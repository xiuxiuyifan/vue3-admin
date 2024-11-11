<script setup lang="ts">
import useSettingStore from "@/stores/settings.ts"

const predefineColors = [
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585"
]

const settingStore = useSettingStore()
</script>

<template>
  <el-color-picker
    v-model="settingStore.settings.theme"
    :predefine="predefineColors"
  />
</template>

<style scoped lang="scss"></style>
