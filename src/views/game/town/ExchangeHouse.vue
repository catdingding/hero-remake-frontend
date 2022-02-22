<template>
  <div>
    <div class="store">
      <h2 class="page-block-title">架上商品</h2>
      <ItemTypeOptionTable :options="exchange_options">
        <template v-slot:extra-column>
          <el-table-column label="需求" align="center">
            <template v-slot="scope">
              <div v-for="(requirement, index) in scope.row.requirements" :key="index">
                <el-tooltip effect="dark" :content="requirement.item_type.description" placement="top">
                  <i class="el-icon-info"></i>
                </el-tooltip>
                {{ requirement.item_type.name }}×{{ requirement.number }}<br />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="兌換" align="center" width="120px">
            <template v-slot="scope">
              <InputNumberWithButton
                text="兌換"
                @click="
                  buy_exchange_option({ id: scope.row.id, number: $event }).then(() => $refs.bag_item_table.fetch())
                "
              >
              </InputNumberWithButton>
            </template>
          </el-table-column>
        </template>
      </ItemTypeOptionTable>
    </div>
    <div class="chara">
      <h2 class="page-block-title">背包</h2>
      <PaginationItemTable ref="bag_item_table" :fetch-method="get_bag_items"> </PaginationItemTable>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import ItemTypeOptionTable from "@/components/ItemTypeOptionTable.vue";
  import PaginationItemTable from "@/components/PaginationItemTable.vue";
  import InputNumberWithButton from "@/components/InputNumberWithButton";

  export default {
    name: "ExchangeHouse",
    data() {
      return {};
    },
    computed: { ...mapState("trade", ["exchange_options"]) },
    methods: {
      ...mapActions("trade", ["buy_exchange_option"]),
      ...mapActions("item", ["get_bag_items"]),
    },
    mounted() {
      this.$store.dispatch("trade/get_exchange_options");
    },
    components: { PaginationItemTable, ItemTypeOptionTable, InputNumberWithButton },
  };
</script>

<style lang="less" scoped>
  .store {
    width: 48%;
  }
  .chara {
    width: 48%;
  }
  @media screen and (max-width: 768px) {
    .router-view > div {
      width: 100%;
    }
  }
</style>
