<script setup lang="ts">
import { RouteLocationMatched } from "vue-router"
import { compile } from "path-to-regexp"

const route = useRoute()
const router = useRouter()

type PartialRouteLocationMatched = Partial<RouteLocationMatched>
const levelList = ref<PartialRouteLocationMatched[]>([])

// 判断是不是 dashboard 路由
const isDashboard = (route: PartialRouteLocationMatched): boolean => {
  return route.path === "/dashboard"
}

const getBreadcrumb = () => {
  // 有 title 属性才能展示面包屑
  let matched = route.matched.filter(
    (item) => item.meta.title
  ) as PartialRouteLocationMatched[]
  // 第一个不是 dashboard 则需要在前面加上 dashboard
  if (!isDashboard(matched[0])) {
    matched = [
      {
        path: "/dashboard",
        meta: {
          title: "dashboard"
        }
      },
      ...matched
    ]
  }
  // 过滤掉 breadcrumb 为false 的
  levelList.value = matched.filter((item) => {
    return item.meta?.breadcrumb !== false
  })
}

watch(() => route.path, getBreadcrumb, {
  immediate: true
})

const pathCompile = (path: string) => {
  const toPath = compile(path)
  const params = route.params
  return toPath(params)
}

const handleLink = (route: PartialRouteLocationMatched) => {
  const { path, redirect } = route
  // 如果是重定向，就走重定向的路由
  if (redirect) {
    router.push(redirect as string)
    return
  }
  router.push(pathCompile(path!))
}
</script>

<template>
  <el-breadcrumb separator="/" leading-50px text-14px ml-18px>
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <!--      如果不是最后一个，则其他的都需要添加点击事件-->
      <span v-if="index === levelList.length - 1" cursor-text>
        {{ item.meta?.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">
        {{ item.meta?.title }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss"></style>
