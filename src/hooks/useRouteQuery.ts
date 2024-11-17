import { LocationQuery } from "vue-router"

interface RouteQuery {
  redirect: Ref<string>
  otherQuery: Ref<LocationQuery | undefined>
}

// 获取 url query 并得到 redirect 参数 redirect 参数作为登录成功后跳转的路径
export const useRouteQuery = (): RouteQuery => {
  const route = useRoute()
  const query = route.query

  // 重定向的路径
  const redirect = ref("")
  const otherQuery = ref({})

  const getOtherQuery = (query: LocationQuery) => {
    return Object.keys(query || {})
      .filter((q) => q !== "redirect")
      .reduce((obj, key) => {
        obj[key] = query[key]
        return obj
      }, {} as LocationQuery)
  }
  // 获取其他路径参数
  otherQuery.value = getOtherQuery(query)

  // 响应式依赖发生变化了之后重新运行该函数
  watchEffect(() => {
    const query = route.query
    if (query) {
      redirect.value = query.redirect as string
      otherQuery.value = getOtherQuery(query)
    }
  })

  return {
    redirect,
    otherQuery
  }
}
