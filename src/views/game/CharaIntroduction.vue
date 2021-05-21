<template>
  <div>
    <el-input type="textarea" :rows="15" v-model="content"> </el-input>
    <el-button type="primary" @click="set_introduction({ content })">送出</el-button>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";

  export default {
    name: "CharaIntroduction",
    data() {
      return {
        content: "",
      };
    },
    computed: {
      ...mapState("chara", ["chara_introduction"]),
    },
    methods: { ...mapActions("chara", ["set_introduction"]) },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "introduction" }).then(() => {
        this.content = this.chara_introduction.content;
      });
    },
    components: {},
  };
</script>

<style lang="less" scoped>
  .el-button {
    margin-top: 20px;
  }
</style>
