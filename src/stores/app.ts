import { defineStore } from "pinia"
import { Size } from "@/plugins/element.ts"

export const useAppStore = defineStore(
  "app",
  () => {
    const state = reactive({
      sidebar: {
        // 默认是打开的起来的
        opened: false
      },
      size: "default" as Size
    })

    // 计算属性
    const sidebar = computed(() => state.sidebar)
    const size = computed(() => state.size)
    // actions
    const toggleSidebar = () => {
      state.sidebar.opened = !state.sidebar.opened
    }

    const setSize = (size: Size) => {
      state.size = size
    }

    return {
      // 需要导出响应式数据才 插件才会存储
      state,
      sidebar,
      toggleSidebar,
      size,
      setSize
    }
  },
  {
    persist: {
      storage: window.sessionStorage,
      pick: ["state.sidebar", "state.size"] // 需要持久化的 state
    }
  }
)
