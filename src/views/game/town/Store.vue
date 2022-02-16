<template>
  <div>
    <div class="store">
      <h2 class="page-block-title">架上商品</h2>
      <ItemTypeOptionTable :options="store_options">
        <template v-slot:extra-column>
          <el-table-column label="價格" align="center">
            <template v-slot="scope">
              {{ $filters.currency(scope.row.price) }}
            </template>
          </el-table-column>
          <el-table-column label="購買" align="center" width="120px">
            <template v-slot="scope">
              <InputNumberWithButton
                text="購買"
                @click="buy_store_option({ id: scope.row.id, number: $event }).then(() => $refs.bag_item_table.fetch())"
              >
              </InputNumberWithButton>
            </template>
          </el-table-column>
        </template>
      </ItemTypeOptionTable>
    </div>
    <div class="chara">
      <h2 class="page-block-title">背包（{{ bag_item_total }}/{{ chara_bag_item_limit }}）</h2>
      <CharaWallet></CharaWallet>
      <PaginationItemTable
        :fetch-method="get_bag_items"
        ref="bag_item_table"
        @change="bag_item_total = $refs.bag_item_table.total"
      >
        <template v-slot:extra-column>
          <el-table-column label="出售價" align="center">
            <template v-slot="scope">
              {{ $filters.currency(scope.row.type.value / 2) }}
            </template>
          </el-table-column>
          <el-table-column label="出售" align="center" width="120px">
            <template v-slot="scope">
              <InputNumberWithButton
                text="出售"
                type="danger"
                :max="scope.row.number"
                @click="sell_item({ item: scope.row.id, number: $event }).then(() => $refs.bag_item_table.fetch())"
              >
              </InputNumberWithButton>
            </template>
          </el-table-column>
        </template>
      </PaginationItemTable>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import PaginationItemTable from "@/components/PaginationItemTable.vue";
  import ItemTypeOptionTable from "@/components/ItemTypeOptionTable.vue";
  import CharaWallet from "@/components/CharaWallet.vue";
  import InputNumberWithButton from "@/components/InputNumberWithButton";

  export default {
    name: "Bag",
    data() {
      return { bag_item_total: 0 };
    },
    computed: {
      ...mapState("chara", ["chara_bag_item_limit"]),
      ...mapState("trade", ["store_options"]),
    },
    methods: {
      ...mapActions("trade", ["sell_item", "buy_store_option"]),
      ...mapActions("item", ["get_bag_items"]),
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "bag_item_limit,gold,proficiency" });
      this.$store.dispatch("trade/get_store_options", { store_type: this.$route.params.store_type });
    },
    watch: {
      $route(to, from) {
        if (to.path.includes("/game/town/store")) {
          this.$store.dispatch("trade/get_store_options", { store_type: to.params.store_type });
        }
      },
    },
    components: { PaginationItemTable, ItemTypeOptionTable, CharaWallet, InputNumberWithButton },
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
