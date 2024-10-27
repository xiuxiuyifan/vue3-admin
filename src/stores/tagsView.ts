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

  // 删除 view
  const deleteView = (path: string) => {
    // 先在访问过的里面找一下 index
    const index = visitedViews.value.findIndex((v) => v.path === path)
    if (~index) {
      visitedViews.value.splice(index, 1)
    }
  }
  return {
    visitedViews,
    addView,
    deleteView
  }
})
