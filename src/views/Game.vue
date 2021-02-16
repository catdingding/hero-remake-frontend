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
            <el-menu-item index="send-item-gold" :route="{ path: '/game/send-item-gold' }">傳送道具/金錢</el-menu-item>
          </el-submenu>
          <el-submenu index="town">
            <template slot="title">
              城鎮
            </template>
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
          </el-submenu>
          <el-submenu index="other">
            <template slot="title">
              其他
            </template>
            <el-menu-item index="password-change" :route="{ path: '/game/password-change' }">更改密碼</el-menu-item>
            <el-menu-item index="donate-store">贊助商店</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main class="content">
        <router-view class="router-view" />
      </el-main>
      <el-footer class="footer"></el-footer>
    </el-container>
  </div>
</template>

<script>
  import { mapState, mapGetters } from "vuex";
  import { mapFields } from "vuex-map-fields";

  export default {
    data() {
      return { auto_fight_interval_id: null, waiting_battle_result: false };
    },
    computed: {
      ...mapState("chara", ["chara_country", "chara_official", "chara_is_king", "chara_hp"]),
      ...mapGetters("chara", ["able_to_action"]),
      ...mapFields("battle", ["auto_fight_enabled"]),
      ...mapState("battle", ["battle_map_id"]),
    },
    methods: {
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
        await this.$store.dispatch("battle/fight_battle_map");
        await this.$store.dispatch("chara/get_chara_profile", {});
        this.waiting_battle_result = false;
      },
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", {});
      this.$store.dispatch("ws/start_chat");
      this.auto_fight_interval_id = setInterval(this.try_auto_fight, 100);
    },
    beforeDestroy() {
      clearInterval(this.auto_fight_interval_id);
    },
  };
</script>

<style lang="less" scoped>
  .navbar {
    width: 500px;
    margin: 0 auto;
    margin-right: 50px;
  }
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
</style>
