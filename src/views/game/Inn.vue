<template>
  <div>
    <el-button type="primary" @click="sleep_inn('room')">住房間(花費{{ room_cost }}金錢，健康度回滿)</el-button>
    <el-button type="primary" @click="sleep_inn('stable')">住馬廄(無花費，健康度恢復至50)</el-button>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "Inn",
    data() {
      return {};
    },
    computed: {
      ...mapState("chara", ["chara_attributes"]),
      room_cost() {
        return this.chara_attributes.reduce((acc, curr) => acc + curr["value"], 0) ** 2;
      },
    },
    methods: { ...mapActions("town", ["sleep_inn"]) },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { omit: "", fields: "attributes" });
    },
  };
</script>

<style lang="less" scoped></style>
