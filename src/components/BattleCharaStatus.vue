<template>
  <div class="battle-chara-status">
    <div class="name">{{ chara.name }}</div>
    <div class="attr">
      <span>HP</span>
      <span><PercentageDisplay color="red" :value="chara.hp" :max-value="chara.hp_max"/></span>
    </div>
    <div class="attr">
      <span>MP</span>
      <span><PercentageDisplay color="skyblue" :value="chara.mp" :max-value="chara.mp_max"/></span>
    </div>
    <div class="attr">
      <span>AP</span>
      <span><PercentageDisplay color="#8bc34a" :value="chara.action_points" :max-value="1000"/></span>
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
    width: 125px;
    .name {
      text-align: center;
    }
    .attr {
      margin: 5px 0 5px 0;
      width: 100%;
      display: flex;

      span:nth-child(1) {
        width: 25px;
        display: inline-block;
      }
      span:nth-child(2) {
        width: 70%;
        text-align: right;
        display: inline-block;
      }
    }
  }
</style>
