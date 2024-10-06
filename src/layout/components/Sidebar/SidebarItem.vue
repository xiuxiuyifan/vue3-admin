<template>
  <el-menu-item v-if="filteredChildren.length <= 1" :index="item.path">
    <el-icon v-if="iconName">
      <SvgIcon :icon-name="iconName" />
    </el-icon>
    <template #title>{{ singleChildRoute.meta?.title }}</template>
  </el-menu-item>
  <el-sub-menu v-else :index="item.path">
    <template #title>
      <el-icon v-if="iconName">
        <SvgIcon :icon-name="iconName" />
      </el-icon>
      <span>{{ item.meta?.title }}</span>
    </template>
    <SidebarItem
      v-for="child in filteredChildren"
      :key="child.path"
      :item="child"
    ></SidebarItem>
  </el-sub-menu>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from "vue-router"
// 如果只有一个儿子，则直接渲染这个儿子即可
// 如果菜单对应的 children 有多个，则使用 el-submenu 去渲染， 循环路由的孩子，渲染交给 sidebarItem 递归去渲染
// 递归结束的条件就是 children 的 length 为 0
const { item } = defineProps<{
  item: RouteRecordRaw
}>()
// 取出儿子
const filteredChildren = computed(() => item.children || [])

// 计算单一子节点 ，如果只有一个孩子，则取第 0 个值，否则去当前值
const singleChildRoute = computed(() => {
  return filteredChildren.value.length === 1 ? filteredChildren.value[0] : item
})

// 取出 Icon，如果没有 icon 就用父路由的
const iconName = computed(() => {
  return singleChildRoute.value.meta?.icon || (item.meta && item.meta.icon)
})
</script>
