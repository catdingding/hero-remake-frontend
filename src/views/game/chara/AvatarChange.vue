<template>
  <div>
    <div>
      <AvatarInput @change="avatar = $event"></AvatarInput><br />
      <el-button type="primary" size="medium" @click="change_avatar(avatar)">更換頭像（100贊助點數）</el-button>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from "vuex";
  import AvatarInput from "@/components/AvatarInput";
  export default {
    data() {
      return {
        avatar: null,
      };
    },
    methods: {
      ...mapActions("chara", ["change_avatar"]),
    },
    mounted: function() {},
    components: { AvatarInput },
  };
</script>
<style lang="less" scoped>
  div {
    text-align: center;
  }
</style>
