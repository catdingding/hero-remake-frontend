import Index from "@/views/game/Index.vue";
import BattleResult from "@/views/game/BattleResult.vue";
import map from "@/views/game/Map.vue";
import PasswordChange from "@/views/game/PasswordChange.vue";
import Log from "@/views/game/Log.vue";
import ChangeLog from "@/views/game/ChangeLog.vue";
import BattleResultList from "@/views/game/BattleResultList.vue";
import AbilityList from "@/views/game/AbilityList.vue";
import SkillList from "@/views/game/SkillList.vue";
import PetList from "@/views/game/PetList.vue";
import About from "@/views/game/About.vue";
import Ranking from "@/views/game/Ranking.vue";

import chara_routers from "./chara";
import country_routers from "./country";
import town_routers from "./town";
import team_routers from "./team";
import ugc_routers from "./ugc";

export default [
  ...chara_routers,
  ...country_routers,
  ...town_routers,
  ...team_routers,
  ...ugc_routers,
  { path: "", component: Index, meta: { title: "主面板" } },
  { path: "battle-result", component: BattleResult, meta: { title: "戰鬥結果" } },
  { path: "map", component: map, meta: { title: "地圖" } },
  { path: "password-change", component: PasswordChange, meta: { title: "更改密碼" } },

  { path: "log", component: Log, meta: { title: "事件查詢" } },
  { path: "change-log", component: ChangeLog, meta: { title: "更新日誌" } },
  { path: "battle-result-list", component: BattleResultList, meta: { title: "戰鬥記錄" } },
  { path: "ability-list", component: AbilityList, meta: { title: "奧義列表" } },
  { path: "skill-list", component: SkillList, meta: { title: "技能列表" } },
  { path: "pet-list", component: PetList, meta: { title: "寵物列表" } },
  { path: "about", component: About, meta: { title: "關於" } },
  { path: "ranking", component: Ranking, meta: { title: "排行榜" } },
];
