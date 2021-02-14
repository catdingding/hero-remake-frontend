<template>
  <div>
    <img :src="`/image/chara_avatar/${chara_id}.jpg`" />
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "Avatar",
    data() {
      return {};
    },
    props: { chara_id: { type: Number } },
  };
</script>

<style lang="less" scoped>
  div {
    text-align: center;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
</style>
