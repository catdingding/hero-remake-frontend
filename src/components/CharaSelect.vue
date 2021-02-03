<template>
  <el-select
    :value="value"
    @change="$emit('input', $event)"
    filterable
    remote
    placeholder="請輸入傳送對象名稱"
    :remote-method="search_charas_by_name"
  >
    <el-option v-for="chara in search_result_charas" :key="chara.id" :label="chara.name" :value="chara.id"></el-option>
  </el-select>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "CharaSelect",
    data() {
      return {};
    },
    props: {
      value: { type: Number },
      conditions: {
        type: Object,
        default: function() {
          return {};
        }
      }
    },
    computed: { ...mapState("search", ["search_result_charas"]) },
    methods: {
      ...mapActions("search", ["search_charas"]),
      search_charas_by_name(name) {
        this.search_charas(Object.assign({ search: name }, this.conditions));
      }
    }
  };
</script>

<style lang="less" scoped>
  div {
    text-align: center;
  }
</style>
