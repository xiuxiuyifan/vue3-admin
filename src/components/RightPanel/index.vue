<script setup lang="ts">
import { DrawerProps } from "element-plus"

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  // 方向
  direction: {
    type: String as PropType<DrawerProps["direction"]>,
    default: "rtl"
  },
  // 默认的标题
  title: {
    type: String,
    default: ""
  }
})

const emit = defineEmits(["update:modelValue"])

const handleClose = () => {
  emit("update:modelValue", false)
}
</script>

<template>
  <el-drawer :model-value="modelValue" :title="title" @close="handleClose">
    <slot />
  </el-drawer>
</template>

<style scoped lang="scss"></style>
