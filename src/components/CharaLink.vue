<template>
  <span @click="open_chara_profile_dialog(chara_id)">{{ chara_name }}</span>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "CharaLink",
    data() {
      return {};
    },
    props: { chara_id: { type: Number }, chara_name: { type: String } },
    methods: {
      ...mapActions("dialog", ["open_chara_profile_dialog"]),
    },
  };
</script>

<style lang="less" scoped>
  span {
    cursor: pointer;
    text-decoration: underline;
  }
</style>
