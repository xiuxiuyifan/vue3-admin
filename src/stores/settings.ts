import { defineStore } from "pinia"
import varaibles from "@/style/variables.module.scss"

const useSettingStore = defineStore(
  "settings",
  () => {
    const settings = reactive({
      theme: varaibles.theme, // theme 是用户选择的主题
      tagsView: true, // 是否显示 标签栏
      sidebarLogo: true // 是否显示 logo
    })
    type ISettings = typeof settings

    // 泛型函数
    const changeSetting = <T extends keyof ISettings>({
      key,
      value
    }: {
      key: T
      value: ISettings[T] // 取 value 的类型
    }) => {
      settings[key] = value
    }

    const theme = computed(() => settings.theme)

    return {
      settings,
      theme,
      changeSetting
    }
  },
  {
    persist: {
      storage: window.sessionStorage,
      pick: ["settings.theme", "settings.tagsView", "settings.sidebarLogo"]
    }
  }
)

export default useSettingStore
