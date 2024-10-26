import "vue-router"

declare module "vue-router" {
  interface RouteMeta {
    title?: string // 路由 title
    icon?: string // 路由 icon
    hidden?: boolean // 是否隐藏路由
    alwaysShow?: boolean
    breadcrumb?: boolean
    activeMenu?: string // 标识激活的菜单路径
    affix?: boolean
    noCache?: boolean
  }
}
