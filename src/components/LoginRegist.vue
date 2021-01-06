<template>
  <Tabs>
    <TabPane label="登入">
      <Form :label-width="80" :rules="login_validate" :model="login_data">
        <FormItem label="Email" prop="email">
          <Input placeholder v-model="login_data.email"></Input>
        </FormItem>
        <FormItem label="密碼" prop="password">
          <Input placeholder type="password" v-model="login_data.password"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" size="large" @click="login">登入</Button>
        </FormItem>
      </Form>
    </TabPane>
    <TabPane label="註冊">
      <Form :label-width="80" :rules="register_validate" :model="register_data">
        <FormItem label="Email" prop="email">
          <Input placeholder v-model="register_data.email"></Input>
        </FormItem>
        <FormItem label="密碼" prop="password1">
          <Input placeholder type="password" v-model="register_data.password1"></Input>
        </FormItem>
        <FormItem label="確認密碼" prop="password2">
          <Input placeholder type="password" v-model="register_data.password2"></Input>
        </FormItem>
        <FormItem label="昵稱" prop="chara.name">
          <Input placeholder v-model="register_data.chara.name"></Input>
        </FormItem>
        <FormItem label="元素屬性" prop="element_type">
          <Select v-model="register_data.chara.element_type" style="width:200px">
            <Option v-for="item in element_types" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" size="large" @click="register">註冊</Button>
        </FormItem>
      </Form>
    </TabPane>
  </Tabs>
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
        this.$store
          .dispatch("login", this.login_data)
          .then(async res => {
            this.$Message.success("登入成功");
            await this.$store.dispatch("get_available_charas");
            await this.$store.commit("set_chara");
            this.$router.push("game/");
          })
          .catch(err => this.$Message.error("登入失敗"));
      },
      register: function() {
        this.$store
          .dispatch("register", this.register_data)
          .then(async res => {
            this.$Message.success("註冊成功");
            await this.$store.dispatch("get_available_charas");
            await this.$store.commit("set_chara");
            this.$router.push("game/");
          })
          .catch(err =>
            this.$Message.error({
              content: JSON.stringify(err.response.data),
              duration: 10
            })
          );
      }
    },
    computed: mapState(["element_types"]),
    mounted: function() {
      this.$store.dispatch("refresh_element_types");
    }
  };
</script>
