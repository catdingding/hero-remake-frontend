<template>
  <el-card>
    <el-collapse :simple="true">
      <el-collapse-item :title="title">
        <div class="message-box">
          <LogMessage v-for="message in messages" :key="message.uuid" :message="message"> </LogMessage>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import LogMessage from "@/components/LogMessage.vue";
  export default {
    name: "LogMessageBlock",
    data() {
      return {};
    },
    props: {
      messages: { type: Array },
      title: { type: String },
    },
    methods: {},
    computed: {},
    mounted() {},

    components: { LogMessage },
  };
</script>

<style lang="less" scoped>
  .message-box {
    height: 200px;
    overflow-y: scroll;
  }
</style>
