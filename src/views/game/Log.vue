<template>
  <div>
    <div class="form-block">
      <el-input v-model="query_string" @input="search_logs({ search: query_string })"></el-input>
    </div>
    <div class="message-block">
      <LogMessage v-for="(message, index) in search_result_log_messages" :key="index" :message="message"></LogMessage>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import LogMessage from "@/components/LogMessage";
  export default {
    name: "Log",
    data() {
      return {
        query_string: "",
      };
    },
    computed: { ...mapState("search", ["search_result_log_messages"]) },
    methods: {
      ...mapActions("search", ["search_logs"]),
    },
    mounted() {
      this.$store.dispatch("search/search_logs", {});
    },
    components: { LogMessage },
  };
</script>

<style lang="less" scoped>
  .form-block,
  .message-block {
    width: 100%;
  }
  .message-block {
    overflow-y: scroll;
    height: 500px;
  }
</style>
