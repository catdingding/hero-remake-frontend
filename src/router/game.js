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
  { path: "", component: Index, meta: { title: "主面板" } },
  { path: "battle-result", component: BattleResult, meta: { title: "戰鬥結果" } },
  { path: "map", component: map, meta: { title: "地圖" } },
  { path: "bag", component: Bag, meta: { title: "背包" } },
  { path: "storage", component: Storage, meta: { title: "倉庫" } },
  { path: "store/:store_type", component: Store, meta: { title: "商店" } },
  { path: "job-change", component: JobChange, meta: { title: "轉職" } },
  { path: "skill-setting", component: SkillSetting, meta: { title: "技能設定" } },
  { path: "ability-learn", component: AbilityLearn, meta: { title: "主面板" } },
  { path: "ability-setting", component: AbilitySetting, meta: { title: "奧義設定" } },
  { path: "alchemy", component: Alchemy, meta: { title: "鍊金" } },
  { path: "send-item-gold", component: SendItemGold, meta: { title: "傳送物品/金錢" } },
  { path: "exercise", component: Exercise, meta: { title: "修煉" } },
  { path: "smith", component: Smith, meta: { title: "鐵匠鋪" } },
  { path: "country/found", component: CountryFound, meta: { title: "建國" } },
  { path: "country/storage", component: CountryStorage, meta: { title: "國庫" } },
  { path: "password-change", component: PasswordChange, meta: { title: "更改密碼" } },
  { path: "country/list", component: CountryList, meta: { title: "國家列表" } },
  { path: "country/join-request", component: CountryJoinRequest, meta: { title: "入國申請" } },
  { path: "country/panel", component: CountryPanel, meta: { title: "國家面板" } },
  { path: "pet-store", component: PetStore, meta: { title: "寵物店" } },
  { path: "exchange-house", component: ExchangeHouse, meta: { title: "兌換屋" } },
];
