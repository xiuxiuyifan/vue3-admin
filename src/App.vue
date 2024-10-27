<script setup lang="ts">
import { useAppStore } from "@/stores/app.ts"
import { storeToRefs } from "pinia"

const appStore = useAppStore()
const { size } = storeToRefs(appStore)
</script>

<template>
  <div>
    <el-config-provider :size="size">
      <RouterView />
    </el-config-provider>
  </div>
</template>
