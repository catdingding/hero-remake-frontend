<template>
  <div
    class="chat-message"
    :class="{
      public: message.channel == 'public' || message.channel == 'system',
      country: message.channel == 'country',
      team: message.channel == 'team',
      private: message.channel == 'private',
    }"
  >
    <Avatar
      v-if="message.channel != 'system'"
      class="avatar"
      :chara_id="message.sender.id"
      :avatar_version="message.sender.avatar_version"
    />
    <img v-else :src="message.avatar.path" />
    <div class="message">
      <div class="title">
        <span>[{{ channel_name_mapping[message.channel] }}]</span>
        <span v-if="message.channel != 'system'">
          <CharaLink :chara_name="message.sender.name" :chara_id="message.sender.id" />
          <span
            v-if="message.sender.custom_title.name && is_time_active(message.sender.custom_title.due_time)"
            :style="{ color: message.sender.custom_title.color }"
          >
            [{{ message.sender.custom_title.name }}]
          </span>
          <span v-else>{{ message.sender.title ? message.sender.title.type.name : "" }}</span>
          <span>@</span>
          <span>{{ $filters.country_name(message.sender.country) }}</span>
        </span>
        <span v-else>{{ message.sender_name }}</span>
        <span v-if="message.receiver">傳送給</span>
        <span v-if="message.receiver">
          {{ message.receiver.name }}
          @{{ $filters.country_name(message.receiver.country) }}
        </span>
        <span v-if="message.is_system_generated" style="color: #999999">(系統訊息)</span>
        <span
          v-if="message.channel != 'system'"
          class="reply"
          @click="
            $emit('reply', {
              channel: message.channel,
              receiver: message.channel === 'private' ? message.sender.id : null,
            })
          "
        >
          回
        </span>
      </div>
      <div class="content">
        「
        {{ message.sender?.official ? `【${message.sender.official.title}】` : "" }}
        {{ message.content }}
        」
      </div>
      <div class="datetime">{{ $filters.datetime_display(message.created_at) }}</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import Avatar from "@/components/Avatar";
  import CharaLink from "@/components/CharaLink";

  export default {
    name: "ChatMessage",
    data() {
      return {
        channel_name_mapping: {
          public: "公",
          country: "國",
          team: "隊",
          private: "私",
          system: "系",
        },
      };
    },
    props: { message: { type: Object } },
    computed: { ...mapGetters(["is_time_active"]) },
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

    color: var(--text-color-primary-light-bg);
    .datetime {
      color: var(--text-color-secondary-light-bg);
    }

    &.public {
      background-color: var(--el-color-white);
      color: var(--text-color-primary);
      .datetime {
        color: var(--text-color-secondary);
      }
    }
    &.country {
      background-color: #d1ecf7;
    }
    &.team {
      background-color: #cee6b3;
    }
    &.private {
      background-color: #fff7b3;
    }
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
  .reply {
    color: #2323f7;
    cursor: pointer;
  }
</style>
