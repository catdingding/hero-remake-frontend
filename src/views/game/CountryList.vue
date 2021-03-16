<template>
  <div>
    <el-table :data="search_result_countries">
      <el-table-column label="國家名稱" align="center" prop="name"> </el-table-column>
      <el-table-column label="國王" align="center" prop="king_name"> </el-table-column>
      <el-table-column label="資金" align="center" prop="gold"> </el-table-column>
      <el-table-column label="城鎮數" align="center" prop="town_count"> </el-table-column>
      <el-table-column label="建立時間" align="center" prop="created_at">
        <template slot-scope="scope">
          {{ scope.row.created_at | datetime_display }}
        </template>
      </el-table-column>
      <el-table-column label="申請加入" align="center" v-if="!chara_country">
        <template slot-scope="scope">
          <el-button type="primary" @click="create_country_join_request({ country: scope.row.id })">申請加入</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "CountryList",
    data() {
      return {};
    },
    computed: { ...mapState("search", ["search_result_countries"]), ...mapState("chara", ["chara_country"]) },
    methods: { ...mapActions("country", ["create_country_join_request"]) },
    mounted() {
      this.$store.dispatch("search/search_countries", {});
      this.$store.dispatch("chara/get_chara_profile", { fields: "country" });
    },
  };
</script>

<style lang="less" scoped></style>
