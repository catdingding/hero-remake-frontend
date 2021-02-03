<template>
  <div>
    <div style="width: 100%;">
      建立國家需消耗50億金錢、50建國之石
    </div>
    <el-form :model="form_data" class="form">
      <el-form-item label="國家名稱" prop="name" required>
        <el-input v-model="form_data.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="found_country(form_data)">建國</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "CountryFound",
    data() {
      return {
        form_data: { name: "" }
      };
    },
    computed: {},
    methods: { ...mapActions("country", ["found_country"]) },
    mounted() {}
  };
</script>

<style lang="less" scoped>
  form {
    text-align: center;
  }
</style>
