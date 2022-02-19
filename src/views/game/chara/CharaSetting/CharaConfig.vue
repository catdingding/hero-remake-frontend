<template>
  <div>
    <el-form>
      <el-form-item label="背景(CSS)">
        <el-input v-model="form_data.background"> </el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="set_config(form_data).then(store.commit('chara/apply_config', form_data))">
      送出
    </el-button>
  </div>
</template>

<script setup>
  import { onMounted, reactive } from "vue";
  import { useStore } from "vuex";
  import { set_config } from "@/api/chara";

  const store = useStore();
  var form_data = reactive({});

  onMounted(async () => {
    await store.dispatch("chara/get_chara_profile", { fields: "config" });
    Object.assign(form_data, store.state.chara.chara_config);
  });
</script>

<style lang="less" scoped>
  div {
    text-align: center;
  }
  .el-button {
    margin-top: 20px;
  }
</style>
