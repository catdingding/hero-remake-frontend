<template>
  <div>
    <el-tabs model-value="first">
      <!-- 進行中 -->
      <el-tab-pane label="進行中收購" name="first">
        <el-table :data="active_purchases">
          <el-table-column label="收購物品類型" align="center">
            <template v-slot="scope">
              <el-tooltip effect="dark" :content="scope.row.item_type.description" placement="top">
                <i class="el-icon-info"></i>
              </el-tooltip>
              {{ scope.row.item_type.name }}
            </template>
          </el-table-column>
          <el-table-column label="收購數量" align="center">
            <template v-slot="scope">
              {{ scope.row.number }}
            </template>
          </el-table-column>
          <el-table-column label="收購者" align="center">
            <template v-slot="scope">
              {{ scope.row.buyer.name }}
            </template>
          </el-table-column>
          <el-table-column label="價格" align="center">
            <template v-slot="scope">
              {{ $filters.currency(scope.row.price) }}
            </template>
          </el-table-column>
          <el-table-column label="剩餘時間" align="center">
            <template v-slot="scope">
              <RelativeTime :time_string="scope.row.due_time" :period="1000"></RelativeTime>
            </template>
          </el-table-column>
          <el-table-column label="出售" align="center">
            <template v-slot="scope">
              <el-button type="primary" @click="sell_purchase(scope.row.id)">出售</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 上架 -->
      <el-tab-pane label="收購物品" name="second">
        <div>目前無法收購裝備。</div>
        <el-form :model="purchase_form_data" label-width="120px" label-position="left">
          <el-form-item label="物品類型" required>
            <el-select
              v-model="purchase_form_data.item_type"
              filterable
              remote
              placeholder="請輸入要收購的物品類型名稱"
              :remote-method="search_item_types_by_name"
            >
              <el-option
                v-for="item_type in search_result_item_types"
                :key="item_type.id"
                :label="item_type.name"
                :value="item_type.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="數量" required>
            <el-input-number v-model="purchase_form_data.number" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="價格" required>
            <InputNumber v-model="purchase_form_data.price" :min="1" size="large" width="180px"></InputNumber>
          </el-form-item>
          <el-form-item label="時長（小時）" required>
            <el-input-number v-model="purchase_form_data.hours" :min="1"></el-input-number>
          </el-form-item>
          <el-button type="primary" @click="create_purchase(purchase_form_data)">收購物品</el-button>
        </el-form>
      </el-tab-pane>
      <!-- 待辦 -->
      <el-tab-pane label="領取" name="third">
        <el-table :data="todo_purchases">
          <el-table-column label="收購項目" align="center">
            <template v-slot="scope">
              {{ scope.row.item_type.name }}
            </template>
          </el-table-column>
          <el-table-column label="金錢" align="center">
            <template v-slot="scope">
              {{ scope.row.price }}
            </template>
          </el-table-column>
          <el-table-column label="領取" align="center">
            <template v-slot="scope">
              <el-button type="primary" @click="receive_purchase(scope.row.id)">
                領取{{ scope.row.item ? "物品" : "金錢" }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import InputNumber from "@/components/InputNumber";

  export default {
    name: "PurchaseHouse",
    data() {
      return {
        purchase_form_data: {
          item_type: null,
          number: 1,
          price: 1,
          hours: 1,
        },
      };
    },
    computed: {
      ...mapState("search", ["search_result_item_types"]),
      ...mapState("trade", ["active_purchases", "todo_purchases"]),
      ...mapState("chara", ["chara_id"]),
    },
    methods: {
      ...mapActions("trade", ["create_purchase", "sell_purchase", "receive_purchase"]),
      ...mapActions("search", ["search_item_types"]),
      search_item_types_by_name(name) {
        this.search_item_types(Object.assign({ search: name }, this.conditions));
      },
    },
    mounted() {
      this.$store.dispatch("trade/get_active_purchases");
      this.$store.dispatch("chara/get_chara_profile", { fields: "gold,bag_items" });
      this.$store.dispatch("trade/get_todo_purchases");
    },
    components: { InputNumber },
  };
</script>

<style lang="less" scoped>
  .el-tabs {
    width: 100%;
  }
</style>
