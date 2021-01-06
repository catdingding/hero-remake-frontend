<template>
  <div class="home">
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
      LoginRegist
    }
  };
</script>

<style lang="less" scoped>
  .home {
    padding: 50px 0 50px 0;
  }
</style>
