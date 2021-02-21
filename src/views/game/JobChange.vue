<template>
  <div>
    <el-table :data="available_jobs">
      <el-table-column label="系別" align="center" prop="attribute_type.class_name"></el-table-column>
      <el-table-column label="位階" align="center" prop="rank"></el-table-column>
      <el-table-column label="名稱" align="center" prop="name"></el-table-column>
      <el-table-column label="說明" align="center" prop="description"></el-table-column>
      <el-table-column label="轉職" align="center" prop="created_at">
        <template slot-scope="scope">
          <el-button type="primary" @click="change_job({ job: scope.row.id })">轉職</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "JobChange",
    data() {
      return {};
    },
    computed: { ...mapState("job", ["available_jobs"]) },
    methods: { ...mapActions("job", ["change_job"]) },
    mounted() {
      this.$store.dispatch("job/get_available_jobs", {});
    },
  };
</script>

<style lang="less" scoped></style>
