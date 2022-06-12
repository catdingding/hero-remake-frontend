import Bag from "@/views/game/chara/Bag.vue";
import Farm from "@/views/game/chara/Farm.vue";
import JobChange from "@/views/game/chara/JobChange.vue";
import SkillSetting from "@/views/game/chara/SkillSetting.vue";
import AbilityLearn from "@/views/game/chara/AbilityLearn.vue";
import AbilitySetting from "@/views/game/chara/AbilitySetting.vue";
import Alchemy from "@/views/game/chara/Alchemy.vue";
import SendItemGold from "@/views/game/chara/SendItemGold.vue";
import Exercise from "@/views/game/chara/Exercise.vue";
import PvP from "@/views/game/chara/PvP.vue";
import EquipmentLock from "@/views/game/chara/EquipmentLock.vue";
import MemberShop from "@/views/game/chara/MemberShop.vue";
import BattleMapTicketToItem from "@/views/game/chara/BattleMapTicketToItem.vue";
import Parcel from "@/views/game/chara/Parcel.vue";
import CharaAchievementTypeList from "@/views/game/chara/CharaAchievementTypeList.vue";
import CharaSetting from "@/views/game/chara/CharaSetting";
import Home from "@/views/game/chara/Home";
import Adventure from "@/views/game/chara/Adventure";

export default [
  { path: "chara/bag", component: Bag, meta: { title: "背包" } },
  { path: "chara/job-change", component: JobChange, meta: { title: "轉職" } },
  { path: "chara/skill-setting", component: SkillSetting, meta: { title: "技能設定" } },
  { path: "chara/ability-learn", component: AbilityLearn, meta: { title: "奧義學習" } },
  { path: "chara/ability-setting", component: AbilitySetting, meta: { title: "奧義設定" } },
  { path: "chara/alchemy", component: Alchemy, meta: { title: "鍊金" } },
  { path: "chara/farm", component: Farm, meta: { title: "農場" } },
  { path: "chara/send-item-gold", component: SendItemGold, meta: { title: "傳送物品/金錢" } },
  { path: "chara/parcel", component: Parcel, meta: { title: "包裹" } },
  { path: "chara/exercise", component: Exercise, meta: { title: "修煉" } },
  { path: "chara/pvp", component: PvP, meta: { title: "PvP" } },
  { path: "chara/equipment-lock", component: EquipmentLock, meta: { title: "裝備綁定" } },
  { path: "chara/member-shop", component: MemberShop, meta: { title: "贊助商店" } },
  { path: "chara/battle-map-ticket-to-item", component: BattleMapTicketToItem, meta: { title: "地圖製作" } },
  { path: "chara/achievement-types", component: CharaAchievementTypeList, meta: { title: "成就" } },
  { path: "chara/setting", component: CharaSetting, meta: { title: "設定" } },
  { path: "chara/home", component: Home, meta: { title: "家園" } },
  { path: "chara/adventure", component: Adventure, meta: { title: "冒險" } },
];
