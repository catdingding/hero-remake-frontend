<template>
  <div>
    <table>
      <tr>
        <th>角色名稱</th>
        <th>申請時間</th>
        <th>批准</th>
        <th>拒絕</th>
      </tr>
      <tr v-for="request in country_join_requests" :key="request.id">
        <td>{{ request.chara_name }}</td>
        <td>{{ request.created_at }}</td>
        <td>
          <el-button type="primary" @click="review_country_join_request({ id: request.id, action: 'accept' })">
            批准
          </el-button>
        </td>
        <td>
          <el-button type="danger" @click="review_country_join_request({ id: request.id, action: 'reject' })">
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
    name: "CountryJoinRequest",
    data() {
      return {};
    },
    computed: { ...mapState("country", ["country_join_requests"]) },
    methods: { ...mapActions("country", ["review_country_join_request"]) },
    mounted() {
      this.$store.dispatch("country/get_country_join_requests", {});
    },
  };
</script>

<style lang="less" scoped></style>
