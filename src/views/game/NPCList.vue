<template>
  <div class="main">
    <div v-for="npc in npcs" :key="npc.id" class="npc-block">
      <div>
        <el-avatar icon="el-icon-user-solid"></el-avatar>
      </div>
      <div>
        <span>{{ npc.name }}</span>
      </div>
      <div>
        <el-button @click="open_chara_profile_dialog(npc.id)" type="primary" size="mini">詳細</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "NPCList",
    data() {
      return {};
    },
    computed: { ...mapState("npc", ["npcs"]) },
    methods: { ...mapActions("npc", ["open_chara_profile_dialog"]) },
    mounted() {
      this.$store.dispatch("npc/get_npcs");
    },
    components: {},
  };
</script>

<style lang="less" scoped>
  .main {
    gap: 30px;
  }
  .npc-block {
    width: 200px;
    border: 1px solid #999;
    border-radius: 25px;
    text-align: center;
    padding: 20px;
  }
</style>
