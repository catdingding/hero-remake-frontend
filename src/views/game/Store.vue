<template>
  <div>
    <div class="store">
      <h2>架上商品</h2>
      <ItemTypeOptionTable :options="store_options">
        <template v-slot:extra-th>
          <th>價格</th>
          <th class="table-input-number-th">購買</th>
        </template>
        <template v-slot:extra-td="{ option }">
          <td>{{ option.item_type.value | currency }}</td>
          <td>
            <div>
              <el-input-number size="mini" :min="1" v-model="option.select_number"></el-input-number>
              <el-button
                type="primary"
                size="mini"
                @click="buy_store_option({ id: option.id, number: option.select_number })"
              >
                購買
              </el-button>
            </div>
          </td>
        </template>
      </ItemTypeOptionTable>
    </div>
    <div class="chara">
      <h2>背包</h2>
      <CharaWallet></CharaWallet>
      <ItemTable :items="chara_bag_items">
        <template v-slot:extra-th>
          <th>出售價</th>
          <th class="table-input-number-th">出售</th>
        </template>
        <template v-slot:extra-td="{ item }">
          <td>{{ (item.type.value / 2) | currency }}</td>
          <td>
            <div>
              <el-input-number size="mini" :min="1" :max="item.number" v-model="item.select_number"></el-input-number>
              <el-button type="primary" size="mini" @click="sell_item({ item: item.id, number: item.select_number })">
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
    width: 48%;
  }
</style>
