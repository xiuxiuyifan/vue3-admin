<script setup lang="ts">
const props = defineProps({
  obj: {
    type: Object
  }
})

const getObjInfo = () => {
  console.log(props.obj)
}

defineExpose({
  getObjInfo
})
</script>

<template></template>

<style scoped lang="scss"></style>
