import Index from "@/views/game/Index.vue";
import BattleResult from "@/views/game/BattleResult.vue";
import map from "@/views/game/Map.vue";
import Bag from "@/views/game/Bag.vue";
import Storage from "@/views/game/Storage.vue";
import Store from "@/views/game/Store.vue";
import ExchangeHouse from "@/views/game/ExchangeHouse.vue";
import JobChange from "@/views/game/JobChange.vue";
import SkillSetting from "@/views/game/SkillSetting.vue";
import AbilityLearn from "@/views/game/AbilityLearn.vue";
import AbilitySetting from "@/views/game/AbilitySetting.vue";
import Alchemy from "@/views/game/Alchemy.vue";
import SendItemGold from "@/views/game/SendItemGold.vue";
import Exercise from "@/views/game/Exercise.vue";
import Smith from "@/views/game/Smith.vue";
import PetStore from "@/views/game/PetStore.vue";
import PasswordChange from "@/views/game/PasswordChange.vue";

import CountryList from "@/views/game/CountryList.vue";
import CountryJoinRequest from "@/views/game/CountryJoinRequest.vue";
import CountryFound from "@/views/game/CountryFound.vue";
import CountryStorage from "@/views/game/CountryStorage.vue";

import CountryPanel from "@/views/game/CountryPanel.vue";

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
  { path: "alchemy", component: Alchemy },
  { path: "send-item-gold", component: SendItemGold },
  { path: "exercise", component: Exercise },
  { path: "smith", component: Smith },
  { path: "country/found", component: CountryFound },
  { path: "country/storage", component: CountryStorage },
  { path: "password-change", component: PasswordChange },
  { path: "country/list", component: CountryList },
  { path: "country/join-request", component: CountryJoinRequest },
  { path: "country/panel", component: CountryPanel },
  { path: "pet-store", component: PetStore },
  { path: "exchange-house", component: ExchangeHouse },
];
