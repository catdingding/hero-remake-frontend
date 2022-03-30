<template>
  <div>
    <el-divider>設置自訂稱號</el-divider>
    <el-form>
      <el-form-item label="名稱">
        <el-input v-model="form_data.name"> </el-input>
      </el-form-item>
      <el-form-item label="顏色">
        <el-color-picker v-model="form_data.color"> </el-color-picker>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="set_custom_title(form_data).then(fetch)"> 送出 </el-button>
    <el-divider>延長效期(20贊助點數/日)</el-divider>
    <div>
      <span>剩餘時間：</span>
      <RelativeTime :time_string="form_data.due_time" :period="1000"></RelativeTime>
    </div>
    <InputNumberWithButton
      size="default"
      text="延長效期(日)"
      @click="expand_custom_title({ days: $event }).then(fetch)"
    >
    </InputNumberWithButton>
  </div>
</template>

<script setup>
  import { onMounted, reactive } from "vue";
  import { useStore } from "vuex";
  import InputNumberWithButton from "@/components/InputNumberWithButton";
  import { set_custom_title, expand_custom_title } from "@/api/chara";

  const store = useStore();
  var form_data = reactive({});

  const fetch = async () => {
    await store.dispatch("chara/get_chara_profile", { fields: "custom_title" });
    Object.assign(form_data, store.state.chara.chara_custom_title);
  };

  onMounted(async () => {
    await fetch();
  });
</script>

<style lang="less" scoped>
  div {
    text-align: center;
  }
</style>
