<template>
  <div>
    <div class="store">
      <h2>架上商品</h2>
      <ItemTypeOptionTable :options="exchange_options">
        <template v-slot:extra-th>
          <th>需求</th>
          <th class="table-input-number-th">兌換</th>
        </template>
        <template v-slot:extra-td="{ option }">
          <td>
            <div v-for="(requirement, index) in option.requirements" :key="index">
              {{ requirement.item_type.name }}×{{ requirement.number }}
            </div>
          </td>
          <td>
            <div>
              <el-input-number size="mini" :min="1" v-model="option.select_number"></el-input-number>
              <el-button
                type="primary"
                size="mini"
                @click="buy_exchange_option({ id: option.id, number: option.select_number })"
              >
                兌換
              </el-button>
            </div>
          </td>
        </template>
      </ItemTypeOptionTable>
    </div>
    <div class="chara">
      <h2>背包</h2>
      <ItemTable :items="chara_bag_items"> </ItemTable>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import ItemTypeOptionTable from "@/components/ItemTypeOptionTable.vue";
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
    components: { ItemTable, ItemTypeOptionTable },
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
