<template>
  <div>
    <table>
      <tr>
        <th>角色名稱</th>
        <th>申請時間</th>
        <th>批准</th>
        <th>拒絕</th>
      </tr>
      <tr v-for="request in team_join_requests" :key="request.id">
        <td>{{ request.chara.name }}</td>
        <td>{{ request.created_at }}</td>
        <td>
          <el-button type="primary" @click="review_team_join_request({ id: request.id, action: 'accept' })">
            批准
          </el-button>
        </td>
        <td>
          <el-button type="danger" @click="review_team_join_request({ id: request.id, action: 'reject' })">
            拒絕
          </el-button>
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
    methods: { ...mapActions("team", ["review_team_join_request"]) },
    mounted() {
      this.$store.dispatch("team/get_team_join_requests", {});
    },
  };
</script>

<style lang="less" scoped></style>
