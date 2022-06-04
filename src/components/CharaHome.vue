<template>
  <el-scrollbar class="scrollbar">
    <div class="home">
      <div class="block" v-for="(char, index) in data.chars" :key="index">
        {{ char }}
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup>
  import { defineProps, toRef } from "vue";

  const props = defineProps({ data: { type: Object } });
  const data = toRef(props, "data");
</script>

<style lang="less" scoped>
  .scrollbar {
    width: 700px;
    max-width: 100%;
    height: 700px;
  }
  .home {
    width: 680px;
    height: 680px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .block {
      width: 20px;
      height: 20px;
      position: relative;
      border: #aaa 1px solid;
      background-color: var(--color-white);
      text-align: center;
    }
  }
</style>
