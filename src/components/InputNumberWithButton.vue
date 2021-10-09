<template>
  <div>
    <el-input-number size="mini" :min="min" :max="max" v-model="value" :style="{ width }"></el-input-number>
    <el-button type="primary" :size="size" @click="$emit('click', value)">
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
      default: { type: Number, default: 1 },
      min: { type: Number, default: 1 },
      max: { type: Number, default: Infinity },
      text: { type: String, default: "" },
      width: { type: String, default: "100px" },
      size: { type: String, default: "mini" },
    },
    mounted() {
      this.value = this.default;
    },
  };
</script>

<style lang="less" scoped>
  .el-input-number {
    width: 100px;
  }
</style>
