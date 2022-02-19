<template>
  <div>
    <el-input type="textarea" :rows="15" v-model="content"> </el-input>
    <el-button type="primary" @click="set_introduction({ content })">送出</el-button>
  </div>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { useStore } from "vuex";
  import { set_introduction } from "@/api/chara";

  const store = useStore();
  const content = ref("");

  onMounted(async () => {
    await store.dispatch("chara/get_chara_profile", { fields: "introduction" });
    content.value = store.state.chara.chara_introduction.content;
  });
</script>

<style lang="less" scoped>
  div {
    text-align: center;
  }
  .el-button {
    margin-top: 20px;
  }
</style>
