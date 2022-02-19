<template>
  <div class="container">
    <div>
      <AvatarInput @change="avatar = $event" /><br />
      <el-button type="primary" @click="change_avatar(avatar)">更換頭像（100贊助點數）</el-button>
    </div>
  </div>
</template>
<script setup>
  import { ref } from "vue";
  import AvatarInput from "@/components/AvatarInput";
  import { change_avatar } from "@/api/chara";

  const avatar = ref(null);
</script>
<style lang="less" scoped>
  div {
    text-align: center;
  }
  .container {
    display: flex;
    justify-content: space-around;
  }
</style>
