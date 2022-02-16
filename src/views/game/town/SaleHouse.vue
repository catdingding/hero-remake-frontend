<template>
  <div>
    <el-tabs model-value="first">
      <!-- 進行中拍賣 -->
      <el-tab-pane label="進行中拍賣" name="first">
        <PaginationItemTable :fetch-method="get_active_sales" item-field="item">
          <template v-slot:extra-column>
            <el-table-column label="出售者" align="center">
              <template v-slot="scope">
                {{ scope.row.seller.name }}
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
            <el-table-column label="購買" align="center" width="150px">
              <template v-slot="scope">
                <el-button type="primary" @click="buy_sale(scope.row.id)">購買</el-button>
              </template>
            </el-table-column>
          </template>
        </PaginationItemTable>
      </el-tab-pane>
      <!-- 拍賣物品 -->
      <el-tab-pane label="出售物品" name="second">
        <div>上架商品需支付價格1%的押金（至少10萬），出售成功後會退回。</div>
        <el-form :model="sale_form_data" label-width="120px" label-position="left">
          <el-form-item label="物品" required>
            <el-select v-model="sale_form_data.item">
              <el-option
                v-for="item in chara_bag_items"
                :key="item.id"
                :label="$filters.item_string(item)"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="數量" required>
            <el-input-number v-model="sale_form_data.number" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="價格" required>
            <InputNumber v-model="sale_form_data.price" :min="1" size="default" width="150px"></InputNumber>
          </el-form-item>
          <el-form-item label="時長（小時）" required>
            <el-input-number v-model="sale_form_data.hours" :min="1"></el-input-number>
          </el-form-item>
          <el-button type="primary" @click="create_sale(sale_form_data)">出售物品</el-button>
        </el-form>
      </el-tab-pane>
      <!-- 待辦拍賣 -->
      <el-tab-pane label="領取物品" name="third">
        <el-table :data="todo_sales">
          <el-table-column label="物品名稱" align="center">
            <template v-slot="scope">
              {{ scope.row.item.equipment ? scope.row.item.equipment.display_name : scope.row.item.type.name }}
            </template>
          </el-table-column>
          <el-table-column label="數量" align="center">
            <template v-slot="scope">
              {{ scope.row.item.number }}
            </template>
          </el-table-column>
          <el-table-column label="領取" align="center">
            <template v-slot="scope">
              <el-button type="primary" @click="receive_sale_item(scope.row.id)">領取物品</el-button>
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
  import PaginationItemTable from "@/components/PaginationItemTable";

  export default {
    name: "SaleHouse",
    data() {
      return {
        sale_form_data: {
          item: null,
          number: 1,
          price: 1,
          hours: 1,
        },
      };
    },
    computed: {
      ...mapState("trade", ["active_sales", "todo_sales"]),
      ...mapState("chara", ["chara_id", "chara_bag_items"]),
    },
    methods: {
      ...mapActions("trade", ["get_active_sales", "create_sale", "buy_sale", "receive_sale_item"]),
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "gold,bag_items" });
      this.$store.dispatch("trade/get_todo_sales");
    },
    components: { PaginationItemTable, InputNumber },
  };
</script>

<style lang="less" scoped>
  .el-tabs {
    width: 100%;
  }
</style>
