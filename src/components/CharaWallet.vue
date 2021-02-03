<template>
  <div>
    金錢：{{ chara_gold | currency }}
    <el-divider direction="vertical"></el-divider>
    熟練度：{{ chara_proficiency | currency }}
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "CharaWallet",
    data() {
      return {};
    },
    computed: { ...mapState("chara", ["chara_proficiency", "chara_gold"]) }
  };
</script>

<style lang="less" scoped>
  div {
    text-align: center;
  }
</style>
