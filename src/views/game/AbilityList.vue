<template>
  <div>
    <el-table :data="abilities">
      <el-table-column label="名稱" align="center" prop="name"></el-table-column>
      <el-table-column label="說明" align="center" prop="description"></el-table-column>
      <el-table-column label="學習消耗熟練度" align="center" prop="require_proficiency">
        <template v-slot="scope">
          {{ scope.row.attribute_type ? scope.row.require_proficiency : "無法學習" }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "AbilityList",
    data() {
      return {};
    },
    computed: { ...mapState("ability", ["abilities"]) },
    mounted() {
      this.$store.dispatch("ability/get_abilities");
    },
  };
</script>

<style lang="less" scoped></style>
