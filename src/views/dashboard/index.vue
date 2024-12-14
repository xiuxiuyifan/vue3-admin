<template>
  <div>
    <el-input v-model="value" placeholder="请输入" />

    <button @click="handleClick">调用子组件方法</button>
    <Child ref="childRef" :obj="obj" />
  </div>
</template>

<script lang="ts" setup>
import Child from "@/views/dashboard/Child.vue"

const value = ref("")
const childRef = ref(null)

const obj = reactive({
  name: "小明"
})

const handleClick = () => {
  obj.name = "大明"
  childRef.value?.getObjInfo()
}
// 希望每个路由组件都会有 name 属性
// 所以路由组件和配置中的 name 必须一致
defineOptions({ name: "dashboard" })
</script>
