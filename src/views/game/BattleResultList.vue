<template>
  <div>
    <div class="form-block">
      <el-input v-model="query_string" @input="search_battle_results({ search: query_string, omit: 'content' })">
      </el-input>
    </div>
    <div class="message-block">
      <div v-for="row in search_result_battle_results" :key="row.id">
        <span @click="get_battle_result(row.id)">{{ row.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "BattleResultList",
    data() {
      return {
        query_string: "",
      };
    },
    computed: { ...mapState("search", ["search_result_battle_results"]) },
    methods: {
      ...mapActions("search", ["search_battle_results"]),
      ...mapActions("battle", ["get_battle_result"]),
    },
    mounted() {
      this.$store.dispatch("search/search_battle_results", { omit: "content" });
    },
  };
</script>

<style lang="less" scoped>
  .form-block,
  .message-block {
    width: 100%;
  }
  .message-block {
    overflow-y: scroll;
    height: 500px;
    span {
      cursor: pointer;
      text-decoration: underline;
      color: var(--text-color-primary);
    }
  }
</style>
