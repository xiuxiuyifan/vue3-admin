<template>
  <div>
    <el-input v-model="value" placeholder="请输入" />

    <button @click="handleClick">调用子组件方法</button>
    <Child ref="childRef" :obj="obj" />

    <button v-auth="['sys:role:edit']" @click="handleClickDisabled">
      显示不显示按钮
    </button>

    <button v-auth="['sys:display:add']" @click="handleClickDisabled">
      正常/禁用按钮
    </button>
  </div>
</template>

<script lang="ts" setup>
// 用来配个 keepAlive
defineOptions({
  name: "Dashboard"
})
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

const handleClickDisabled = () => {
  console.log("hihihihihi")
}

function partition(D, low, high) {
  let i
  let j
  let s
  while (high > low) {
    i = low
    j = high
    s = D[low]
    while (i < j) {
      while (D[j] > s) {
        j--
      }
      D[i] = D[j]

      while (s >= D[i] && i < j) {
        i++
      }
      D[j] = D[i]
    }
    D[i] = s
    partition(D, low, i - 1)
    low = i + 1
  }
}

function quicksort(D) {
  partition(D, 0, D.length - 1)
}

let arr = [7, 6, 1, 5, 1, 9, 3, 8, 5, 2, 7, 8, 9, 3, 9]
quicksort(arr)
console.log(arr)
</script>
