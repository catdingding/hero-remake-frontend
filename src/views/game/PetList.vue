<template>
  <div>
    <el-table :data="pet_types">
      <el-table-column label="名稱" align="center" prop="item_type.name"></el-table-column>
      <el-table-column label="屬性" align="center" prop="item_type.element_type.name"></el-table-column>
      <el-table-column label="攻擊" align="center" prop="item_type.attack"></el-table-column>
      <el-table-column label="防禦" align="center" prop="item_type.defense"> </el-table-column>
      <el-table-column label="重量" align="center" prop="item_type.weight"> </el-table-column>
      <el-table-column label="攻擊成長" align="center" prop="attack_growth"></el-table-column>
      <el-table-column label="防禦成長" align="center" prop="defense_growth"> </el-table-column>
      <el-table-column label="重量成長" align="center" prop="weight_growth"> </el-table-column>
      <el-table-column label="升級花費熟練" align="center" prop="upgrade_proficiency_cost"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "PetList",
    data() {
      return {};
    },
    computed: { ...mapState("item", ["pet_types"]) },
    mounted() {
      this.$store.dispatch("item/get_pet_types");
    },
  };
</script>

<style lang="less" scoped></style>
