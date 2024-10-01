<template>
  About

  <div>{{ count }}</div>

  <button @click="handleClick">增加</button>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter"
import { storeToRefs } from "pinia"

const counterStore = useCounterStore()

const { count } = storeToRefs(counterStore)

const handleClick = () => {
  counterStore.increment()
}
</script>
