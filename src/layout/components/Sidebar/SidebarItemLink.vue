<script setup lang="ts">
// 根据要传入的属性计算出 当前动态组件要渲染的内容
import { isExternal } from "@/utils/validate.ts"

const { to } = defineProps<{
  to: string
}>()

const componentProps = computed(() => {
  if (isExt.value) {
    return {
      href: to,
      target: "_blank"
    }
  } else {
    return {
      to
    }
  }
})

// 根据 props 判断是否是外部链接
const isExt = computed(() => isExternal(to))

// 根据是否是外部链接渲染出不同的标签
const componentType = computed(() => {
  return isExt.value ? "a" : "router-link"
})
</script>

<template>
  <!--  外部和内部的分开渲染-->
  <component :is="componentType" v-bind="componentProps">
    <slot />
  </component>
</template>

<style scoped lang="scss"></style>
