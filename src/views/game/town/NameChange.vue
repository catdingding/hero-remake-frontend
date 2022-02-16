<template>
  <div>
    <HintBlock style="width: 100%;">
      <div>
        改名需消耗1億金錢
      </div>
    </HintBlock>
    <el-form :model="form_data" class="form">
      <el-form-item label="改名對象" prop="kind" required>
        <el-select v-model="form_data.kind">
          <el-option label="角色" value="chara"></el-option>
          <el-option label="武器" value="weapon"></el-option>
          <el-option label="防具" value="armor"></el-option>
          <el-option label="飾品" value="jewelry"></el-option>
          <el-option label="寵物" value="pet"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新名稱" prop="name" required>
        <el-input v-model="form_data.name" maxlength="10" show-word-limit></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="change_name(form_data)">改名</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "NameChange",
    data() {
      return {
        form_data: { kind: "", name: "" },
      };
    },
    computed: {},
    methods: { ...mapActions("town", ["change_name"]) },
    mounted() {},
  };
</script>

<style lang="less" scoped>
  form {
    text-align: center;
  }
</style>
