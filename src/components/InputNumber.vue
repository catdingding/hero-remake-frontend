<template>
  <div style="display: inline-block;">
    <el-tooltip manual placement="top" :value="is_focused" :content="$filters.currency(display_value)">
      <el-input-number
        :size="size"
        :min="min"
        :max="max"
        v-model="input_value"
        :style="{ width }"
        @blur="is_focused = false"
        @focus="is_focused = true"
        ref="input"
        @input="display_value = input_value"
      ></el-input-number>
    </el-tooltip>
  </div>
</template>

<script>
  export default {
    name: "InputNumber",
    data() {
      return { is_focused: false, display_value: "" };
    },
    props: {
      min: { type: Number, default: 1 },
      max: { type: Number, default: Infinity },
      width: { type: String, default: "100px" },
      size: { type: String, default: "small" },
      modelValue: { type: Number },
    },
    computed: {
      input_value: {
        set(value) {
          this.$emit("update:modelValue", value);
        },
        get() {
          return this.modelValue;
        },
      },
    },
    mounted() {
      this.display_value = this.value;
      this.$watch(
        () => {
          return this.$refs.input.displayValue;
        },
        (val) => {
          this.display_value = val;
        }
      );
    },
  };
</script>

<style lang="less" scoped></style>
