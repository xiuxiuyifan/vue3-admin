import { createRouter, createWebHashHistory } from "vue-router"

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/home",
      component: () => import("../views/Home.vue")
    },
    {
      path: "/about",
      component: () => import("../views/About.vue")
    }
  ]
})
