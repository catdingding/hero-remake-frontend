<template>
  <div>
    <el-table :data="search_result_countries">
      <el-table-column label="國家名稱" align="center" prop="name"> </el-table-column>
      <el-table-column label="國王" align="center" prop="king.name"> </el-table-column>
      <el-table-column label="資金" align="center" prop="gold"> </el-table-column>
      <el-table-column label="領土數" align="center" prop="location_count"> </el-table-column>
      <el-table-column label="國民數" align="center" prop="citizen_count"> </el-table-column>
      <el-table-column label="建立時間" align="center" prop="created_at">
        <template v-slot="scope">
          {{ $filters.datetime_display(scope.row.created_at) }}
        </template>
      </el-table-column>
      <el-table-column label="申請加入" align="center" v-if="!chara_country">
        <template v-slot="scope">
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
      this.$store.dispatch("search/search_countries", { expand: "king" });
      this.$store.dispatch("chara/get_chara_profile", { fields: "country" });
    },
  };
</script>

<style lang="less" scoped></style>
