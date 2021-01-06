<template>
  <div>
    <div class="store">
      <h2>出售商品</h2>
      <StoreOptionTable :options="store_options"> </StoreOptionTable>
    </div>
    <div class="chara" v-if="chara_profile && chara_profile.bag_items">
      <h2>背包</h2>
      <ItemTable :items="chara_profile.bag_items">
        <template v-slot:extra-th>
          <th>出售價</th>
          <th>出售</th>
        </template>
        <template v-slot:extra-td="{ item }">
          <td>{{ item.type.value / 2 }}</td>
          <td>
            <div>
              <el-input-number :min="1" v-model="item.select_number"></el-input-number>
              <el-button type="primary" @click="sell_item({ item: item.id, number: item.select_number })">
                出售
              </el-button>
            </div>
          </td>
        </template>
      </ItemTable>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import ItemTable from "@/components/ItemTable.vue";
  import StoreOptionTable from "@/components/StoreOptionTable.vue";
  export default {
    name: "Bag",
    data() {
      return {};
    },
    computed: { ...mapState(["chara_profile"]), ...mapState("trade", ["store_options"]) },
    methods: {
      ...mapActions("trade", ["sell_item"])
    },
    mounted() {
      this.$store.dispatch("get_chara_profile", { omit: "", fields: "bag_items,gold" });
      this.$store.dispatch("trade/get_store_options", { store_type: this.$route.params.store_type });
    },
    watch: {
      $route(to, from) {
        this.$store.dispatch("trade/get_store_options", { store_type: to.params.store_type });
      }
    },
    components: { ItemTable, StoreOptionTable }
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
