import "vue-router"

declare module "vue-router" {
  interface RouteMeta {
    title?: string // 路由 title
    icon?: string // 路由 icon
  }
}
