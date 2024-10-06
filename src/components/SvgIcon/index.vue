<template>
  <IconifyIcon
    v-if="!isExt"
    v-bind="$attrs"
    :class="svgClass"
    :icon="iconName"
  ></IconifyIcon>
  <div
    v-else
    :style="styleExternalIcon"
    :class="svgClass"
    inline-block
    bg-current
    v-bind="$attrs"
  ></div>
</template>

<script lang="ts" setup>
import { isExternal } from "@/utils/validate"
import { Icon as IconifyIcon } from "@iconify/vue"
const { iconName, customClass } = defineProps<{
  iconName: string
  customClass: string
}>()

// 判断是否是外部 icon
const isExt = computed(() => {
  return isExternal(iconName)
})

// 是否增加自定义 class
const svgClass = computed(() => {
  return customClass ? `icon ${customClass}` : "icon"
})

// 如果是 外部图标，则通过 style css 属性的方式显示
const styleExternalIcon = computed(() => {
  return {
    mask: `url(${iconName}) no-repeat 50% 50%`,
    "-webkit-mask": `url(${iconName}) no-repeat 50% 50%`,
    "mask-size": "cover"
  }
})
</script>
