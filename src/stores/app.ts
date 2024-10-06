import { defineStore } from "pinia"

export const useAppStore = defineStore(
  "app",
  () => {
    const state = reactive({
      sidebar: {
        // 默认是打开的起来的
        opened: false
      }
    })

    // 计算属性
    const sidebar = computed(() => state.sidebar)

    // actions
    const toggleSidebar = () => {
      console.log("切换")
      state.sidebar.opened = !state.sidebar.opened
    }

    return {
      // 需要导出响应式数据才 插件才会存储
      state,
      sidebar,
      toggleSidebar
    }
  },
  {
    persist: {
      storage: window.sessionStorage,
      pick: ["state.sidebar"]
    }
  }
)
