<template>
  <div>
    <div>當前修煉消耗：{{ exercise_cost }}熟練度，當前擁有熟練度：{{ chara_proficiency | currency }}</div>
    <table>
      <tr>
        <th>職業</th>
        <th v-for="attribute in chara_attributes" :key="attribute.type.name">
          {{ attribute.type.name }}
          <br />
          （{{ attribute.limit }}）
        </th>
        <th>修煉</th>
      </tr>
      <tr v-for="(class_exercise_rewards, class_name) in formatted_exercise_rewards" :key="class_name">
        <th>{{ class_name }}</th>
        <td v-for="reward in class_exercise_rewards" :key="reward.reward_attribute_type.id">
          {{ reward.limit_growth }}
        </td>
        <td>
          <el-button type="primary" :disabled="chara_job.attribute_type.class_name != class_name" @click="exercise"
            >修煉</el-button
          >
        </td>
      </tr>
    </table>

    <el-divider></el-divider>
    <div style="text-align:center">
      當前擁有金錢：{{ chara_gold | currency }}<br />
      HP最大值/潛力上限：{{ chara_hp_max }}/{{ chara_hp_limit }}<br />
      MP最大值/潛力上限：{{ chara_mp_max }}/{{ chara_mp_limit }}<br />
    </div>
    <div style="width: 100%;text-align: center;margin-top:25px;">
      <el-button type="primary" @click="increase_hp_mp_max()">
        提升HP、MP最大值(花費{{ increase_hp_mp_max_cost | currency }}金錢)
      </el-button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "Exercise",
    data() {
      return {};
    },
    computed: {
      ...mapState("job", ["exercise_rewards"]),
      ...mapState("chara", [
        "chara_gold",
        "chara_proficiency",
        "chara_hp_max",
        "chara_mp_max",
        "chara_hp_limit",
        "chara_mp_limit",
        "chara_job",
        "chara_attributes",
      ]),
      formatted_exercise_rewards() {
        return this._(this.exercise_rewards)
          .sortBy((x) => x.reward_attribute_type.id)
          .groupBy((x) => x.job_attribute_type.class_name)
          .value();
      },
      exercise_cost() {
        var cost = this.chara_attributes.reduce((acc, curr) => acc + curr["limit"], 0);
        cost = Math.floor((cost - 1000) / 20) ** 2;
        cost = Math.min(cost, 10000);
        return cost;
      },
      increase_hp_mp_max_cost() {
        var cost = this.chara_hp_max + this.chara_mp_max;
        cost += this.chara_attributes.reduce((acc, curr) => acc + curr["value"], 0);
        cost *= 5000;
        cost = Math.max(cost, 1000000);
        return cost;
      },
    },
    methods: { ...mapActions("job", ["exercise"]), ...mapActions("chara", ["increase_hp_mp_max"]) },
    mounted() {
      this.$store.dispatch("job/get_exercise_rewards");
      this.$store.dispatch("chara/get_chara_profile", {
        fields: "gold,proficiency,hp_max,mp_max,hp_limit,mp_limit,job,attributes",
      });
    },
  };
</script>

<style lang="less" scoped></style>
