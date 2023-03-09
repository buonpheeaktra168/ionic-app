import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import LoginScreen from "@/views/auth/LoginScreen.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: LoginScreen,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/RegisterPage.vue"),
  },
  {
    path: "/tabs",
    component: () => import("@/views/bottomTab/BottonTab.vue"),
    children: [
      {
        path: "",
        redirect: "/home",
      },
      {
        path: "/home",
        component: () => import("@/views/home/view/HomeScreen.vue"),
      },
      {
        path: "/book",
        component: () => import("@/views/books/BookScreen.vue"),
      },
      {
        path: "/video",
        component: () => import("@/views/videos/VideoScreen.vue"),
      },
      {
        path: "/account",
        component: () => import("@/views/account/AccountScreen.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
