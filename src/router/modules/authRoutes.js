export default [
  {
    path: "/auth",
    component: () => import("../../views/auth/AuthIndex.vue"),

    children: [
      {
        path: "sign-in",
        name: "SignIn",
        component: () => import("../../views/auth/SignIn.vue"),
      },
      {
        path: "sign-up",
        name: "SignUp",
        component: () => import("../../views/auth/SignUp.vue"),
      },
    ],
  },
]
