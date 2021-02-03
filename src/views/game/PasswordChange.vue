<template>
  <div>
    <el-form :model="form_data" class="form">
      <el-form-item label="舊密碼" prop="old_password" required>
        <el-input type="password" v-model="form_data.old_password" show-password> </el-input>
      </el-form-item>
      <el-form-item label="新密碼" prop="new_password1" required>
        <el-input type="password" v-model="form_data.new_password1" show-password> </el-input>
      </el-form-item>
      <el-form-item label="確認新密碼" prop="new_password2" required>
        <el-input type="password" v-model="form_data.new_password2" show-password> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="change_password(form_data)">更改密碼</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "PasswordChange",
    data() {
      return {
        form_data: { old_password: "", new_password1: "", new_password2: "" }
      };
    },
    computed: {},
    methods: {
      ...mapActions("user", ["change_password"])
    },
    mounted() {}
  };
</script>

<style lang="less" scoped>
  form {
    text-align: center;
  }
</style>
