<template>
  <BattleResultBlock :show_home_button="true"></BattleResultBlock>
</template>

<script>
  import { mapState } from "vuex";
  import BattleResultBlock from "@/components/BattleResultBlock.vue";

  export default {
    name: "BattleResult",
    data() {
      return {};
    },
    computed: {},
    components: { BattleResultBlock },
  };
</script>

<style lang="less" scoped></style>
