import CountryList from "@/views/game/country/CountryList.vue";
import CountryJoinRequest from "@/views/game/country/CountryJoinRequest.vue";
import CountryFound from "@/views/game/country/CountryFound.vue";
import CountryStorage from "@/views/game/country/CountryStorage.vue";
import CountryPanel from "@/views/game/country/CountryPanel.vue";
import CountryLocationControl from "@/views/game/country/CountryLocationControl.vue";
import CountryTownBuild from "@/views/game/country/CountryTownBuild.vue";

export default [
  { path: "country/found", component: CountryFound, meta: { title: "建國" } },
  { path: "country/storage", component: CountryStorage, meta: { title: "國庫" } },
  { path: "country/list", component: CountryList, meta: { title: "國家列表" } },
  { path: "country/join-request", component: CountryJoinRequest, meta: { title: "入國申請" } },
  { path: "country/panel", component: CountryPanel, meta: { title: "國家面板" } },
  { path: "country/location-control", component: CountryLocationControl, meta: { title: "領土管理" } },
  { path: "country/town-build", component: CountryTownBuild, meta: { title: "建立城鎮" } },
];
