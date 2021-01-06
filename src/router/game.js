import Index from "@/views/game/Index.vue";
import BattleResult from "@/views/game/BattleResult.vue";
import map from "@/views/game/Map.vue";
import Bag from "@/views/game/Bag.vue";
import Storage from "@/views/game/Storage.vue";
import Store from "@/views/game/Store.vue";
import JobChange from "@/views/game/JobChange.vue";
import SkillSetting from "@/views/game/SkillSetting.vue";
import AbilityLearn from "@/views/game/AbilityLearn.vue";
import AbilitySetting from "@/views/game/AbilitySetting.vue";
import Alchemy from "@/views/game/Alchemy.vue";

export default [
  { path: "", component: Index },
  { path: "battle-result", component: BattleResult },
  { path: "map", component: map },
  { path: "bag", component: Bag },
  { path: "storage", component: Storage },
  { path: "store/:store_type", component: Store },
  { path: "job-change", component: JobChange },
  { path: "skill-setting", component: SkillSetting },
  { path: "ability-learn", component: AbilityLearn },
  { path: "ability-setting", component: AbilitySetting },
  { path: "alchemy", component: Alchemy }
];
