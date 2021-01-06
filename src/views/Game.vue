<template>
  <div class="game">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark">
          <div class="navbar">
            <MenuItem name="index" to="/game">
              主頁
            </MenuItem>
            <Submenu name="chara">
              <template slot="title">
                角色
              </template>
              <MenuItem name="bag" to="/game/bag">背包/裝備</MenuItem>
              <MenuItem name="excercise">修煉</MenuItem>
              <MenuItem name="ability" to="/game/ability-learn">學習奧義</MenuItem>
              <MenuItem name="ability" to="/game/ability-setting">設置奧義</MenuItem>
              <MenuItem name="skill" to="/game/skill-setting">技能</MenuItem>
              <MenuItem name="job-change" to="/game/job-change">轉職</MenuItem>
              <MenuItem name="alchemy" to="/game/alchemy">鍊金</MenuItem>
              <MenuItem name="send-gold-item">傳送金錢/道具</MenuItem>
            </Submenu>
            <Submenu name="town">
              <template slot="title">
                城鎮
              </template>
              <MenuItem name="storage" to="/game/storage">倉庫</MenuItem>
              <MenuItem name="smith">鍛造屋</MenuItem>
              <MenuItem name="store-weapon" to="/game/store/weapon">武器店</MenuItem>
              <MenuItem name="store-armor" to="/game/store/armor">防具店</MenuItem>
              <MenuItem name="store-jewelry" to="/game/store/jewelry">飾品店</MenuItem>
              <MenuItem name="store-item" to="/game/store/item">道具店</MenuItem>
            </Submenu>
            <Submenu name="country">
              <template slot="title">
                國家
              </template>
              <MenuItem name="country-join-create">入國/建國</MenuItem>
              <MenuItem name="country-profile">概況</MenuItem>
              <MenuItem name="country-join">入國申請</MenuItem>
              <MenuItem name="country-storage">國庫</MenuItem>
              <MenuItem name="country-donate">捐獻</MenuItem>
              <MenuItem name="country-officers">官職</MenuItem>
              <MenuItem name="king-change">國王更改</MenuItem>
            </Submenu>
            <Submenu name="other">
              <template slot="title">
                其他
              </template>
              <MenuItem name="password-change">更改密碼</MenuItem>
              <MenuItem name="donate-store">贊助商店</MenuItem>
            </Submenu>
          </div>
        </Menu>
      </Header>
      <Content class="content">
        <router-view class="router-view" />
      </Content>
      <Footer class="footer"></Footer>
    </Layout>
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
</style>
