<script setup lang="ts">
import { useAppStore } from "@/stores/app.ts"
import { storeToRefs } from "pinia"
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import { useGenerateTheme } from "@/hooks/useGenerateTheme.ts"

const appStore = useAppStore()
const { size } = storeToRefs(appStore)
// 改变主题颜色

useGenerateTheme()
</script>

<template>
  <div>
    <el-config-provider :size="size" :locale="zhCn">
      <RouterView />
    </el-config-provider>
  </div>
</template>
