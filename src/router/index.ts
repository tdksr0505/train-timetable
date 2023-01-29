import { createRouter, createWebHistory } from "vue-router";
import LiveBoardView from "../views/LiveBoardView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LiveBoardView,
    },
    {
      path: "/date-query",
      name: "dateQuery",
      component: () => import("../views/DateQueryView.vue"),
    },
  ],
});

export default router;
