import { defineStore } from "pinia"
import { RouteLocationNormalizedGeneric, RouteRecordName } from "vue-router"

export const useTagsView = defineStore("tags", () => {
  // 用来存储所有访问过的
  const visitedViews = ref<RouteLocationNormalizedGeneric[]>([])

  // 记录需要缓存的页面
  const cachedViews = ref<RouteRecordName[]>([])

  // 添加
  const addView = (view: RouteLocationNormalizedGeneric) => {
    // 判断在之前的里面是否添加过
    const exits = visitedViews.value.some((v) => v.path === view.path)
    addCachedView(view)
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
    const view = visitedViews.value[index]
    delCachedView(view)
  }

  // 添加需要缓存的 name 的组件
  const addCachedView = (view: RouteLocationNormalizedGeneric) => {
    if (cachedViews.value.includes(view.name)) {
      return
    }
    // 如果需要缓存
    if (!view.meta.noCache) {
      cachedViews.value.push(view.name)
    }
  }

  // 删除需要缓存的组件
  const delCachedView = (view: RouteLocationNormalizedGeneric) => {
    const index = cachedViews.value.indexOf(view.name)
    if (~index) {
      cachedViews.value.splice(index, 1)
    }
  }
  return {
    visitedViews,
    addView,
    deleteView,
    cachedViews,
    addCachedView,
    delCachedView
  }
})
