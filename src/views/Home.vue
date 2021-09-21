<template>
  <div class="home">
    <h1>無限冒險重製版</h1>
    <el-row type="flex" justify="center" align="middle">
      <div stype="width:300px">
        <LoginRegist></LoginRegist>
      </div>
    </el-row>
  </div>
</template>

<script>
  import LoginRegist from "@/components/LoginRegist.vue";

  export default {
    data() {
      return {};
    },
    components: {
      LoginRegist,
    },
  };
</script>

<style lang="less" scoped>
  .home {
    padding: 50px 0 50px 0;
  }
  h1 {
    text-align: center;
  }
</style>
