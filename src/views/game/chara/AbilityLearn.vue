<template>
  <div>
    <el-table :data="available_to_learn_abilities">
      <el-table-column label="名稱" align="center" prop="name"></el-table-column>
      <el-table-column label="說明" align="center" prop="description"></el-table-column>
      <el-table-column label="消耗熟練度" align="center" prop="require_proficiency"></el-table-column>
      <el-table-column label="學習" align="center" prop="created_at">
        <template slot-scope="scope">
          <el-button type="primary" @click="learn_ability({ ability: scope.row.id })">學習</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "AbilityLearn",
    data() {
      return {};
    },
    computed: { ...mapState("ability", ["available_to_learn_abilities"]) },
    methods: { ...mapActions("ability", ["learn_ability"]) },
    mounted() {
      this.$store.dispatch("ability/get_available_to_learn_abilities");
    },
  };
</script>

<style lang="less" scoped></style>
