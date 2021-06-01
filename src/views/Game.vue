<template>
  <div class="game">
    <el-container>
      <el-header>
        <el-menu mode="horizontal" router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="index" :route="{ path: '/game' }">
            主頁
          </el-menu-item>
          <el-submenu index="chara">
            <template slot="title">
              角色
            </template>
            <el-menu-item index="bag" :route="{ path: '/game/bag' }">背包/裝備</el-menu-item>
            <el-menu-item index="excercise" :route="{ path: '/game/exercise' }">修煉</el-menu-item>
            <el-menu-item index="ability-learn" :route="{ path: '/game/ability-learn' }">學習奧義</el-menu-item>
            <el-menu-item index="ability-setting" :route="{ path: '/game/ability-setting' }">設置奧義</el-menu-item>
            <el-menu-item index="skill" :route="{ path: '/game/skill-setting' }">技能</el-menu-item>
            <el-menu-item index="job-change" :route="{ path: '/game/job-change' }">轉職</el-menu-item>
            <el-menu-item index="alchemy" :route="{ path: '/game/alchemy' }">鍊金</el-menu-item>
            <el-menu-item index="pvp" :route="{ path: '/game/pvp' }">PvP</el-menu-item>
            <el-menu-item index="send-item-gold" :route="{ path: '/game/send-item-gold' }">傳送道具/金錢</el-menu-item>
            <el-menu-item index="chara-introduction" :route="{ path: '/game/chara-introduction' }">自傳</el-menu-item>
          </el-submenu>
          <el-submenu index="town" v-show="chara_location && chara_location.town">
            <template slot="title">
              城鎮
            </template>
            <el-menu-item index="inn" :route="{ path: '/game/inn' }">旅店</el-menu-item>
            <el-menu-item index="storage" :route="{ path: '/game/storage' }">倉庫</el-menu-item>
            <el-menu-item index="smith" :route="{ path: '/game/smith' }">鍛造屋</el-menu-item>
            <el-menu-item index="pet-store" :route="{ path: '/game/pet-store' }">寵物店</el-menu-item>
            <el-menu-item index="store-weapon" :route="{ path: '/game/store/weapon' }">武器店</el-menu-item>
            <el-menu-item index="store-armor" :route="{ path: '/game/store/armor' }">防具店</el-menu-item>
            <el-menu-item index="store-jewelry" :route="{ path: '/game/store/jewelry' }">飾品店</el-menu-item>
            <el-menu-item index="store-item" :route="{ path: '/game/store/item' }">道具店</el-menu-item>
            <el-menu-item index="exchange-house" :route="{ path: '/game/exchange-house' }">兌換屋</el-menu-item>
            <el-menu-item index="auction-house" :route="{ path: '/game/auction-house' }">拍賣所</el-menu-item>
            <el-menu-item index="sale-house" :route="{ path: '/game/sale-house' }">出售所</el-menu-item>
            <!-- <el-menu-item index="purchase-house" :route="{ path: '/game/purchase-house' }">收購所</el-menu-item> -->
            <el-menu-item index="name-change" :route="{ path: '/game/name-change' }">改名神殿</el-menu-item>
          </el-submenu>
          <el-submenu index="country">
            <template slot="title">
              國家
            </template>
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
              領土控制
            </el-menu-item>
            <el-menu-item
              index="country-town-build"
              :route="{ path: '/game/country/town-build' }"
              v-show="
                chara_is_king &&
                  !_.get(chara_location, 'town') &&
                  _.get(chara_country, 'id') === _.get(chara_location, 'country.id')
              "
            >
              建立城鎮
            </el-menu-item>
          </el-submenu>
          <el-submenu index="other">
            <template slot="title">
              其他
            </template>
            <el-menu-item index="log" :route="{ path: '/game/log' }">事件查詢</el-menu-item>
            <el-menu-item index="password-change" :route="{ path: '/game/password-change' }">更改密碼</el-menu-item>
            <el-menu-item index="point-store" :route="{ path: '/game/point-store' }">贊助商店</el-menu-item>
            <el-menu-item @click="logout">登出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main class="content">
        <keep-alive include="Index">
          <router-view class="router-view" />
        </keep-alive>
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
    <el-dialog title="角色資料" :visible.sync="chara_profile_dialog_visible" width="50%">
      <CharaPublicProfileCard :data="chara_profile_dialog_data"></CharaPublicProfileCard>
    </el-dialog>
    <el-dialog title="戰鬥結果" :visible.sync="battle_result_dialog_visible" width="90%">
      <BattleResultBlock></BattleResultBlock>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from "vuex";
  import { mapFields } from "vuex-map-fields";
  import { Message } from "element-ui";
  import CharaPublicProfileCard from "@/components/CharaPublicProfileCard.vue";
  import BattleResultBlock from "@/components/BattleResultBlock.vue";

  export default {
    data() {
      return { auto_fight_interval_id: null, waiting_battle_result: false, auto_fight_error_times: 0 };
    },
    computed: {
      ...mapGetters(["is_loggedin"]),
      ...mapState("chara", ["chara_country", "chara_official", "chara_is_king", "chara_hp", "chara_location"]),
      ...mapGetters("chara", ["able_to_action"]),
      ...mapFields("battle", ["auto_fight_enabled", "battle_result_dialog_visible"]),
      ...mapState("battle", ["battle_map_id"]),
      ...mapFields("dialog", ["chara_profile_dialog_visible"]),
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
          await this.$store.dispatch("chara/get_chara_profile", {
            omit: "bag_items,slots,skill_settings,introduction,main_ability,job_ability,live_ability",
          });
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
    },
    mounted() {
      if (!this.is_loggedin) {
        this.$router.push("/");
        Message.error("請先登入");
        return;
      }
      this.$store.dispatch("chara/get_chara_profile", {
        omit: "bag_items,slots,skill_settings,introduction,main_ability,job_ability,live_ability",
      });
      this.$store.dispatch("ws/start_ws");
      this.auto_fight_interval_id = setInterval(this.try_auto_fight, 100);

      window.addEventListener("keydown", this.process_hot_key);
    },
    beforeDestroy() {
      clearInterval(this.auto_fight_interval_id);
      window.removeEventListener("keydown", this.process_hot_key);
    },
    components: { CharaPublicProfileCard, BattleResultBlock },
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
  }
  .el-header {
    padding: 0;
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
