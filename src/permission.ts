import router from "@/router"
import nProgress from "nprogress"
import "nprogress/nprogress.css"

import { getToken } from "@/utils/auth.ts"

nProgress.configure({ showSpinner: false })
const whiteList = ["/login"]

router.beforeEach((to) => {
  nProgress.start()
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
