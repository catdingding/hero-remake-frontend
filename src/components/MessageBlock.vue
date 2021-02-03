<template>
  <el-card>
    <div slot="header">{{ title }}</div>
    <el-input v-model="content" placeholder="輸入訊息" v-on:keyup.enter.native="send_chat_message"></el-input>
    <CharaSelect v-model="receiver" v-if="needReceiver"></CharaSelect>
    <el-button type="primary" @click="send_chat_message">送出</el-button>
    <div class="message-box">
      <div v-for="(message, index) in reversed_messages" :key="index">
        {{ message.sender_profile.name }}：{{ message.content }}
      </div>
    </div>
  </el-card>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import CharaSelect from "@/components/CharaSelect.vue";
  export default {
    name: "MessageBlock",
    data() {
      return { content: "", receiver: null };
    },
    props: {
      title: { type: String },
      channel: { type: String },
      messages: { type: Array },
      needReceiver: { type: Boolean, default: false },
    },
    methods: {
      send_chat_message() {
        if (this.content === "" || (this.needReceiver && this.receiver === null)) {
          return;
        }

        var data = { channel: this.channel, content: this.content };
        if (this.needReceiver) {
          data["receiver"] = this.receiver;
        }
        this.$store.dispatch("ws/send_chat_message", data);
        this.content = "";
      },
    },
    computed: {
      reversed_messages() {
        return this.messages.slice().reverse();
      },
    },
    components: { CharaSelect },
  };
</script>

<style lang="less" scoped>
  .message-box {
    height: 500px;
    overflow-y: scroll;
  }

  .el-card {
    margin-top: 30px;
  }
</style>
