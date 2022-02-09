<template>
  <div>
    <el-table :data="skills">
      <el-table-column label="名稱" align="center" prop="name"></el-table-column>
      <el-table-column label="說明" align="center" prop="type.description"></el-table-column>
      <el-table-column label="威力" align="center" prop="power"></el-table-column>
      <el-table-column label="發動率(%)" align="center" prop="rate"></el-table-column>
      <el-table-column label="MP消耗" align="center" prop="mp_cost"></el-table-column>
      <el-table-column label="AP消耗" align="center" prop="action_cost"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "SkillList",
    data() {
      return {};
    },
    computed: { ...mapState("job", ["skills"]) },
    mounted() {
      this.$store.dispatch("job/get_skills");
    },
  };
</script>

<style lang="less" scoped></style>
