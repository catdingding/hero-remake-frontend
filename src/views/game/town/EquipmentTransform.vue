<template>
  <div>
    <div>
      <HintBlock>
        <div style="width: 100%;">
          原材料：三件同部位(不可為寵物)、不同類型的裝備<br />
          稀有率：保底20%，原料每個稀有+30%機率<br />
          取值：常態分佈，攻防重各自計算，均值=三件平均數值、標準差=三件平均數值*0.25，無視強化效果<br />
          屬性：三件裝備隨機取一<br />
          奧義：兩個位置皆自三件裝備的對應位置隨機選取<br />
          警告：透過轉換所生成的裝備，無法再次投入轉換
        </div>
      </HintBlock>
      <el-form :model="form_data" class="form">
        <el-form-item label="裝備1" prop="item_1" required>
          <el-select v-model="form_data.item_1">
            <template v-for="item in chara_bag_items">
              <el-option
                v-if="item.type.category == 1"
                :key="item.id"
                :label="$filters.item_string(item)"
                :value="item.id"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="裝備2" prop="item_2" required>
          <el-select v-model="form_data.item_2">
            <template v-for="item in chara_bag_items">
              <el-option
                v-if="item.type.category == 1"
                :key="item.id"
                :label="$filters.item_string(item)"
                :value="item.id"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="裝備3" prop="item_3" required>
          <el-select v-model="form_data.item_3">
            <template v-for="item in chara_bag_items">
              <el-option
                v-if="item.type.category == 1"
                :key="item.id"
                :label="$filters.item_string(item)"
                :value="item.id"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="transform_quipment(form_data)">轉換</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "EquipmentTransform",
    data() {
      return {
        form_data: { item_1: null, item_2: null, item_3: null },
      };
    },
    computed: { ...mapState("chara", ["chara_bag_items"]) },
    methods: { ...mapActions("item", ["transform_quipment"]) },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "bag_items" });
    },
  };
</script>

<style lang="less" scoped>
  form {
    text-align: center;
  }
</style>
