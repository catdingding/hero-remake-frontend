<template>
  <div class="game">
    <el-container>
      <el-header>
        <Menu />
      </el-header>
      <el-main>
        <div class="content">
          <router-view v-slot="{ Component }" class="router-view">
            <component :is="Component" />
          </router-view>
        </div>
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
    <el-dialog title="角色資料" v-model="chara_profile_dialog_visible" :width="get_dialog_width()">
      <CharaPublicProfileCard :data="chara_profile_dialog_data"></CharaPublicProfileCard>
    </el-dialog>
    <el-dialog title="戰鬥結果" v-model="battle_result_dialog_visible" width="90%" destroy-on-close>
      <BattleResultBlock></BattleResultBlock>
    </el-dialog>
    <NPCDesktopPet class="desktop-pet" />
  </div>
</template>

<script>
  import { mapState, mapGetters } from "vuex";
  import { mapFields } from "vuex-map-fields";
  import CharaPublicProfileCard from "@/components/CharaPublicProfileCard.vue";
  import BattleResultBlock from "@/components/BattleResultBlock.vue";
  import NPCDesktopPet from "@/components/NPCDesktopPet.vue";
  import Menu from "@/components/Menu.vue";

  export default {
    data() {
      return {
        auto_fight_interval_id: null,
      };
    },
    computed: {
      ...mapGetters(["is_loggedin"]),
      ...mapFields("battle", ["battle_result_dialog_visible"]),
      ...mapFields("dialog", ["chara_profile_dialog_visible"]),
      ...mapState("dialog", ["chara_profile_dialog_data"]),
    },
    methods: {
      process_hot_key(e) {
        if (e.key === "F4") {
          this.$router.push("/game");
        }
      },
      async try_auto_fight() {
        await this.$store.dispatch("battle/try_auto_fight");
      },
      get_dialog_width() {
        if (window.matchMedia("(max-width: 768px)").matches) {
          return "90%";
        } else {
          return "720px";
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
          fields: "id,name,next_action_time,location,country,team,official,is_king,is_leader,config",
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
    components: { CharaPublicProfileCard, BattleResultBlock, NPCDesktopPet, Menu },
  };
</script>

<style lang="less" scoped>
  .content {
    margin: 0 auto;
    max-width: 1200px;
    min-height: calc(100vh - 112px);
    padding: 25px;
    background-color: var(--background-mask);
  }
  .router-view {
    margin: 0 auto;
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
  .desktop-pet {
    z-index: 10;
    position: fixed;
    right: 0;
    bottom: 0;
  }
  .el-main {
    margin-top: 58px;
    padding: 0;
    @media (max-width: 768px) {
      margin-top: 0px;
    }
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
