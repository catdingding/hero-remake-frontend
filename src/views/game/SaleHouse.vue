<template>
  <div>
    <el-tabs value="first">
      <!-- 進行中拍賣 -->
      <el-tab-pane label="進行中拍賣" name="first">
        <ItemTable :data="active_sales" item_field="item">
          <template v-slot:extra-column>
            <el-table-column label="出售者" align="center">
              <template slot-scope="scope">
                {{ scope.row.seller.name }}
              </template>
            </el-table-column>
            <el-table-column label="價格" align="center">
              <template slot-scope="scope">
                {{ scope.row.price | currency }}
              </template>
            </el-table-column>
            <el-table-column label="剩餘時間" align="center">
              <template slot-scope="scope">
                <RelativeTime :time_string="scope.row.due_time" :period="1000"></RelativeTime>
              </template>
            </el-table-column>
            <el-table-column label="購買" align="center" width="150px">
              <template slot-scope="scope">
                <el-button type="primary" @click="buy_sale(scope.row.id)">購買</el-button>
              </template>
            </el-table-column>
          </template>
        </ItemTable>
      </el-tab-pane>
      <!-- 拍賣物品 -->
      <el-tab-pane label="出售物品" name="second">
        <el-form :model="sale_form_data" label-width="120px" label-position="left">
          <el-form-item label="物品" required>
            <el-select v-model="sale_form_data.item">
              <el-option
                v-for="item in chara_bag_items"
                :key="item.id"
                :label="item | item_string"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="數量" required>
            <el-input-number v-model="sale_form_data.number" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="價格" required>
            <el-input-number v-model="sale_form_data.price" :min="1"></el-input-number>
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
            <template slot-scope="scope">
              {{ scope.row.item.equipment ? scope.row.item.equipment.display_name : scope.row.item.type.name }}
            </template>
          </el-table-column>
          <el-table-column label="數量" align="center">
            <template slot-scope="scope">
              {{ scope.row.item.number }}
            </template>
          </el-table-column>
          <el-table-column label="領取" align="center">
            <template slot-scope="scope">
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
  import ItemTable from "@/components/ItemTable.vue";
  import InputNumberWithButton from "@/components/InputNumberWithButton";

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
      ...mapActions("trade", ["create_sale", "buy_sale", "receive_sale_item"]),
    },
    mounted() {
      this.$store.dispatch("trade/get_active_sales");
      this.$store.dispatch("chara/get_chara_profile", { omit: "", fields: "gold,bag_items" });
      this.$store.dispatch("trade/get_todo_sales");
    },
    components: { ItemTable },
  };
</script>

<style lang="less" scoped>
  .el-tabs {
    width: 100%;
  }
</style>
