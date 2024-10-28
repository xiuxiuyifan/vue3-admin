<script setup lang="ts">
import { useTagsView } from "@/stores/tagsView.ts"
import { storeToRefs } from "pinia"
import { TabPaneName } from "element-plus"
import { RouteLocationNormalizedGeneric, RouteRecordRaw } from "vue-router"
import path from "path-browserify"
import { routes } from "@/router"

const route = useRoute()
const router = useRouter()
// const closeSelectedTag = (tag: RouteLocationNormalizedGeneric) => {}
const tagsViewStore = useTagsView()
const { visitedViews } = storeToRefs(tagsViewStore)
const { deleteView, addView, delCachedView, delAllView, delOtherView } =
  tagsViewStore
const activeTab = ref("")
// 添加 tag
const addTags = () => {
  const { name, path } = route // 只有有 name 的路由才保存
  if (name) {
    // 路由变化之后当前路由就是激活的 tab
    activeTab.value = path as string
    tagsViewStore.addView(route)
  }
}

// 判断是否激活
const isActive = (path: string) => path === route.path

const removeTab = (name: TabPaneName) => {
  // 如果删掉的是当前激活的 需要导航到当前 list 中的最后一个
  const index = visitedViews.value.findIndex((item) => item.path === name)
  deleteView(name as string)

  if (isActive(name as string)) {
    if (~index) {
      const prevIndex = index - 1
      if (prevIndex >= 0) {
        const path = visitedViews.value[prevIndex].path
        router.push(path)
      } else {
        router.push("/")
      }
    }
  }
}
// 初始化 tag ，根据路由将默认值添加到数组中
const initTags = () => {
  // 先将固定的 tags 加入到数组中
  const affixTags = filterAffixTags(routes)
  affixTags.forEach((tag) => {
    addView(tag)
  })
  addTags()
}

const handleTabChange = (name: TabPaneName) => {
  router.push({
    path: name as string
  })
}

//判断路由是否是固定路由
const isAffix = (tag: RouteLocationNormalizedGeneric): boolean => {
  return !!tag.meta.affix
}

// 计算出路由中的固定路由
const filterAffixTags = (
  routes: RouteRecordRaw[],
  basePath = "/"
): RouteLocationNormalizedGeneric[] => {
  const tags: RouteLocationNormalizedGeneric[] = []
  // 遍历路由信息
  for (const route of routes) {
    // 检测
    if (route.meta?.affix) {
      const tagPath = path.join(basePath, route.path)
      tags.push({
        name: route.name,
        path: tagPath,
        meta: { ...route.meta }
      } as RouteLocationNormalizedGeneric)
    }
    // 判断有孩子的话递归处理
    if (route.children) {
      tags.push(...filterAffixTags(route.children, route.path))
    }
  }
  return tags
}

// 页面初始化加载完成
onMounted(() => {
  initTags()
})
// 监听路由变化、之后添加新的 tag 到访问过的记录里面去
watch(
  () => route.path,
  () => {
    addTags()
  },
  {
    immediate: true
  }
)

const enum CommandType {
  ALL = "all",
  Other = "other",
  Self = "self",
  Refresh = "refresh"
}

const handleCommand = (
  command: CommandType,
  view: RouteLocationNormalizedGeneric
) => {
  switch (command) {
    case CommandType.ALL:
      delAllView()
      break
    case CommandType.Other:
      delOtherView(view)
      break
    case CommandType.Self:
      // 删除当前的
      removeTab(view.path)
      break
    case CommandType.Refresh:
      // 专门做刷新的一个路由，再通过这个路由跳转回来
      delCachedView(view) // 清空 tagsview 里面的 缓存
      // 跳转到刷新路由的页面
      router.push("/redirect" + view.path)
      break
  }
}
</script>

<template>
  <div class="tags-view-container">
    <el-tabs
      v-model="activeTab"
      type="card"
      @tab-remove="removeTab"
      @tab-change="handleTabChange"
    >
      <el-tab-pane
        v-for="tag in visitedViews"
        :key="tag.path"
        :label="tag.meta.title"
        :name="tag.path"
        :closable="!isAffix(tag)"
      >
        <template v-slot:label>
          <el-dropdown
            placement="top-start"
            trigger="contextmenu"
            @command="(command) => handleCommand(command, tag)"
          >
            <span>{{ tag.meta.title }}</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                <el-dropdown-item command="self" v-if="!tag.meta.affix"
                  >关闭</el-dropdown-item
                >
                <el-dropdown-item command="refresh">刷新</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.tags-view-container {
  @apply w-full overflow-hidden  h-[var(--tagsview-height)] shadow-sm shadow-gray-300 bg-gray-100;
}
.tags-view-item {
  @apply inline-block h-28px leading-28px border-solid border-gray px-3px mx-3px box-border text-black;
  &.active {
    @apply text-sky border-sky;
    &::before {
      content: "";
      @apply inline-block w-8px h-8px rounded-full bg-white mr-3px;
    }
  }
}
</style>
