import Vue from "vue"
import VueRouter from "vue-router"
import Main from "../views/Main.vue"

import { errorRoutes, authRoutes } from "./modules"

Vue.use(VueRouter)

const routes = [
  ...errorRoutes,
  {
    path: "/",
    name: "Main",

    component: Main,
    redirect: "/manage-commuting",
    children: [
      {
        // 고충신고
        path: "/manage-commuting",
        name: "ManageCommuting",
        component: () => import("@/views/ManageCommuting.vue"),
      },
      {
        // 고충신고
        path: "/voice-of-customer",
        name: "VoiceOfCustomer",
        component: () => import("@/views/VoiceOfCustomer.vue"),
      },
      {
        // 휴가 신청 및 관리
        path: "/vacation",
        name: "Vacation",
        component: () => import("@/views/Vacation.vue"),
      },
      {
        // 휴가 신청 및 관리
        path: "/manage-movie",
        name: "ManageMovie",
        component: () => import("@/views/ManageMovie.vue"),
      },
      {
        // 휴가 신청 및 관리
        path: "/manage-movie-date",
        name: "ManageMovieDate",
        component: () => import("@/views/ManageMovieDate.vue"),
      },
      {
        // 비품 관리
        path: "/manage-product",
        name: "ManageProduct",
        component: () => import("@/views/ManageProduct.vue"),
      },
    ],
  },
  ...authRoutes,
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
