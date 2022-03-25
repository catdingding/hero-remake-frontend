<template>
  <div class="battle-chara-status">
    <div class="name">{{ chara.name }}</div>
    <div class="attr-block">
      <div>
        <div class="attr">
          <span>HP</span>
          <span><PercentageDisplay color="red" :value="chara.hp" :max-value="chara.hp_max" /></span>
        </div>
        <div class="attr">
          <span>MP</span>
          <span><PercentageDisplay color="skyblue" :value="chara.mp" :max-value="chara.mp_max" /></span>
        </div>
        <div class="attr">
          <span>AP</span>
          <span><PercentageDisplay color="#8bc34a" :value="chara.action_points" :max-value="1000" /></span>
        </div>
      </div>
      <div>
        <div class="attr">
          <span>攻</span>
          <span>{{ chara.attack }}</span>
        </div>
        <div class="attr">
          <span>防</span>
          <span>{{ chara.defense }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PercentageDisplay from "@/components/PercentageDisplay.vue";
  export default {
    name: "BattleCharaStatus",
    data() {
      return {};
    },
    props: ["chara"],
    components: { PercentageDisplay },
  };
</script>

<style lang="less" scoped>
  .battle-chara-status {
    width: 150px;
    @media screen and (max-width: 480px) {
      & {
        width: 100%;
      }
    }

    .name {
      text-align: center;
    }
    .attr {
      margin: 3px 0 3px 0;
      width: 100%;
      display: flex;
      height: 18px;
      line-height: 18px;
      span:nth-child(1) {
        width: 30px;
        padding-left: 5px;
        display: inline-block;
      }
      span:nth-child(2) {
        width: calc(100% - 35px);
        text-align: right;
        display: inline-block;
      }
    }
    .attr-block {
      width: 100%;
    }
  }
</style>
