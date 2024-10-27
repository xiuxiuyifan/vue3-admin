<script setup lang="ts">
import { Size } from "@/plugins/element.ts"
import { useAppStore } from "@/stores/app.ts"
import { storeToRefs } from "pinia"

const { proxy } = getCurrentInstance()!

const appStore = useAppStore()
const { size } = storeToRefs(appStore)

const sizeOptions = ref([
  {
    label: "Default",
    value: "default"
  },
  {
    label: "Large",
    value: "large"
  },
  {
    label: "Small",
    value: "small"
  }
])

const handleSize = (command: Size) => {
  appStore.setSize(command)
  proxy?.$message({
    type: "success",
    message: "切换组件大小成功"
  })
}
</script>

<template>
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      <svg-icon
        custom-class="w-2em h-2em cursor-pointer"
        icon-name="ant-design:font-size-outlined"
      ></svg-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          :disabled="item.value === size"
          v-for="item in sizeOptions"
          :key="item.label"
          @click="handleSize(item.value as Size)"
        >
          {{ item.label }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss"></style>
