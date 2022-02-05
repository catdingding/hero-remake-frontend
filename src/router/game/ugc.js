import UGCDungeonList from "@/views/game/ugc/UGCDungeonList.vue";
import UGCPanel from "@/views/game/ugc/UGCPanel";

export default [
  { path: "ugc/panel", component: UGCPanel, meta: { title: "管理面板" } },
  { path: "ugc/dungeon-list", component: UGCDungeonList, meta: { title: "地城列表" } },
];
