<template>
  <div>
    <el-card style="width:100%">
      <el-tabs value="first">
        <el-tab-pane label="地城" name="first"> <UGCPanelDungeonTab /></el-tab-pane>
        <el-tab-pane label="怪物" name="second"><UGCPanelMonsterTab /> </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import UGCPanelDungeonTab from "./UGCPanelDungeonTab.vue";
  import UGCPanelMonsterTab from "./UGCPanelMonsterTab.vue";

  export default {
    name: "UGCPanel",
    data() {
      return {};
    },
    computed: {},
    methods: {},
    mounted() {},
    components: { UGCPanelDungeonTab, UGCPanelMonsterTab },
  };
</script>

<style lang="less" scoped></style>
