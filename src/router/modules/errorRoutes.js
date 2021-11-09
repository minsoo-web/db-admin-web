export default [
  {
    path: "*",
    name: "404",
    component: () => import("@/views/error/404"),
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/error/500"),
  },
]
