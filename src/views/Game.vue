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
            <el-menu-item index="excercise">修煉</el-menu-item>
            <el-menu-item index="ability" :route="{ path: '/game/ability-learn' }">學習奧義</el-menu-item>
            <el-menu-item index="ability" :route="{ path: '/game/ability-setting' }">設置奧義</el-menu-item>
            <el-menu-item index="skill" :route="{ path: '/game/skill-setting' }">技能</el-menu-item>
            <el-menu-item index="job-change" :route="{ path: '/game/job-change' }">轉職</el-menu-item>
            <el-menu-item index="alchemy" :route="{ path: '/game/alchemy' }">鍊金</el-menu-item>
            <el-menu-item index="send-gold-item">傳送金錢/道具</el-menu-item>
          </el-submenu>
          <el-submenu index="town">
            <template slot="title">
              城鎮
            </template>
            <el-menu-item index="storage" :route="{ path: '/game/storage' }">倉庫</el-menu-item>
            <el-menu-item index="smith">鍛造屋</el-menu-item>
            <el-menu-item index="store-weapon" :route="{ path: '/game/store/weapon' }">武器店</el-menu-item>
            <el-menu-item index="store-armor" :route="{ path: '/game/store/armor' }">防具店</el-menu-item>
            <el-menu-item index="store-jewelry" :route="{ path: '/game/store/jewelry' }">飾品店</el-menu-item>
            <el-menu-item index="store-item" :route="{ path: '/game/store/item' }">道具店</el-menu-item>
          </el-submenu>
          <el-submenu index="country">
            <template slot="title">
              國家
            </template>
            <el-menu-item index="country-join-create">入國/建國</el-menu-item>
            <el-menu-item index="country-profile">概況</el-menu-item>
            <el-menu-item index="country-join">入國申請</el-menu-item>
            <el-menu-item index="country-storage">國庫</el-menu-item>
            <el-menu-item index="country-donate">捐獻</el-menu-item>
            <el-menu-item index="country-officers">官職</el-menu-item>
            <el-menu-item index="king-change">國王更改</el-menu-item>
          </el-submenu>
          <el-submenu index="other">
            <template slot="title">
              其他
            </template>
            <el-menu-item index="password-change">更改密碼</el-menu-item>
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
  export default {
    data() {
      return {};
    },
    components: {}
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
  }
  .el-header {
    padding: 0;
  }
</style>
