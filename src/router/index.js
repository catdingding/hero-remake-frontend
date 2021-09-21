import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Game from "@/views/Game.vue";
import Chat from "@/views/Chat.vue";

import game_children from "./game";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    meta: { title: "首頁" },
  },
  {
    path: "/game",
    component: Game,
    meta: { title: "主面板" },
    children: game_children,
  },
  {
    path: "/chat",
    component: Chat,
    meta: { title: "聊天室" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = `${to.meta.title}-無限冒險重製版`;
  });
});

export default router;
