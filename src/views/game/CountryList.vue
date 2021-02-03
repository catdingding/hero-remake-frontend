<template>
  <div>
    <table>
      <tr>
        <th>國家名稱</th>
        <th>國王</th>
        <th>資金</th>
        <th>城鎮數</th>
        <th>建立時間</th>
        <th>申請加入</th>
      </tr>
      <tr v-for="country in search_result_countries" :key="country.id">
        <td>{{ country.name }}</td>
        <td>{{ country.king_name }}</td>
        <td>{{ country.gold }}</td>
        <td>{{ country.town_count }}</td>
        <td>{{ country.created_at }}</td>
        <td>
          <el-button type="primary" @click="create_country_join_request({ country: country.id })">申請加入</el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "CountryList",
    data() {
      return {};
    },
    computed: { ...mapState("search", ["search_result_countries"]) },
    methods: { ...mapActions("country", ["create_country_join_request"]) },
    mounted() {
      this.$store.dispatch("search/search_countries", {});
    }
  };
</script>

<style lang="less" scoped></style>
