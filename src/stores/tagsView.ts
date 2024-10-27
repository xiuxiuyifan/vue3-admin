import { defineStore } from "pinia"
import { RouteLocationNormalizedGeneric } from "vue-router"

export const useTagsView = defineStore("tags", () => {
  // 用来存储所有访问过的
  const visitedViews = ref<RouteLocationNormalizedGeneric[]>([])

  // 添加
  const addView = (view: RouteLocationNormalizedGeneric) => {
    // 判断在之前的里面是否添加过
    const exits = visitedViews.value.some((v) => v.path === view.path)
    if (exits) {
      return
    }
    // 构造新的项
    const newView = {
      ...view,
      title: view.meta.title
    }
    visitedViews.value.push(newView)
  }
  return {
    visitedViews,
    addView
  }
})
