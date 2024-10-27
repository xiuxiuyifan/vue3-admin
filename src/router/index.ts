import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Layout from "@/layout/index.vue"

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "dashboard",
          icon: "ant-design:windows-filled",
          affix: true,
          noCache: true
        }
      }
    ]
  }
]

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/documentation",
    component: Layout,
    redirect: "/documentation/index",
    children: [
      {
        path: "index",
        name: "documentation",
        component: () => import("@/views/documentation/index.vue"),
        meta: {
          icon: "ant-design:database-filled",
          title: "documentation"
        }
      }
    ]
  },
  {
    path: "/guide",
    component: Layout,
    redirect: "/guide/index",
    children: [
      {
        path: "index",
        name: "guide",
        component: () => import("@/views/guide/index.vue"),
        meta: {
          icon: "ant-design:car-twotone",
          title: "guide"
          // activeMenu: "/documentation/index"
        }
      }
    ]
  },
  {
    path: "/system",
    component: Layout,
    redirect: "/system/menu",
    meta: {
      icon: "ant-design:unlock-filled",
      title: "system"
      // alwaysShow: true
    },
    children: [
      {
        path: "menu",
        name: "menu",
        component: () => import("@/views/system/menu.vue"),
        meta: {
          icon: "ant-design:unlock-filled",
          title: "menu"
        }
      },
      {
        path: "role",
        name: "role",
        component: () => import("@/views/system/role.vue"),
        meta: {
          icon: "ant-design:unlock-filled",
          title: "role"
        }
      },
      {
        path: "user",
        name: "user",
        component: () => import("@/views/system/user.vue"),
        meta: {
          icon: "ant-design:unlock-filled",
          title: "user"
        }
      }
    ]
  },
  // 添加外部路由链接
  {
    path: "/external-link",
    component: Layout,
    children: [
      {
        path: "https://www.baidu.com",
        redirect: "/",
        meta: {
          title: "External Link",
          icon: "ant-design:link-outline"
        }
      }
    ]
  }
]

// 静态路由和动态路由进行合并
export const routes = [...constantRoutes, ...asyncRoutes]
export default createRouter({
  history: createWebHashHistory(),
  routes
})
