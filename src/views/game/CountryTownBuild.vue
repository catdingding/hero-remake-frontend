<template>
  <div>
    <div style="width: 100%;">
      建立城鎮需消耗10億金錢、50建國之石
    </div>
    <el-form :model="form_data" class="form">
      <el-form-item label="城鎮名稱" prop="name" required>
        <el-input v-model="form_data.name" maxlength="10" show-word-limit></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="build_town(form_data)">建立城鎮</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "CountryTownBuild",
    data() {
      return {
        form_data: { name: "" },
      };
    },
    computed: {},
    methods: { ...mapActions("country", ["build_town"]) },
    mounted() {},
  };
</script>

<style lang="less" scoped>
  form {
    text-align: center;
  }
</style>
