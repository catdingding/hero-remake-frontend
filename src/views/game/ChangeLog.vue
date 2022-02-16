<template>
  <div>
    <div class="form-block">
      <el-input v-model="query_string" @input="search_change_logs({ search: query_string })"></el-input>
    </div>
    <div class="message-block">
      <el-timeline>
        <el-timeline-item
          v-for="change_log in search_result_change_logs"
          :key="change_log.id"
          :timestamp="$filters.datetime_display(change_log.time)"
        >
          <div class="content">{{ change_log.content }}</div>
          <div class="note">{{ change_log.note }}</div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "ChangeLog",
    data() {
      return {
        query_string: "",
      };
    },
    computed: { ...mapState("search", ["search_result_change_logs"]) },
    methods: {
      ...mapActions("search", ["search_change_logs"]),
    },
    mounted() {
      this.search_change_logs();
    },
    components: {},
  };
</script>

<style lang="less" scoped>
  .form-block,
  .message-block {
    width: 100%;
  }
  .message-block {
    padding: 20px;
    .content {
      color: #000000;
      white-space: pre-wrap;
    }
    .note {
      color: #666666;
    }
  }
</style>
