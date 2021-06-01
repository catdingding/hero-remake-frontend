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
          <el-select v-model="register_data.chara.element_type" style="width:200px">
            <el-option v-for="item in element_types" :value="item.id" :key="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上傳頭像" prop="chara_avatar">
          <el-upload
            action=""
            class="avatar-uploader"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="change_chara_avatar"
          >
            <img v-if="register_data.chara_avatar" :src="chara_avatar_object_url" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
      login: function() {
        this.$store.dispatch("login", this.login_data);
      },
      register: function() {
        this.$refs.register_form.validate((valid) => {
          if (valid) {
            this.$store.dispatch("register", this.register_data);
          }
        });
      },
      change_chara_avatar(file, fileList) {
        const type_check = file.raw.type === "image/jpeg" || file.raw.type === "image/png";
        const size_check = file.raw.size / 1024 / 1024 < 2;

        if (!type_check) {
          this.$message.error("頭像只能使用jpg或png格式");
          return;
        }
        if (!size_check) {
          this.$message.error("圖片不能超過2MB");
          return;
        }

        this.chara_avatar_object_url = URL.createObjectURL(file.raw);
        this.register_data.chara_avatar = file.raw;
      },
    },
    computed: mapState(["element_types"]),
    mounted: function() {
      this.$store.dispatch("refresh_element_types");
    },
  };
</script>
<style lang="less" scoped>
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 250px;
    height: 250px;
  }
  .avatar-uploader:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 250px;
    height: 250px;
    line-height: 250px;
    text-align: center;
  }
  .avatar {
    width: 250px;
    height: 250px;
    display: block;
    object-fit: cover;
  }
</style>
