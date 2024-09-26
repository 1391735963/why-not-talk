/**
 * 基础路由
 * @type { *[] }
 */

const constantRouterMap = [
  {
    path: "/",
    name: "Example",
    redirect: { name: "login" },
    children: [
      {
        path: "/call",
        name: "call",
        component: () => import("@/views/Call/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => {
      return import("@/views/Login/index.vue");
    },
  },
  {
    path: "/hall",
    component: () => {
      return import("@/views/Hall/index.vue");
    },
  },
];

export default constantRouterMap;
