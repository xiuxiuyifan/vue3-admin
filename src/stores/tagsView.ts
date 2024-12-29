import { defineStore } from "pinia"
import { RouteLocationNormalizedGeneric, RouteRecordName } from "vue-router"

export const useTagsView = defineStore("tags", () => {
  // 用来存储所有访问过的
  const visitedViews = ref<RouteLocationNormalizedGeneric[]>([])

  // 缓存访问过的页面的 name 的集合
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
    const view = { ...visitedViews.value[index] }
    if (~index) {
      visitedViews.value.splice(index, 1)
    }
    delCachedView(view)
  }

  // 添加需要缓存的 name 的组件
  const addCachedView = (view: RouteLocationNormalizedGeneric) => {
    if (cachedViews.value.includes(view.name)) {
      return
    }
    // 如果需要缓存
    if (view.meta.keepAlive) {
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

  const delAllView = () => {
    //删除掉访问过的所有 tags ，并清空缓存
    visitedViews.value = visitedViews.value.filter((view) => view.meta.affix)
    cachedViews.value = []
  }

  // 删除其他 tags
  const delOtherView = (view: RouteLocationNormalizedGeneric) => {
    // 删除访问过的里面的数据，和要缓存的容器里面的数据
    visitedViews.value = visitedViews.value.filter(
      // 保留固定的或者自己本身
      (v) => v.meta.affix || v.path === view.path
    )
    cachedViews.value = cachedViews.value.filter((name) => name !== view.name)
  }
  return {
    visitedViews,
    addView,
    deleteView,
    cachedViews,
    addCachedView,
    delCachedView,
    delAllView,
    delOtherView
  }
})
