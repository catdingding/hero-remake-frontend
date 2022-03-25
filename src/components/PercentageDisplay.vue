<template>
  <div class="percentage-display" :style="style">
    <span>{{ this.value }}/{{ this.maxValue }}</span>
  </div>
</template>

<script>
  export default {
    name: "",
    props: ["value", "maxValue", "color"],
    data() {
      return {};
    },
    computed: {
      style() {
        var percentage = (this.value / this.maxValue) * 100;
        return {
          background: `linear-gradient(to left, ${this.color} ${percentage}%, transparent ${percentage}%)`,
        };
      },
    },
  };
</script>

<style lang="less" scoped>
  .percentage-display {
    width: 100%;
    height: 100%;
    border: 1px solid #aaa;
    display: inline-block;
    text-align: right;
    span {
      padding-right: 10px;
    }
  }
</style>
