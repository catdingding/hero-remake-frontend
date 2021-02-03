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
        <el-form-item>
          <el-button type="primary" size="medium" @click="login">登入</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="註冊">
      <el-form label-width="80px" :rules="register_validate" :model="register_data">
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
          <el-input placeholder v-model="register_data.chara.name"></el-input>
        </el-form-item>
        <el-form-item label="元素屬性" prop="element_type">
          <el-select v-model="register_data.chara.element_type" style="width:200px">
            <el-option v-for="item in element_types" :value="item.id" :key="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="register">註冊</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import { mapState } from "vuex";
  export default {
    data() {
      return {
        login_data: {
          email: "",
          password: ""
        },
        register_data: {
          email: "",
          password1: "",
          password2: "",
          chara: {
            name: "",
            element_type: ""
          }
        },
        login_validate: {
          email: [
            { required: true, message: "請輸入 Email", trigger: "blur" },
            { type: "email", message: "Email 格式錯誤", trigger: "blur" }
          ],
          password: [{ required: true, message: "請輸入密碼", trigger: "blur" }]
        },
        register_validate: {
          "chara.name": [{ required: true, message: "請填昵稱", trigger: "blur" }],
          email: [
            { required: true, message: "請填寫 Email", trigger: "blur" },
            { type: "email", message: "Email 格式錯誤", trigger: "blur" }
          ],
          password1: [{ required: true, message: "請填寫密碼", trigger: "blur" }],
          password2: [{ required: true, message: "請再次填寫密碼", trigger: "blur" }]
        }
      };
    },
    methods: {
      login: function() {
        this.$store.dispatch("login", this.login_data).then(async res => {
          this.$message.success("登入成功");
          await this.$store.dispatch("get_available_charas");
          await this.$store.commit("set_chara");
          this.$router.push("game/");
        });
      },
      register: function() {
        this.$store.dispatch("register", this.register_data).then(async res => {
          this.$message.success("註冊成功");
          await this.$store.dispatch("get_available_charas");
          await this.$store.commit("set_chara");
          this.$router.push("game/");
        });
      }
    },
    computed: mapState(["element_types"]),
    mounted: function() {
      this.$store.dispatch("refresh_element_types");
    }
  };
</script>
