<template>
  <div class="game">
    <el-container>
      <el-header>
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
              <el-menu-item index="ability-setting" :route="{ path: '/game/chara/ability-setting' }">
                設置奧義
              </el-menu-item>
              <el-menu-item index="skill" :route="{ path: '/game/chara/skill-setting' }">技能</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="make-item">
              <template v-slot:title>製作物品</template>
              <el-menu-item index="alchemy" :route="{ path: '/game/chara/alchemy' }">鍊金</el-menu-item>
              <el-menu-item
                index="battle-map-ticket-to-item"
                :route="{ path: '/game/chara/battle-map-ticket-to-item' }"
              >
                地圖製作
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item index="pvp" :route="{ path: '/game/chara/pvp' }">PvP</el-menu-item>
            <el-menu-item index="send-item-gold" :route="{ path: '/game/chara/send-item-gold' }">
              傳送道具/金錢
            </el-menu-item>
            <el-menu-item index="farm" :route="{ path: '/game/chara/farm' }">農場</el-menu-item>
            <el-menu-item index="parcel" :route="{ path: '/game/chara/parcel' }">包裹</el-menu-item>
            <el-menu-item index="equipment-lock" :route="{ path: '/game/chara/equipment-lock' }">裝備綁定</el-menu-item>
            <el-menu-item index="chara-introduction" :route="{ path: '/game/chara/introduction' }">自傳</el-menu-item>
            <el-menu-item index="member-shop" :route="{ path: '/game/chara/member-shop' }">贊助商店</el-menu-item>
            <el-menu-item index="avatar-change" :route="{ path: '/game/chara/avatar-change' }">更換頭像</el-menu-item>
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
            <el-menu-item
              index="team-join-request"
              :route="{ path: '/game/team/join-request' }"
              v-show="chara_is_leader"
            >
              入隊申請審查
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="other">
            <template v-slot:title> 其他 </template>
            <el-menu-item index="log" :route="{ path: '/game/log' }">事件查詢</el-menu-item>
            <el-menu-item index="battle-result-list" :route="{ path: '/game/battle-result-list' }">
              戰鬥記錄
            </el-menu-item>
            <el-menu-item index="ability-list" :route="{ path: '/game/ability-list' }">奧義列表</el-menu-item>
            <el-menu-item index="skill-list" :route="{ path: '/game/skill-list' }">技能列表</el-menu-item>
            <el-menu-item index="pet-list" :route="{ path: '/game/pet-list' }">寵物列表</el-menu-item>
            <el-menu-item index="change-log" :route="{ path: '/game/change-log' }">更新日誌</el-menu-item>
            <el-menu-item index="password-change" :route="{ path: '/game/password-change' }">更改密碼</el-menu-item>
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
          <el-dropdown @command="change_theme" type="primary">
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
      </el-header>
      <el-main class="content">
        <router-view v-slot="{ Component }" class="router-view">
          <component :is="Component" />
        </router-view>
      </el-main>
      <el-footer class="footer" height="100px">
        <div>
          參考<br />
          Farland History Ⅱ Ver2.11 <a href="http://farland.jellybean.jp/top.htm">bean</a><br />
          The Wars of Roses Ver6.4 <a href="http://g2.ngw.jp/~maccyu/game/">maccyu</a><br />
          繁體中文化無限改版:<a href="http://www.gm.idv.tw/">Zeeman</a><br />
        </div>
      </el-footer>
    </el-container>
    <el-dialog title="角色資料" v-model="chara_profile_dialog_visible" width="50%">
      <CharaPublicProfileCard :data="chara_profile_dialog_data"></CharaPublicProfileCard>
    </el-dialog>
    <el-dialog title="NPC資料" v-model="npc_profile_dialog_visible" width="50%">
      <NPCProfileCard :data="npc_profile"></NPCProfileCard>
    </el-dialog>
    <el-dialog title="戰鬥結果" v-model="battle_result_dialog_visible" width="90%">
      <BattleResultBlock></BattleResultBlock>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from "vuex";
  import { mapFields } from "vuex-map-fields";
  import { ArrowDown } from "@element-plus/icons";
  import CharaPublicProfileCard from "@/components/CharaPublicProfileCard.vue";
  import NPCProfileCard from "@/components/NPCProfileCard.vue";
  import BattleResultBlock from "@/components/BattleResultBlock.vue";

  export default {
    data() {
      return {
        auto_fight_interval_id: null,
        waiting_battle_result: false,
        auto_fight_error_times: 0,
        rule_url: process.env.VUE_APP_RULE_URL,
        is_dark_theme: false,
        css_settings: {
          dark: {
            "--el-color-white": "#36393f",
            "--el-color-black": "#000000",
            "--el-text-color-primary": "#faffff",
            "--el-text-color-regular": "#faffff",
            "--el-text-color-secondary": "#faffff",
            "--el-text-color-placeholder": "#faffff",
            "--el-bg-color": "#36393f",
            "--el-border-color-base": "#dcdfe6",
            "-el-border-color-light": "#e4e7ed",
            "--el-border-color-lighter": "#ebeef5",
            "--el-border-color-extra-light": "#f2f6fc",
            "--text-color-primary-light-bg": "#303133",
            "--text-color-secondary-light-bg": "#606266",
          },
          light: {
            "--el-color-white": "#ffffff",
            "--el-color-black": "#000000",
            "--el-color-primary": "#409eff",
            "--el-text-color-primary": "#303133",
            "--el-text-color-regular": "#606266",
            "--el-text-color-secondary": "#909399",
            "--el-text-color-placeholder": "#c0c4cc",
            "--el-bg-color": "#f5f7fa",
            "--el-border-color-base": "#dcdfe6",
            "--el-border-color-light": "#e4e7ed",
            "--el-border-color-lighter": "#ebeef5",
            "--el-border-color-extra-light": "#f2f6fc",
            "--text-color-primary-light-bg": "var(--text-color-primary)",
            "--text-color-secondary-light-bg": "var(--text-color-secondary)",
          },
        },
      };
    },
    computed: {
      ...mapGetters(["is_loggedin"]),
      ...mapState("chara", [
        "chara_country",
        "chara_team",
        "chara_official",
        "chara_is_king",
        "chara_is_leader",
        "chara_hp",
        "chara_location",
        "chara_record",
      ]),
      ...mapGetters("chara", ["able_to_action"]),
      ...mapFields("battle", ["auto_fight_enabled", "battle_result_dialog_visible"]),
      ...mapState("battle", ["battle_map_id"]),
      ...mapFields("dialog", ["chara_profile_dialog_visible"]),
      ...mapFields("npc", ["npc_profile_dialog_visible"]),
      ...mapState("npc", ["npc_profile"]),
      ...mapState("dialog", ["chara_profile_dialog_data"]),
    },
    methods: {
      ...mapActions(["logout"]),
      async try_auto_fight() {
        if (!this.auto_fight_enabled || this.waiting_battle_result || !this.able_to_action()) {
          return;
        }
        if (this.chara_hp <= 0) {
          this.$notify.error({
            title: "提示",
            message: "HP不足，已停止自動戰鬥",
            duration: 0,
          });
          this.auto_fight_enabled = false;
          return;
        }

        if (this.battle_map_id === null) {
          this.$notify.error({
            title: "提示",
            message: "請選擇戰鬥地圖",
            duration: 0,
          });
          this.auto_fight_enabled = false;
          return;
        }
        this.waiting_battle_result = true;
        try {
          await this.$store.dispatch("battle/fight_battle_map");
          if (this.chara_record.total_battle % 10 === 1) {
            await this.$store.dispatch("chara/get_chara_profile", {
              omit: "bag_items,slots,skill_settings,introduction,main_ability,job_ability,live_ability,team,country,farms,title,titles,partner,partners",
            });
          } else {
            await this.$store.dispatch("chara/get_chara_profile", {
              fields:
                "battle_map_tickets,attributes,exp,gold,health,hp,hp_max,hp_limit,mp,mp_max,mp_limit,level,next_action_time,proficiency,record",
            });
          }
        } catch (e) {
          if (e.response && e.response.status >= 400 && e.response.status < 500) {
            this.auto_fight_error_times += 1;
            if (this.auto_fight_error_times > 10) {
              this.auto_fight_error_times = 0;
              this.auto_fight_enabled = false;
              this.$notify.error({
                title: "提示",
                message: "自動戰鬥失敗次數過多，請檢查背包空間或電腦時間設定",
                duration: 0,
              });
            }
          }
        }
        this.waiting_battle_result = false;
      },
      process_hot_key(e) {
        if (e.key === "F4") {
          this.$router.push("/game");
        }
      },
      change_theme(theme) {
        for (const [key, value] of Object.entries(this.css_settings[theme])) {
          document.documentElement.style.setProperty(key, value);
        }
      },
    },
    mounted() {
      if (!this.is_loggedin) {
        this.$router.push("/");
        this.$message.error("請先登入");
        return;
      }
      this.$store
        .dispatch("chara/get_chara_profile", {
          omit: "bag_items,slots,skill_settings,introduction,main_ability,job_ability,live_ability,farms,title,titles,partner,partners",
        })
        .then(() => {
          this.$store.dispatch("ws/start_ws");
        });

      this.auto_fight_interval_id = setInterval(this.try_auto_fight, 100);

      window.addEventListener("keydown", this.process_hot_key);
    },
    beforeUnmount() {
      clearInterval(this.auto_fight_interval_id);
      window.removeEventListener("keydown", this.process_hot_key);
    },
    components: { CharaPublicProfileCard, NPCProfileCard, BattleResultBlock, ArrowDown },
  };
</script>

<style lang="less" scoped>
  .content {
    min-height: calc(100vh - 112px);
  }
  .router-view {
    max-width: 1200px;
    margin: 0 auto;
    padding: 25px 0 25px 0;
    display: flex;
    justify-content: space-around;
    flex-flow: row wrap;
    color: var(--text-color-primary);
  }
  .el-header {
    padding: 0;
    position: fixed;
    width: 100%;
    z-index: 10;
    @media (max-width: 768px) {
      position: relative;
    }
  }
  .el-menu {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

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
  .el-main {
    margin-top: 60px;
  }
  .footer {
    text-align: center;
    font-size: 14px;
    padding: 10px;
    background-color: #545c64;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      color: #fff;
    }
  }
</style>
