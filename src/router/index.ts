import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Layout from "@/layout/index.vue"
import Login from "@/views/login/index.vue"

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: Login,
    meta: {
      hidden: true // 配置为隐藏路由
    }
  },
  // 默认的 /home 组件
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: []
  },
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        // 跳转到 /redirect/a/b/c/d?query=1
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  }
]

const asyncRoutes: Array<RouteRecordRaw> = [
  // {
  //   path: "/documentation",
  //   component: Layout,
  //   redirect: "/documentation/index",
  //   children: [
  //     {
  //       path: "index",
  //       name: "documentation",
  //       component: () => import("@/views/documentation/index.vue"),
  //       meta: {
  //         icon: "ant-design:database-filled",
  //         title: "documentation"
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: "/guide",
  //   component: Layout,
  //   redirect: "/guide/index",
  //   children: [
  //     {
  //       path: "index",
  //       name: "guide",
  //       component: () => import("@/views/guide/index.vue"),
  //       meta: {
  //         icon: "ant-design:car-twotone",
  //         title: "guide"
  //         // activeMenu: "/documentation/index"
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: "/system",
  //   component: Layout,
  //   redirect: "/system/menu",
  //   meta: {
  //     icon: "ant-design:unlock-filled",
  //     title: "system"
  //     // alwaysShow: true
  //   },
  //   children: [
  //     {
  //       path: "menu",
  //       name: "menu",
  //       component: () => import("@/views/system/menu/index.vue"),
  //       meta: {
  //         icon: "ant-design:unlock-filled",
  //         title: "menu"
  //       }
  //     },
  //     {
  //       path: "role",
  //       name: "role",
  //       component: () => import("@/views/system/role/index.vue"),
  //       meta: {
  //         icon: "ant-design:unlock-filled",
  //         title: "role"
  //       }
  //     },
  //     {
  //       path: "user",
  //       name: "user",
  //       component: () => import("@/views/system/user/index.vue"),
  //       meta: {
  //         icon: "ant-design:unlock-filled",
  //         title: "user"
  //       }
  //     }
  //   ]
  // },
  // // 添加外部路由链接
  // {
  //   path: "/external-link",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "https://www.baidu.com",
  //       redirect: "/",
  //       meta: {
  //         title: "External Link",
  //         icon: "ant-design:link-outline"
  //       }
  //     }
  //   ]
  // }
]

// 静态路由和动态路由进行合并
export const routes = [...constantRoutes, ...asyncRoutes]
export default createRouter({
  history: createWebHashHistory(),
  routes
})
