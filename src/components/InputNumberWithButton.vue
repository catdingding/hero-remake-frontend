<template>
  <div>
    <el-input-number size="mini" :min="1" :max="max" v-model="value" :style="{ width }"></el-input-number>
    <el-button type="primary" size="mini" @click="$emit('click', value)">
      {{ text }}
    </el-button>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "InputNumberWithButton",
    data() {
      return {
        value: 1,
      };
    },
    props: {
      max: { type: Number, default: Infinity },
      text: { type: String, default: "" },
      width: { type: String, default: "100px" },
    },
  };
</script>

<style lang="less" scoped>
  .el-input-number {
    width: 100px;
  }
</style>
