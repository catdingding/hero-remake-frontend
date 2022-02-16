<template>
  <div>
    金錢：{{ $filters.currency(chara_gold) }}
    <el-divider direction="vertical"></el-divider>
    熟練度：{{ $filters.currency(chara_proficiency) }}
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "CharaWallet",
    data() {
      return {};
    },
    computed: { ...mapState("chara", ["chara_proficiency", "chara_gold"]) },
  };
</script>

<style lang="less" scoped>
  div {
    text-align: center;
  }
</style>
