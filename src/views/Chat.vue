<template>
  <div class="box">
    <el-row type="flex" justify="space-between" style="width: 100%;" class="chat">
      <el-col :span="24">
        <el-tabs value="all">
          <el-tab-pane
            v-for="channel in channels"
            :key="channel.name"
            :label="channel.display_name"
            :name="channel.name"
          >
            <ChatMessageBlock :channel="channel.name" :need_input="channel.need_input"></ChatMessageBlock>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from "vuex";
  import ChatMessageBlock from "@/components/ChatMessageBlock";

  export default {
    data() {
      return {};
    },
    computed: { ...mapState("ws", ["channels"]) },
    methods: {},
    mounted() {
      this.$store.dispatch("ws/start_ws");
    },
    components: { ChatMessageBlock },
  };
</script>

<style lang="less" scoped>
  .box {
    padding: 20px;
    height: calc(100vh - 50px);
  }
</style>
