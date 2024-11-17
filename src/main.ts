import { createApp } from "vue"

import router from "./router"
import App from "./App.vue"
import store from "./stores"

// import ElementPlus from "element-plus"
// import "element-plus/dist/index.css"

import "@/style/index.scss"
import "virtual:uno.css"
import "normalize.css/normalize.css"
import installElementPlus from "./plugins/element"
import "./permission"

const app = createApp(App)

// app.use(ElementPlus)
app.use(installElementPlus)
app.use(router)
app.use(store)
app.mount("#app")
//
