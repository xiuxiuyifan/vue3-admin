<script setup lang="ts">
import screenfull from "screenfull"

const isFullscreen = ref(false)

const { proxy } = getCurrentInstance()!

const handleClick = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
  } else {
    proxy?.$message({
      message: "你的浏览器不支持全屏模式",
      type: "warning"
    })
  }
}

const updateFullscreenStatus = () => {
  isFullscreen.value = screenfull.isFullscreen
}

const onFullscreenChange = () => {
  updateFullscreenStatus()
}

onMounted(() => {
  if (screenfull.isEnabled) {
    screenfull.on("change", onFullscreenChange)
    updateFullscreenStatus() // 初始化全屏状态
  }
})

onUnmounted(() => {
  if (screenfull.isEnabled) {
    screenfull.off("change", onFullscreenChange)
  }
})
</script>

<template>
  <!--  如果是全屏，则显示退出全屏，否则显示进入全屏-->
  <SvgIcon
    :icon-name="
      isFullscreen
        ? 'ant-design:fullscreen-exit-outlined'
        : 'ant-design:fullscreen-outlined'
    "
    size-1.5em
    cursor-pointer
    @click="handleClick"
  ></SvgIcon>
</template>

<style scoped lang="scss"></style>
