<template>
  <div>
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
      ...mapState("chara", ["chara_job", "chara_attributes"]),
      formatted_exercise_rewards() {
        return this._(this.exercise_rewards)
          .sortBy(x => x.reward_attribute_type.id)
          .groupBy(x => x.job_attribute_type.class_name)
          .value();
      }
    },
    methods: { ...mapActions("job", ["exercise"]) },
    mounted() {
      this.$store.dispatch("job/get_exercise_rewards");
      this.$store.dispatch("chara/get_chara_profile", { omit: "", fields: "job,attributes" });
    }
  };
</script>

<style lang="less" scoped></style>
