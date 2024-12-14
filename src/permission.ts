import router from "@/router"
import nProgress from "nprogress"
import "nprogress/nprogress.css"

import { getToken } from "@/utils/auth.ts"
import { getPermission, getUserInfo } from "@/api/user.ts"
import { useUserStore } from "@/stores/user.ts"
import { generateMenu } from "@/utils"

nProgress.configure({ showSpinner: false })
const whiteList = ["/login"]

router.beforeEach(async (to) => {
  nProgress.start()
  const userStore = useUserStore()
  // 根据 token 判断是否登录过了
  const token = getToken()
  if (token) {
    // 如果登录过了，还访问登录页面
    if (to.path === "/login") {
      nProgress.done()
      return {
        path: "/",
        replace: true
      }
    } else {
      // 正常进入页面
      // 判断有没有用户信息
      if (userStore.state.userInfo) {
        nProgress.done()
        return true
      } else {
        try {
          const permissionRes = await getPermission()
          const { menu, userInfo } = permissionRes.data

          // 根据菜单信息 生成路由配置表信息
          const menuTree = generateMenu(menu)
          userStore.setPermission(menuTree, userInfo)
        } catch (e) {
          console.log(e)
        }
      }
    }
    // 如果不是登录页
    nProgress.done()
    return true
  } else {
    // 没有登录过，
    // 在白名单里面就去白名单的页面
    if (whiteList.includes(to.path)) {
      nProgress.done()
      return true
    }
    nProgress.done()
    // 否则就去登录页面
    return {
      path: "/login",
      redirect: to.path,
      ...to.query
    }
  }
})

router.afterEach(() => {
  nProgress.done()
})
