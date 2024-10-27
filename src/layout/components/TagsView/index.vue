<script setup lang="ts">
import { useTagsView } from "@/stores/tagsView.ts"
import { storeToRefs } from "pinia"
// import { RouteLocationNormalizedGeneric } from "vue-router"
import { TabPaneName } from "element-plus"

const route = useRoute()
const router = useRouter()
// const closeSelectedTag = (tag: RouteLocationNormalizedGeneric) => {}
const tagsViewStore = useTagsView()
const { visitedViews } = storeToRefs(tagsViewStore)
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
// const isActive = (tag: RouteLocationNormalizedGeneric) =>
//   tag.path === route.path

const removeTab = () => {}
// 初始化 tag ，根据路由将默认值添加到数组中
const initTags = () => {
  addTags()
}

const handleTabChange = (name: TabPaneName) => {
  console.log(name)
  router.push({
    path: name as string
  })
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
</script>

<template>
  <div class="tags-view-container">
    <el-tabs
      v-model="activeTab"
      type="card"
      closable
      @tab-remove="removeTab"
      @tab-change="handleTabChange"
    >
      <el-tab-pane
        v-for="tag in visitedViews"
        :key="tag.path"
        :label="tag.meta.title"
        :name="tag.path"
      >
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
