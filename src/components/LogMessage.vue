<template>
  <div class="message">
    <span v-if="message.category">【{{ message.category }}】</span>
    <span>{{ message.content }}</span>
    <span class="datetime">{{ $filters.datetime_display(message.created_at) }}</span>
  </div>
</template>

<script>
  export default {
    name: "LogMessage",
    data() {
      return {};
    },
    props: { message: { type: Object } },
    components: {},
  };
</script>

<style lang="less" scoped>
  .datetime {
    display: inline-block;
    padding-left: 10px;
    color: #999999;
  }
</style>
