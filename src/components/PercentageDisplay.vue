<template>
  <div class="percentage_display" :style="style">{{ this.value }}/{{ this.maxValue }}</div>
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
          background: `linear-gradient(to left, ${this.color} ${percentage}%, white ${percentage}%)`
        };
      }
    }
  };
</script>

<style lang="less" scoped>
  .percentage_display {
    width: 100%;
    border: 1px solid #aaa;
    display: inline-block;
    padding-right: 10px;
    text-align: right;
  }
</style>
