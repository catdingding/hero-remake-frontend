<template>
  <div class="chat-message">
    <Avatar class="avatar" :chara_id="message.sender_profile.id"></Avatar>
    <div class="message">
      <div class="title">
        <span>{{ message.sender_profile.name }}@{{ message.sender_profile.country__name || "無所屬" }}</span>
        <span v-if="message.receiver_profile">傳送給</span>
        <span v-if="message.receiver_profile">
          {{ message.receiver_profile.name }}@{{ message.receiver_profile.country__name || "無所屬" }}
        </span>
      </div>
      <div class="content">「{{ message.content }}」</div>
      <div class="datetime">{{ message.created_at | datetime_display }}</div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import Avatar from "@/components/Avatar";

  export default {
    name: "ChatMessage",
    data() {
      return {};
    },
    props: { message: { type: Object } },
    components: { Avatar },
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
    span {
      display: inline-block;
      margin-right: 10px;
    }
  }
  .content {
    word-break: break-all;
  }
  .datetime {
    color: #999999;
  }
</style>
