<template>
  <div>
    <el-card style="width: 100%">
      <el-tabs model-value="first">
        <el-tab-pane label="自傳" name="first"> <CharaIntroduction /></el-tab-pane>
        <el-tab-pane label="更換頭像" name="second"><AvatarChange /> </el-tab-pane>
        <el-tab-pane label="個人化設定" name="third"><CharaConfig /> </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
  import AvatarChange from "./AvatarChange.vue";
  import CharaIntroduction from "./CharaIntroduction.vue";
  import CharaConfig from "./CharaConfig.vue";
</script>

<style lang="less" scoped></style>
