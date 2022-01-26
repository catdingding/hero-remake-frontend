import Index from "@/views/game/Index.vue";
import BattleResult from "@/views/game/BattleResult.vue";
import map from "@/views/game/Map.vue";
import CharaIntroduction from "@/views/game/CharaIntroduction.vue";
import Bag from "@/views/game/Bag.vue";
import Farm from "@/views/game/Farm.vue";
import Storage from "@/views/game/Storage.vue";
import Store from "@/views/game/Store.vue";
import PointStore from "@/views/game/PointStore.vue";
import ExchangeHouse from "@/views/game/ExchangeHouse.vue";
import JobChange from "@/views/game/JobChange.vue";
import SkillSetting from "@/views/game/SkillSetting.vue";
import AbilityLearn from "@/views/game/AbilityLearn.vue";
import AbilitySetting from "@/views/game/AbilitySetting.vue";
import Alchemy from "@/views/game/Alchemy.vue";
import SendItemGold from "@/views/game/SendItemGold.vue";
import Exercise from "@/views/game/Exercise.vue";
import PvP from "@/views/game/PvP.vue";
import EquipmentLock from "@/views/game/EquipmentLock.vue";
import MemberShop from "@/views/game/MemberShop.vue";
import AvatarChange from "@/views/game/AvatarChange.vue";
import Smith from "@/views/game/Smith.vue";
import EquipmentTransform from "@/views/game/EquipmentTransform.vue";
import PetStore from "@/views/game/PetStore.vue";
import PasswordChange from "@/views/game/PasswordChange.vue";
import Log from "@/views/game/Log.vue";
import ChangeLog from "@/views/game/ChangeLog.vue";
import BattleResultList from "@/views/game/BattleResultList.vue";
import AbilityList from "@/views/game/AbilityList.vue";
import PetList from "@/views/game/PetList.vue";
import BattleMapTicketToItem from "@/views/game/BattleMapTicketToItem.vue";
import Lottery from "@/views/game/Lottery.vue";
import Arena from "@/views/game/Arena.vue";

import CountryList from "@/views/game/CountryList.vue";
import CountryJoinRequest from "@/views/game/CountryJoinRequest.vue";
import CountryFound from "@/views/game/CountryFound.vue";
import CountryStorage from "@/views/game/CountryStorage.vue";
import CountryPanel from "@/views/game/CountryPanel.vue";
import CountryLocationControl from "@/views/game/CountryLocationControl.vue";
import CountryTownBuild from "@/views/game/CountryTownBuild.vue";

import TeamList from "@/views/game/TeamList.vue";
import TeamJoinRequest from "@/views/game/TeamJoinRequest.vue";
import TeamFound from "@/views/game/TeamFound.vue";
import TeamPanel from "@/views/game/TeamPanel.vue";

import AuctionHouse from "@/views/game/AuctionHouse.vue";
import SaleHouse from "@/views/game/SaleHouse.vue";
import PurchaseHouse from "@/views/game/PurchaseHouse.vue";
import Parcel from "@/views/game/Parcel.vue";

import Inn from "@/views/game/Inn.vue";
import NameChange from "@/views/game/NameChange.vue";
import Altar from "@/views/game/Altar.vue";

import NPCList from "@/views/game/NPCList.vue";

export default [
  { path: "", component: Index, meta: { title: "主面板" } },
  { path: "battle-result", component: BattleResult, meta: { title: "戰鬥結果" } },
  { path: "map", component: map, meta: { title: "地圖" } },
  { path: "chara-introduction", component: CharaIntroduction, meta: { title: "自傳" } },
  { path: "bag", component: Bag, meta: { title: "背包" } },
  { path: "storage", component: Storage, meta: { title: "倉庫" } },
  { path: "store/:store_type", component: Store, meta: { title: "商店" } },
  { path: "job-change", component: JobChange, meta: { title: "轉職" } },
  { path: "skill-setting", component: SkillSetting, meta: { title: "技能設定" } },
  { path: "ability-learn", component: AbilityLearn, meta: { title: "主面板" } },
  { path: "ability-setting", component: AbilitySetting, meta: { title: "奧義設定" } },
  { path: "alchemy", component: Alchemy, meta: { title: "鍊金" } },
  { path: "farm", component: Farm, meta: { title: "農場" } },
  { path: "send-item-gold", component: SendItemGold, meta: { title: "傳送物品/金錢" } },
  { path: "parcel", component: Parcel, meta: { title: "包裹" } },
  { path: "exercise", component: Exercise, meta: { title: "修煉" } },
  { path: "pvp", component: PvP, meta: { title: "PvP" } },
  { path: "equipment-lock", component: EquipmentLock, meta: { title: "裝備綁定" } },
  { path: "member-shop", component: MemberShop, meta: { title: "贊助商店" } },
  { path: "avatar-change", component: AvatarChange, meta: { title: "更換頭像" } },
  { path: "smith", component: Smith, meta: { title: "鐵匠鋪" } },
  { path: "equipment-transform", component: EquipmentTransform, meta: { title: "裝備轉換所" } },
  { path: "country/found", component: CountryFound, meta: { title: "建國" } },
  { path: "country/storage", component: CountryStorage, meta: { title: "國庫" } },
  { path: "password-change", component: PasswordChange, meta: { title: "更改密碼" } },
  { path: "country/list", component: CountryList, meta: { title: "國家列表" } },
  { path: "country/join-request", component: CountryJoinRequest, meta: { title: "入國申請" } },
  { path: "country/panel", component: CountryPanel, meta: { title: "國家面板" } },
  { path: "country/location-control", component: CountryLocationControl, meta: { title: "領土管理" } },
  { path: "country/town-build", component: CountryTownBuild, meta: { title: "建立城鎮" } },

  { path: "team/list", component: TeamList, meta: { title: "隊伍列表" } },
  { path: "team/join-request", component: TeamJoinRequest, meta: { title: "入隊申請審查" } },
  { path: "team/found", component: TeamFound, meta: { title: "建立隊伍" } },
  { path: "team/panel", component: TeamPanel, meta: { title: "隊伍面板" } },

  { path: "pet-store", component: PetStore, meta: { title: "寵物店" } },
  { path: "exchange-house", component: ExchangeHouse, meta: { title: "兌換屋" } },
  { path: "auction-house", component: AuctionHouse, meta: { title: "拍賣所" } },
  { path: "sale-house", component: SaleHouse, meta: { title: "出售所" } },
  { path: "purchase-house", component: PurchaseHouse, meta: { title: "收購所" } },
  { path: "lottery-house", component: Lottery, meta: { title: "彩券行" } },
  { path: "inn", component: Inn, meta: { title: "旅館" } },
  { path: "name-change", component: NameChange, meta: { title: "改名神殿" } },
  { path: "altar", component: Altar, meta: { title: "祭壇" } },
  { path: "arena", component: Arena, meta: { title: "競技場" } },
  { path: "npc-list", component: NPCList, meta: { title: "NPC列表" } },
  { path: "point-store", component: PointStore, meta: { title: "贊助商店" } },
  { path: "log", component: Log, meta: { title: "事件查詢" } },
  { path: "change-log", component: ChangeLog, meta: { title: "更新日誌" } },
  { path: "battle-result-list", component: BattleResultList, meta: { title: "戰鬥記錄" } },
  { path: "ability-list", component: AbilityList, meta: { title: "奧義列表" } },
  { path: "pet-list", component: PetList, meta: { title: "寵物列表" } },
  { path: "battle-map-ticket-to-item", component: BattleMapTicketToItem, meta: { title: "地圖製作" } },
];
