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

// 白名单里面的 不设置父级 路由信息
export const generateRouter = () => {}
