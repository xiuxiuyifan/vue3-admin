<template>
  <div class="hamburger-container" @click="handleClick">
    <svg-icon
      icon-name="ant-design:bars-outlined"
      custom-class="hamburger"
      :class="{ 'rotate-180': collapse }"
    ></svg-icon>
  </div>
</template>

<style scoped lang="scss">
.hamburger-container {
  @apply leading-[50px] float-left cursor-pointer px-10px hover:(bg-black/5);
}
.hamburger {
  @apply w-30px h-30px transition-transform duration-300 p-t-10px p-b-10px flex;
}
</style>

<script lang="ts" setup>
const { collapse } = defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{ (e: "toggleCollapse"): void }>()
const handleClick = () => {
  emit("toggleCollapse")
}
</script>
