<template>
  <div>
    <div style="width: 100%;">
      獻祭物品，召喚其他角色助戰
    </div>
    <el-form :model="form_data" class="form">
      <el-form-item label="物品" required>
        <el-select v-model="form_data.item">
          <el-option
            v-for="item in chara_bag_items"
            :key="item.id"
            :label="item | item_string"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提供數量" required>
        <InputNumber v-model="form_data.number" :min="0"></InputNumber>
      </el-form-item>
      <el-form-item label="召喚對象" required>
        <CharaSelect v-model="form_data.chara" placeholder="請輸入召喚對象"></CharaSelect>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit_altar(form_data)">獻祭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import InputNumber from "@/components/InputNumber";
  import CharaSelect from "@/components/CharaSelect";

  export default {
    name: "Altar",
    data() {
      return {
        form_data: { item: null, number: 1, chara: null },
      };
    },
    computed: { ...mapState("chara", ["chara_bag_items"]) },
    methods: { ...mapActions("town", ["submit_altar"]) },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "bag_items" });
    },
    components: { InputNumber, CharaSelect },
  };
</script>

<style lang="less" scoped>
  form {
    text-align: center;
  }
</style>
