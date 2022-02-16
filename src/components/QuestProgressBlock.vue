<template>
  <div class="block">
    <div class="percentage-display" :style="style">
      <span>{{ title }}</span>
      <span>{{ this.value }}/{{ this.maxValue }}</span>
    </div>
    <el-button class="submit" size="small" type="success" @click="$emit('submit')" :disabled="value < maxValue">
      提交
    </el-button>
  </div>
</template>

<script>
  export default {
    name: "QuestProgressBlock",
    props: ["title", "value", "maxValue", "color"],
    data() {
      return {};
    },
    computed: {
      style() {
        var percentage = (this.value / this.maxValue) * 100;
        return {
          background: `linear-gradient(to right, ${this.color} ${percentage}%, white ${percentage}%)`,
        };
      },
    },
  };
</script>

<style lang="less" scoped>
  .block {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    margin-bottom: 5px;
  }
  .percentage-display {
    width: calc(100% - 100px);
    border: 1px solid #ccc;
    border-radius: 15px;
    display: inline-block;
    text-align: center;
    span {
      display: inline-block;
      margin-right: 10px;
    }
  }
  .submit {
    width: 70px;
    height: 100%;
  }
</style>
