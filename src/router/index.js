import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/Layout/index.vue";
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("../views/login/login.vue"),
      meta: {
        title: "登录",
        hidden: true,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/login/login.vue"),
      meta: {
        title: "登录",
        hidden: true,
      },
    },
    {
      path: "/dataManagement",
      name: "dataManagement",
      redirect: "/dataManagement/data-management",
      component: Layout,
      meta: {
        title: "数据管理",
        hidden: false,
        type: "data-management",
        code: "C001",
      },
      children: [
        {
          path: "data-management",
          name: "dataManagement",
          component: () =>
            import("../views/data-management/data-management.vue"),
          meta: {
            title: "数据管理",
          },
        },
      ],
    },
  ],
});

export default router;
