<template>
  <div>
    <el-form :model="form_data" class="form">
      <el-form-item label="隊伍名稱" prop="name" required>
        <el-input v-model="form_data.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="found_team(form_data)">建立</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "TeamFound",
    data() {
      return {
        form_data: { name: "" },
      };
    },
    computed: {},
    methods: { ...mapActions("team", ["found_team"]) },
    mounted() {},
  };
</script>

<style lang="less" scoped>
  form {
    text-align: center;
  }
</style>
