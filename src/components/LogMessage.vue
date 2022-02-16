<template>
  <div class="message">
    <span class="category" v-if="message.category">【{{ message.category }}】</span>
    <span class="content">{{ message.content }}</span>
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
  .category,
  .content {
    color: var(--text-color-primary);
  }
  .datetime {
    display: inline-block;
    padding-left: 10px;
    color: var(--text-color-secondary);
  }
</style>
