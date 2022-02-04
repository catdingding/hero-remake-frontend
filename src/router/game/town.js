import Storage from "@/views/game/town/Storage.vue";
import Store from "@/views/game/town/Store.vue";
import ExchangeHouse from "@/views/game/town/ExchangeHouse.vue";
import Smith from "@/views/game/town/Smith.vue";
import EquipmentTransform from "@/views/game/town/EquipmentTransform.vue";
import PetStore from "@/views/game/town/PetStore.vue";
import Lottery from "@/views/game/town/Lottery.vue";

import AuctionHouse from "@/views/game/town/AuctionHouse.vue";
import SaleHouse from "@/views/game/town/SaleHouse.vue";
import PurchaseHouse from "@/views/game/town/PurchaseHouse.vue";

import Inn from "@/views/game/town/Inn.vue";
import NameChange from "@/views/game/town/NameChange.vue";
import Altar from "@/views/game/town/Altar.vue";
import Arena from "@/views/game/town/Arena.vue";
import NPCList from "@/views/game/town/NPCList.vue";

export default [
  { path: "town/storage", component: Storage, meta: { title: "倉庫" } },
  { path: "town/store/:store_type", component: Store, meta: { title: "商店" } },
  { path: "town/smith", component: Smith, meta: { title: "鐵匠鋪" } },
  { path: "town/equipment-transform", component: EquipmentTransform, meta: { title: "裝備轉換所" } },
  { path: "town/pet-store", component: PetStore, meta: { title: "寵物店" } },
  { path: "town/exchange-house", component: ExchangeHouse, meta: { title: "兌換屋" } },
  { path: "town/auction-house", component: AuctionHouse, meta: { title: "拍賣所" } },
  { path: "town/sale-house", component: SaleHouse, meta: { title: "出售所" } },
  { path: "town/purchase-house", component: PurchaseHouse, meta: { title: "收購所" } },
  { path: "town/lottery-house", component: Lottery, meta: { title: "彩券行" } },
  { path: "town/inn", component: Inn, meta: { title: "旅館" } },
  { path: "town/name-change", component: NameChange, meta: { title: "改名神殿" } },
  { path: "town/altar", component: Altar, meta: { title: "祭壇" } },
  { path: "town/arena", component: Arena, meta: { title: "競技場" } },
  { path: "town/npc-list", component: NPCList, meta: { title: "NPC列表" } },
];
