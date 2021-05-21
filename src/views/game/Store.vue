<template>
  <div>
    <div class="store">
      <h2 class="page-block-title">架上商品</h2>
      <ItemTypeOptionTable :options="store_options">
        <template v-slot:extra-column>
          <el-table-column label="價格" align="center">
            <template slot-scope="scope">
              {{ scope.row.item_type.value | currency }}
            </template>
          </el-table-column>
          <el-table-column label="購買" align="center" width="150px">
            <template slot-scope="scope">
              <InputNumberWithButton text="購買" @click="buy_store_option({ id: scope.row.id, number: $event })">
              </InputNumberWithButton>
            </template>
          </el-table-column>
        </template>
      </ItemTypeOptionTable>
    </div>
    <div class="chara">
      <h2 class="page-block-title">背包（{{ chara_bag_items.length }}/{{ chara_bag_item_limit }}）</h2>
      <CharaWallet></CharaWallet>
      <ItemTable :data="chara_bag_items">
        <template v-slot:extra-column>
          <el-table-column label="出售價" align="center">
            <template slot-scope="scope">
              {{ (scope.row.type.value / 2) | currency }}
            </template>
          </el-table-column>
          <el-table-column label="出售" align="center" width="150px">
            <template slot-scope="scope">
              <InputNumberWithButton
                text="出售"
                :max="scope.row.number"
                @click="sell_item({ item: scope.row.id, number: $event })"
              >
              </InputNumberWithButton>
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
  import InputNumberWithButton from "@/components/InputNumberWithButton";

  export default {
    name: "Bag",
    data() {
      return {};
    },
    computed: {
      ...mapState("chara", ["chara_bag_item_limit", "chara_bag_items"]),
      ...mapState("trade", ["store_options"]),
    },
    methods: {
      ...mapActions("trade", ["sell_item", "buy_store_option"]),
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "bag_item_limit,bag_items,gold,proficiency" });
      this.$store.dispatch("trade/get_store_options", { store_type: this.$route.params.store_type });
    },
    watch: {
      $route(to, from) {
        this.$store.dispatch("trade/get_store_options", { store_type: to.params.store_type });
      },
    },
    components: { ItemTable, ItemTypeOptionTable, CharaWallet, InputNumberWithButton },
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
