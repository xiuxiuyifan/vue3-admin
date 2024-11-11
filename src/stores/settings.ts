import { defineStore } from "pinia"
import varaibles from "@/style/variables.module.scss"

const useSettingStore = defineStore(
  "settings",
  () => {
    const settings = reactive({
      theme: varaibles.theme // theme 是用户选择的主题
    })
    type ISettings = typeof settings

    // 泛型函数
    const changeSetting = <T extends keyof ISettings>({
      key,
      value
    }: {
      key: T
      value: ISettings[T]
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
      pick: ["settings.theme"]
    }
  }
)

export default useSettingStore
