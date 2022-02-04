<template>
  <div>
    <el-tabs value="first">
      <!-- 寄送物品 -->
      <el-tab-pane label="寄送物品" name="first">
        <el-form :model="parcel_form_data" label-width="120px" label-position="left">
          <el-form-item label="物品" required>
            <el-select v-model="parcel_form_data.item">
              <el-option
                v-for="item in chara_bag_items"
                :key="item.id"
                :label="item | item_string"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="數量" required>
            <el-input-number v-model="parcel_form_data.number" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="價格" required>
            <InputNumber v-model="parcel_form_data.price" :min="1" size="large" width="180px"></InputNumber>
          </el-form-item>
          <el-form-item label="收件者" required>
            <CharaSelect v-model="parcel_form_data.receiver"></CharaSelect>
          </el-form-item>
          <el-form-item label="訊息">
            <el-input v-model="parcel_form_data.message" :min="1"></el-input>
          </el-form-item>
          <el-button type="primary" @click="create_parcel(parcel_form_data)">寄送物品</el-button>
        </el-form>
      </el-tab-pane>
      <!-- 待處理包裹 -->
      <el-tab-pane label="待處理包裹" name="second">
        <el-table :data="todo_parcels">
          <el-table-column label="物品名稱" prop="item.name" align="center"> </el-table-column>
          <el-table-column label="數量" prop="item.number" align="center"> </el-table-column>
          <el-table-column label="費用" prop="price" align="center"></el-table-column>
          <el-table-column label="訊息" prop="message" align="center"></el-table-column>
          <el-table-column label="領取/取消" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="receive_parcel(scope.row.id)" v-if="scope.row.receiver.id === chara_id">
                領取包裹
              </el-button>
              <el-button type="primary" @click="cancel_parcel(scope.row.id)" v-else>收回包裹</el-button>
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
  import CharaSelect from "@/components/CharaSelect";

  export default {
    name: "Parcel",
    data() {
      return {
        parcel_form_data: {
          item: null,
          number: 1,
          price: 1,
          receiver: null,
          message: "",
        },
      };
    },
    computed: {
      ...mapState("trade", ["todo_parcels"]),
      ...mapState("chara", ["chara_id", "chara_bag_items"]),
    },
    methods: {
      ...mapActions("trade", ["create_parcel", "receive_parcel", "cancel_parcel"]),
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "bag_items" });
      this.$store.dispatch("trade/get_todo_parcels");
    },
    components: { InputNumber, CharaSelect },
  };
</script>

<style lang="less" scoped>
  .el-tabs {
    width: 100%;
  }
</style>
