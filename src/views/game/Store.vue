<template>
  <div>
    <div class="store">
      <h2>架上商品</h2>
      <ItemTypeOptionTable :options="store_options">
        <template v-slot:extra-column>
          <el-table-column label="價格" align="center">
            <template slot-scope="scope">
              {{ scope.row.item_type.value | currency }}
            </template>
          </el-table-column>
          <el-table-column label="購買" align="center" width="150px">
            <template slot-scope="scope">
              <el-input-number size="mini" :min="1" v-model="scope.row.select_number"></el-input-number>
              <el-button
                type="primary"
                size="mini"
                @click="buy_store_option({ id: scope.row.id, number: scope.row.select_number })"
              >
                購買
              </el-button>
            </template>
          </el-table-column>
        </template>
      </ItemTypeOptionTable>
    </div>
    <div class="chara">
      <h2>背包</h2>
      <CharaWallet></CharaWallet>
      <ItemTable :items="chara_bag_items">
        <template v-slot:extra-column>
          <el-table-column label="出售價" align="center">
            <template slot-scope="scope">
              {{ (scope.row.type.value / 2) | currency }}
            </template>
          </el-table-column>
          <el-table-column label="出售" align="center" width="150px">
            <template slot-scope="scope">
              <el-input-number
                size="mini"
                :min="1"
                :max="scope.row.number"
                v-model="scope.row.select_number"
              ></el-input-number>
              <el-button
                type="primary"
                size="mini"
                @click="sell_item({ item: scope.row.id, number: scope.row.select_number })"
              >
                出售
              </el-button>
            </template>
          </el-table-column>
        </template>
      </ItemTable>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import ItemTable from "@/components/ItemTable.vue";
  import ItemTypeOptionTable from "@/components/ItemTypeOptionTable.vue";
  import CharaWallet from "@/components/CharaWallet.vue";
  export default {
    name: "Bag",
    data() {
      return {};
    },
    computed: { ...mapState("chara", ["chara_bag_items"]), ...mapState("trade", ["store_options"]) },
    methods: {
      ...mapActions("trade", ["sell_item", "buy_store_option"]),
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { omit: "", fields: "bag_items,gold,proficiency" });
      this.$store.dispatch("trade/get_store_options", { store_type: this.$route.params.store_type });
    },
    watch: {
      $route(to, from) {
        this.$store.dispatch("trade/get_store_options", { store_type: to.params.store_type });
      },
    },
    components: { ItemTable, ItemTypeOptionTable, CharaWallet },
  };
</script>

<style lang="less" scoped>
  .store {
    width: 48%;
  }
  .chara {
    width: 52%;
  }
</style>
