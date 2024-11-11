import useSettingStore from "@/stores/settings.ts"
import { generateColors, setColors } from "@/utils/color.ts"

export const useGenerateTheme = () => {
  const settingStore = useSettingStore()

  // 当主题发生变化了之后
  watch(
    () => settingStore.settings.theme,
    (newVal: string, oldValue) => {
      if (newVal !== oldValue) {
        // 则说明主题颜色发生了变化
        const colors = {
          primary: settingStore.settings.theme,
          ...generateColors(settingStore.settings.theme)
        }
        // 改变 css 样式中的变量
        setColors(colors)
      }
    },
    // 一开始就执行一次
    {
      immediate: true
    }
  )
}
