<template>
  <div>
    <table>
      <tr>
        <th>系別</th>
        <th>位階</th>
        <th>名稱</th>
        <th>說明</th>
        <th>轉職</th>
      </tr>
      <tr v-for="(job, index) in available_jobs" :key="index">
        <td>{{ job.attribute_type.class_name }}</td>
        <td>{{ job.rank }}階</td>
        <td>{{ job.name }}</td>
        <td>{{ job.description }}</td>
        <td>
          <Button type="primary" @click="change_job({ job: job.id }).then(() => $router.push('/game/'))">轉職</Button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "JobChange",
    data() {
      return {};
    },
    computed: { ...mapState("job", ["available_jobs"]) },
    methods: { ...mapActions("job", ["change_job"]) },
    mounted() {
      this.$store.dispatch("job/get_available_jobs", {});
    }
  };
</script>

<style lang="less" scoped></style>
