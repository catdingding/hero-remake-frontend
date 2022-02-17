<template>
  <div>
    <InputNumber size="small" :min="min" :max="max" v-model="value" :style="{ width }"></InputNumber>
    <el-button :type="type" :size="size" @click="$emit('click', value)">
      {{ text }}
    </el-button>
  </div>
</template>

<script>
  import InputNumber from "@/components/InputNumber";
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
      size: { type: String, default: "small" },
      type: { type: String, default: "primary" },
    },
    emits: ["click"],
    mounted() {
      this.value = this.default;
    },
    components: { InputNumber },
  };
</script>

<style lang="less" scoped></style>
