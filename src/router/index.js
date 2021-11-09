import Vue from "vue"
import VueRouter from "vue-router"
import Main from "../views/Main.vue"

import { errorRoutes, authRoutes } from "./modules"
import { onlyAuth } from "./routerGuards"

Vue.use(VueRouter)

const routes = [
  ...errorRoutes,
  {
    path: "/",
    name: "Main",
    beforeEnter: onlyAuth,
    component: Main,
  },
  ...authRoutes,
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
