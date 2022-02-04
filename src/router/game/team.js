import TeamList from "@/views/game/team/TeamList.vue";
import TeamJoinRequest from "@/views/game/team/TeamJoinRequest.vue";
import TeamFound from "@/views/game/team/TeamFound.vue";
import TeamPanel from "@/views/game/team/TeamPanel.vue";

export default [
  { path: "team/list", component: TeamList, meta: { title: "隊伍列表" } },
  { path: "team/join-request", component: TeamJoinRequest, meta: { title: "入隊申請審查" } },
  { path: "team/found", component: TeamFound, meta: { title: "建立隊伍" } },
  { path: "team/panel", component: TeamPanel, meta: { title: "隊伍面板" } },
];
