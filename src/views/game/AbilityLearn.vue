<template>
  <div>
    <table>
      <tr>
        <th>名稱</th>
        <th>說明</th>
        <th>消耗熟練度</th>
        <th>學習</th>
      </tr>
      <tr v-for="(ability, index) in available_to_learn_abilities" :key="index">
        <td>{{ ability.name }}</td>
        <td>{{ ability.description }}</td>
        <td>{{ ability.require_proficiency }}</td>
        <td>
          <el-button type="primary" @click="learn_ability({ ability: ability.id })">學習</el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "AbilityLearn",
    data() {
      return {};
    },
    computed: { ...mapState("ability", ["available_to_learn_abilities"]) },
    methods: { ...mapActions("ability", ["learn_ability"]) },
    mounted() {
      this.$store.dispatch("ability/get_available_to_learn_abilities");
    }
  };
</script>

<style lang="less" scoped></style>
