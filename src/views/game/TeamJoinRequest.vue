<template>
  <div>
    <table>
      <tr>
        <th>角色名稱</th>
        <th>申請時間</th>
        <th>批准</th>
      </tr>
      <tr v-for="request in team_join_requests" :key="request.id">
        <td>{{ request.chara.name }}</td>
        <td>{{ request.created_at }}</td>
        <td>
          <el-button type="primary" @click="approve_team_join_request(request.id)">批准</el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "TeamJoinRequest",
    data() {
      return {};
    },
    computed: { ...mapState("team", ["team_join_requests"]) },
    methods: { ...mapActions("team", ["approve_team_join_request"]) },
    mounted() {
      this.$store.dispatch("team/get_team_join_requests", {});
    },
  };
</script>

<style lang="less" scoped></style>
