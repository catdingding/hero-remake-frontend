<template>
  <el-menu mode="horizontal" router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <el-menu-item index="index" :route="{ path: '/game' }"> 主頁 </el-menu-item>
    <el-sub-menu index="chara">
      <template v-slot:title> 角色 </template>
      <el-menu-item index="bag" :route="{ path: '/game/chara/bag' }">背包/裝備</el-menu-item>
      <el-menu-item index="excercise" :route="{ path: '/game/chara/exercise' }">修煉</el-menu-item>
      <el-menu-item index="job-change" :route="{ path: '/game/chara/job-change' }">轉職</el-menu-item>
      <el-sub-menu index="ability-skill">
        <template v-slot:title>奧義/技能</template>
        <el-menu-item index="ability-learn" :route="{ path: '/game/chara/ability-learn' }">學習奧義</el-menu-item>
        <el-menu-item index="ability-setting" :route="{ path: '/game/chara/ability-setting' }"> 設置奧義 </el-menu-item>
        <el-menu-item index="skill" :route="{ path: '/game/chara/skill-setting' }">技能</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="make-item">
        <template v-slot:title>製作物品</template>
        <el-menu-item index="alchemy" :route="{ path: '/game/chara/alchemy' }">鍊金</el-menu-item>
        <el-menu-item index="battle-map-ticket-to-item" :route="{ path: '/game/chara/battle-map-ticket-to-item' }">
          地圖製作
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="pvp" :route="{ path: '/game/chara/pvp' }">PvP</el-menu-item>
      <el-menu-item index="send-item-gold" :route="{ path: '/game/chara/send-item-gold' }">
        傳送道具/金錢
      </el-menu-item>
      <el-menu-item index="adventure" :route="{ path: '/game/chara/adventure' }">冒險</el-menu-item>
      <el-menu-item index="farm" :route="{ path: '/game/chara/farm' }">農場</el-menu-item>
      <el-menu-item index="home" :route="{ path: '/game/chara/home' }">家園</el-menu-item>
      <el-menu-item index="parcel" :route="{ path: '/game/chara/parcel' }">包裹</el-menu-item>
      <el-menu-item index="equipment-lock" :route="{ path: '/game/chara/equipment-lock' }">裝備綁定</el-menu-item>
      <el-menu-item index="member-shop" :route="{ path: '/game/chara/member-shop' }">贊助商店</el-menu-item>
      <el-menu-item index="setting" :route="{ path: '/game/chara/setting' }">設定調整</el-menu-item>
      <el-menu-item index="chara-achievement-types" :route="{ path: '/game/chara/achievement-types' }"
        >成就</el-menu-item
      >
    </el-sub-menu>
    <el-sub-menu index="town" v-show="chara_location && chara_location.town">
      <template v-slot:title> 城鎮 </template>
      <el-menu-item index="inn" :route="{ path: '/game/town/inn' }">旅店</el-menu-item>
      <el-menu-item index="storage" :route="{ path: '/game/town/storage' }">倉庫</el-menu-item>
      <el-menu-item index="smith" :route="{ path: '/game/town/smith' }">鍛造屋</el-menu-item>
      <el-menu-item index="equipment-transform" :route="{ path: '/game/town/equipment-transform' }">
        裝備轉換所
      </el-menu-item>
      <el-sub-menu index="store">
        <template v-slot:title>商店</template>
        <el-menu-item index="store-weapon" :route="{ path: '/game/town/store/weapon' }">武器店</el-menu-item>
        <el-menu-item index="store-armor" :route="{ path: '/game/town/store/armor' }">防具店</el-menu-item>
        <el-menu-item index="store-jewelry" :route="{ path: '/game/town/store/jewelry' }">飾品店</el-menu-item>
        <el-menu-item index="store-item" :route="{ path: '/game/town/store/item' }">道具店</el-menu-item>
        <el-menu-item index="exchange-house" :route="{ path: '/game/town/exchange-house' }">兌換屋</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="pet-store" :route="{ path: '/game/town/pet-store' }">寵物店</el-menu-item>
      <el-menu-item index="auction-house" :route="{ path: '/game/town/auction-house' }">拍賣所</el-menu-item>
      <el-menu-item index="sale-house" :route="{ path: '/game/town/sale-house' }">出售所</el-menu-item>
      <el-menu-item index="purchase-house" :route="{ path: '/game/town/purchase-house' }">收購所</el-menu-item>
      <el-menu-item index="name-change" :route="{ path: '/game/town/name-change' }">改名神殿</el-menu-item>
      <el-menu-item index="altar" :route="{ path: '/game/town/altar' }">祭壇</el-menu-item>
      <el-menu-item index="lottery-house" :route="{ path: '/game/town/lottery-house' }">彩券行</el-menu-item>
      <el-menu-item index="arena" :route="{ path: '/game/town/arena' }">競技場</el-menu-item>
      <el-menu-item index="npc-list" :route="{ path: '/game/town/npc-list' }">NPC列表</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="country">
      <template v-slot:title> 國家 </template>
      <el-menu-item index="country-list" :route="{ path: '/game/country/list' }">國家列表</el-menu-item>
      <el-menu-item index="country-found" :route="{ path: '/game/country/found' }" v-show="!chara_country">
        建國
      </el-menu-item>

      <el-menu-item index="country-panel" :route="{ path: '/game/country/panel' }" v-show="chara_country">
        國家面板
      </el-menu-item>
      <el-menu-item
        index="country-join-request"
        :route="{ path: '/game/country/join-request' }"
        v-show="chara_official || chara_is_king"
      >
        入國申請審查
      </el-menu-item>
      <el-menu-item index="country-storage" :route="{ path: '/game/country/storage' }" v-show="chara_country">
        國庫
      </el-menu-item>
      <el-menu-item
        index="country-location-control"
        :route="{ path: '/game/country/location-control' }"
        v-show="chara_is_king"
      >
        領土管理
      </el-menu-item>
      <el-menu-item
        index="country-town-build"
        :route="{ path: '/game/country/town-build' }"
        v-if="chara_is_king && !chara_location?.town && chara_country?.id === chara_location?.country?.id"
      >
        建立城鎮
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="team">
      <template v-slot:title> 隊伍 </template>
      <el-menu-item index="team-list" :route="{ path: '/game/team/list' }">隊伍列表</el-menu-item>
      <el-menu-item index="team-found" :route="{ path: '/game/team/found' }" v-show="!chara_team">
        建立隊伍
      </el-menu-item>
      <el-menu-item index="team-panel" :route="{ path: '/game/team/panel' }" v-show="chara_team">
        隊伍面板
      </el-menu-item>
      <el-menu-item index="team-join-request" :route="{ path: '/game/team/join-request' }" v-show="chara_is_leader">
        入隊申請審查
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="other">
      <template v-slot:title> 其他 </template>
      <el-menu-item index="about" :route="{ path: '/game/about' }">關於</el-menu-item>
      <el-menu-item index="log" :route="{ path: '/game/log' }">事件查詢</el-menu-item>
      <el-menu-item index="battle-result-list" :route="{ path: '/game/battle-result-list' }"> 戰鬥記錄 </el-menu-item>
      <el-menu-item index="ranking" :route="{ path: '/game/ranking' }">排行榜</el-menu-item>
      <el-menu-item index="ability-list" :route="{ path: '/game/ability-list' }">奧義列表</el-menu-item>
      <el-menu-item index="skill-list" :route="{ path: '/game/skill-list' }">技能列表</el-menu-item>
      <el-menu-item index="pet-list" :route="{ path: '/game/pet-list' }">寵物列表</el-menu-item>
      <el-menu-item index="change-log" :route="{ path: '/game/change-log' }">更新日誌</el-menu-item>
      <el-menu-item index="password-change" :route="{ path: '/game/password-change' }">更改密碼</el-menu-item>
      <el-menu-item>
        <a :href="discord_url" @click.stop="" target="_blank" style="color: #fff">
          <div class="full">Discord</div>
        </a>
      </el-menu-item>
      <el-menu-item>
        <a href="/chat" @click.stop="" target="_blank" style="color: #fff">
          <div class="full">聊天視窗</div>
        </a>
      </el-menu-item>
      <el-menu-item>
        <a :href="rule_url" @click.stop="" target="_blank" style="color: #fff">
          <div class="full">遊戲規章</div>
        </a>
      </el-menu-item>
      <el-menu-item>
        <div @click.stop="logout" class="full">
          <span>登出</span>
        </div>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="ugc">
      <template v-slot:title> 自訂 </template>
      <el-menu-item index="ugc-dungeon-panel" :route="{ path: '/game/ugc/panel' }">管理面板</el-menu-item>
      <el-menu-item index="ugc-dungeon-list" :route="{ path: '/game/ugc/dungeon-list' }">地城列表</el-menu-item>
    </el-sub-menu>
    <el-dropdown @command="change_theme" type="primary" :hide-timeout="500">
      <el-button type="primary">
        Theme<el-icon class="el-icon--right"><ArrowDown /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="light">Light Theme</el-dropdown-item>
          <el-dropdown-item command="dark">Dark Theme</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-menu>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import { ArrowDown } from "@element-plus/icons";
  import { set_config } from "@/api/chara.js";

  export default {
    data() {
      return {
        rule_url: process.env.VUE_APP_RULE_URL,
        discord_url: process.env.VUE_APP_DISCORD_URL
      };
    },
    computed: {
      ...mapState("chara", [
        "chara_country",
        "chara_team",
        "chara_official",
        "chara_is_king",
        "chara_is_leader",
        "chara_location",
      ]),
    },
    methods: {
      ...mapActions(["logout"]),
      async change_theme(theme) {
        await set_config({ theme });
      },
    },
    components: { ArrowDown },
  };
</script>

<style lang="less" scoped>
  .el-menu {
    display: flex;
    align-items: center;
    .el-menu-item .full {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .el-menu-item a {
      width: 100%;
    }
  }
</style>
