<template>
  <div class="chat-message">
    <Avatar class="avatar" :chara_id="message.sender.id"></Avatar>
    <div class="message">
      <div class="title">
        <span>[{{ channel_name_mapping[message.channel] }}]</span>
        <span>
          <CharaLink :chara_name="message.sender.name" :chara_id="message.sender.id"></CharaLink>
          @{{ message.sender.country ? message.sender.country.name : "無所屬" }}
        </span>
        <span v-if="message.receiver">傳送給</span>
        <span v-if="message.receiver">
          {{ message.receiver.name }}
          @{{ message.receiver.country ? message.receiver.country.name : "無所屬" }}
        </span>
      </div>
      <div class="content">
        「
        {{ message.sender.official ? `【${message.sender.official.title}】` : "" }}
        {{ message.content }}
        」
      </div>
      <div class="datetime">{{ message.created_at | datetime_display }}</div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import Avatar from "@/components/Avatar";
  import CharaLink from "@/components/CharaLink";

  export default {
    name: "ChatMessage",
    data() {
      return {
        channel_name_mapping: {
          public: "公",
          country: "國",
          private: "私",
        },
      };
    },
    props: { message: { type: Object } },
    components: { Avatar, CharaLink },
  };
</script>

<style lang="less" scoped>
  .chat-message {
    display: flex;
    height: 100px;
    padding: 5px 0px 5px 0px;
    font-size: 14px;
    border-bottom: 1px solid #666;
  }
  .message {
    padding: 0px 5px 0px 5px;
    display: flex;
    flex-flow: row wrap;
    div {
      width: 100%;
    }
  }
  .avatar {
    width: 100px;
    min-width: 100px;
  }
  .title {
    font-weight: 600;
  }
  .content {
    word-break: break-all;
  }
  .datetime {
    color: #999999;
  }
</style>
