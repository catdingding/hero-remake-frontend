<template>
  <div>
    <el-table :data="search_result_teams">
      <el-table-column label="隊伍名稱" align="center" prop="name"> </el-table-column>
      <el-table-column label="隊長" align="center" prop="leader.name"> </el-table-column>
      <el-table-column label="人數" align="center" prop="member_count"> </el-table-column>
      <el-table-column label="申請加入" align="center" v-if="!chara_team">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="create_team_join_request({ team: scope.row.id })"
            :disabled="scope.row.member_count >= 3"
          >
            申請加入
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "TeamList",
    data() {
      return {};
    },
    computed: { ...mapState("search", ["search_result_teams"]), ...mapState("chara", ["chara_team"]) },
    methods: { ...mapActions("team", ["create_team_join_request"]) },
    mounted() {
      this.$store.dispatch("search/search_teams", { omit: "members" });
      this.$store.dispatch("chara/get_chara_profile", { fields: "team" });
    },
  };
</script>

<style lang="less" scoped></style>
