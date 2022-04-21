<template>
  <el-tabs>
    <el-tab-pane label="登入">
      <el-form label-width="80px" :rules="login_validate" :model="login_data">
        <el-form-item label="Email" prop="email">
          <el-input placeholder v-model="login_data.email"></el-input>
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input placeholder type="password" v-model="login_data.password"></el-input>
        </el-form-item>
        <div style="text-align: center">
          <el-button type="primary" @click="login">登入</el-button>
        </div>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="註冊">
      <el-form label-width="80px" ref="register_form" :rules="register_validate" :model="register_data">
        <el-form-item label="Email" prop="email">
          <el-input placeholder v-model="register_data.email"></el-input>
        </el-form-item>
        <el-form-item label="密碼" prop="password1">
          <el-input placeholder type="password" v-model="register_data.password1"></el-input>
        </el-form-item>
        <el-form-item label="確認密碼" prop="password2">
          <el-input placeholder type="password" v-model="register_data.password2"></el-input>
        </el-form-item>
        <el-form-item label="昵稱" prop="chara.name">
          <el-input placeholder v-model="register_data.chara.name" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="元素屬性" prop="chara.element_type">
          <el-select v-model="register_data.chara.element_type" style="width: 200px">
            <el-option v-for="item in element_types" :value="item.id" :key="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上傳頭像" prop="chara_avatar">
          <AvatarInput @change="register_data.chara_avatar = $event"></AvatarInput>
        </el-form-item>
        <div style="text-align: center">註冊前請先閱讀<a :href="rule_url" target="_blank">遊戲規章</a></div>
        <div style="text-align: center">
          <el-button type="primary" @click="register">註冊</el-button>
        </div>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import { mapState } from "vuex";
  import AvatarInput from "@/components/AvatarInput";
  export default {
    data() {
      return {
        rule_url: process.env.VUE_APP_RULE_URL,
        login_data: {
          email: "",
          password: "",
        },
        register_data: {
          email: "",
          password1: "",
          password2: "",
          chara: {
            name: "",
            element_type: "",
          },
          chara_avatar: null,
        },
        chara_avatar_object_url: null,
        login_validate: {
          email: [
            { required: true, message: "請輸入 Email", trigger: "blur" },
            { type: "email", message: "Email 格式錯誤", trigger: "blur" },
          ],
          password: [{ required: true, message: "請輸入密碼", trigger: "blur" }],
        },
        register_validate: {
          "chara.name": [{ required: true, message: "請填昵稱", trigger: "blur" }],
          "chara.element_type": [{ required: true, message: "請選擇屬性", trigger: "blur" }],
          chara_avatar: [{ required: true, message: "請上傳頭像" }],
          email: [
            { required: true, message: "請填寫 Email", trigger: "blur" },
            { type: "email", message: "Email 格式錯誤", trigger: "blur" },
          ],
          password1: [{ required: true, message: "請填寫密碼", trigger: "blur" }],
          password2: [{ required: true, message: "請再次填寫密碼", trigger: "blur" }],
        },
      };
    },
    methods: {
      login: function () {
        this.$store.dispatch("login", this.login_data);
      },
      register: function () {
        this.$refs.register_form.validate((valid) => {
          if (valid) {
            this.$store.dispatch("register", this.register_data);
          }
        });
      },
    },
    computed: mapState(["element_types"]),
    components: { AvatarInput },
  };
</script>
<style lang="less" scoped></style>
