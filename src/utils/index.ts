import Layout from "@/layout/index.vue"
const modules = import.meta.glob("../views/**")

export const generateMenu = (list) => {
  const menu = []
  const map = {}

  // 先把数据用 map 映射起来
  list.forEach((item) => {
    map[item.id] = { ...item, children: [] }
  })

  // 再遍历列表数据
  list.forEach((item) => {
    if (item.parent_id == null) {
      menu.push(map[item.id])
    } else {
      // 给 map 里面的对象找儿子
      // 有 parent_id 说明是儿子
      map[item.parent_id].children.push(map[item.id])
    }
  })
  return menu
}

function convertString(str) {
  // 去除字符串开头和结尾的斜杠（如果有的话）
  str = str.replace(/^\/|\/$/g, "")
  // 使用split方法按照斜杠分割字符串，得到一个数组
  const parts = str.split("/")
  // 使用map方法将数组中的每个元素进行首字母大写转换，其余字母小写转换
  const capitalizedParts = parts.map((part) => {
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
  })
  // 使用join方法将处理后的数组元素拼接成一个字符串，中间无分隔符
  return capitalizedParts.join("")
}

// 白名单里面的 不设置父级 路由信息
export const generateRouter = (menu) => {
  let routers = []

  // 把孩子节点都拿出来放在一起
  function genChildrenRoute(children) {
    let result: any = []
    for (let i = 0; i < children.length; i++) {
      let child = children[i]
      result.push({
        path: child.path,
        name: convertString(child.path),
        meta: {
          title: child.title,
          keepAlive: child.keep_alive
        },
        component: resolveComponent(child.component_path)
      })
      if (child.children && child.children.length > 0) {
        genChildrenRoute(child.children)
      }
    }
    return result
  }

  menu.forEach((item) => {
    // 计算出 把子节点扁平化
    const children = genChildrenRoute(item.children)
    // 如果是 父级菜单，并且 没有孩子的情况下，也要将当前 路径生成路由信息
    if (item.type == 0 && item.children.length === 0) {
      const itemRoute = {
        path: item.path,
        name: convertString(item.path),
        meta: {
          title: item.title,
          keepAlive: item.keep_alive
        },
        component: resolveComponent(item.component_path)
      }
      children.push(itemRoute)
    }
    routers.push({
      path: item.path,
      name: convertString(item.path),
      meta: {
        title: item.title,
        keepAlive: item.keep_alive
      },
      component: Layout,
      children: children
    })
  })
  console.log(routers)
  return routers
}
function resolveComponent(path: string) {
  const importPage = modules[`../views${path}.vue`]
  return importPage
}
