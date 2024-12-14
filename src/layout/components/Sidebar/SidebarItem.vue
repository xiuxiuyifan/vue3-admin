<template>
  <!--  没有隐藏的时候才渲染-->
  <template v-if="!item.hidden">
    <!--    alwaysShow 为 true 的时候，就会走 else 去渲染子菜单了-->
    <SidebarItemLink
      v-if="filteredChildren.length <= 1 && !item.alwaysShow"
      :to="singleChildRoute.path"
    >
      <el-menu-item :index="singleChildRoute.path">
        <el-icon v-if="iconName">
          <SvgIcon :icon-name="iconName" />
        </el-icon>
        <template #title>{{ singleChildRoute.title }}</template>
      </el-menu-item>
    </SidebarItemLink>
    <el-sub-menu v-else :index="item.path">
      <template #title>
        <el-icon v-if="iconName">
          <SvgIcon :icon-name="iconName" />
        </el-icon>
        <span>{{ item.title }}</span>
      </template>
      <SidebarItem
        v-for="child in filteredChildren"
        :key="child.path"
        :item="child"
      ></SidebarItem>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import path from "path-browserify"
import { ITreeItemDataWithMenuData } from "@/utils/tree.ts"
import { isExternal } from "@/utils/validate.ts"
// 如果只有一个儿子，则直接渲染这个儿子即可
// 如果菜单对应的 children 有多个，则使用 el-submenu 去渲染， 循环路由的孩子，渲染交给 sidebarItem 递归去渲染
// 递归结束的条件就是 children 的 length 为 0
const { item, basePath } = defineProps<{
  item: ITreeItemDataWithMenuData
}>()
// 取出儿子  并过滤出没有被隐藏的菜单
const filteredChildren = computed(() =>
  (item.children || []).filter((child) => !child.hidden)
)

// 计算单一子节点 ，如果只有一个孩子，则取第 0 个值，否则去当前值
const singleChildRoute = computed(() => {
  return filteredChildren.value.length === 1
    ? filteredChildren.value[0]
    : {
        // 如果不是一个子节点则，需要把上级的路径清空
        ...item
      }
})

// 取出 Icon，如果没有 icon 就用父路由的
const iconName = computed(() => {
  return singleChildRoute.value?.icon || (item && item.icon)
})

// 拼接路径
const resolvePath = (childPath: string) => {
  // 判断如果是外部链接，则直接返回
  if (isExternal(childPath)) {
    return childPath
  }
  return path.join(basePath, childPath)
}
</script>
