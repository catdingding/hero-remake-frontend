<template>
  <div>
    <el-input
      v-if="need_input"
      v-model="content"
      placeholder="輸入訊息"
      :maxlength="100"
      show-word-limit
      v-on:keypress.enter="send_chat_message"
    ></el-input>
    <el-select v-if="channel === 'all'" v-model="target_channel" class="channel">
      <el-option
        v-for="channel in channels.filter((x) => x.need_input && x.name !== 'all')"
        :key="channel.name"
        :value="channel.name"
        :label="channel.display_name"
      >
      </el-option>
    </el-select>
    <CharaSelect v-if="need_receiver" v-model="receiver"></CharaSelect>
    <el-button v-if="need_input" type="primary" @click="send_chat_message">送出</el-button>
    <div class="message-box">
      <ChatMessage v-for="(message, index) in messages" :key="index" :message="message" @reply="set_reply_target">
      </ChatMessage>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import CharaSelect from "@/components/CharaSelect.vue";
  import ChatMessage from "@/components/ChatMessage.vue";
  export default {
    name: "ChatMessageBlock",
    data() {
      return { target_channel: null, content: "", receiver: null };
    },
    props: {
      channel: { type: String },
      need_input: { type: Boolean },
    },
    methods: {
      ...mapActions("search", ["search_charas"]),
      send_chat_message() {
        if (this.content === "" || (this.needReceiver && this.receiver === null)) {
          return;
        }

        var data = { channel: this.target_channel, content: this.content };
        if (this.need_receiver) {
          data["receiver"] = this.receiver;
        }
        this.$store.dispatch("ws/send_chat_message", data);
        this.content = "";
      },
      set_reply_target({ channel, receiver }) {
        this.target_channel = channel;
        if (receiver !== null) {
          this.receiver = receiver;
          this.search_charas({ id: receiver });
        }
      },
    },
    computed: {
      ...mapState("ws", ["channels", "messages_mapping"]),
      messages() {
        return this.messages_mapping[this.channel];
      },
      need_receiver() {
        return this.target_channel === "private";
      },
    },
    mounted() {
      if (this.channel === "all") {
        this.target_channel = "public";
      } else {
        this.target_channel = this.channel;
      }
    },

    components: { CharaSelect, ChatMessage },
  };
</script>

<style lang="less" scoped>
  .message-box {
    height: 750px;
    overflow-y: scroll;
  }

  .el-card {
    margin-top: 30px;
  }

  .channel {
    width: 80px;
  }
</style>
