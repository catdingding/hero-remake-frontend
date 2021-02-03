<template>
  <div>
    <div class="store">
      <h2>架上商品</h2>
    </div>
    <div class="chara">
      <h2>背包</h2>
      <ItemTable :items="chara_bag_items"> </ItemTable>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import ItemTable from "@/components/ItemTable.vue";

  export default {
    name: "ExchangeHouse",
    data() {
      return {};
    },
    computed: { ...mapState("chara", ["chara_bag_items"]), ...mapState("trade", ["exchange_options"]) },
    methods: {
      ...mapActions("trade", ["buy_exchange_option"]),
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { omit: "", fields: "bag_items" });
      this.$store.dispatch("trade/get_exchange_options");
    },
    components: { ItemTable },
  };
</script>

<style lang="less" scoped>
  .store {
    width: 48%;
  }
  .chara {
    width: 48%;
  }
</style>
