/**
 * 基础路由
 * @type { *[] }
 */

const constantRouterMap = [
  {
    path: "/",
    name: "Example",
    redirect: { name: "login" },
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
    name: "hall",
    component: () => {
      return import("@/views/Hall/index.vue");
    },
  },
  {
    path: "/video",
    name: "video",
    component: () => {
      return import("@/views/Video/index.vue");
    },
  },
];

export default constantRouterMap;
