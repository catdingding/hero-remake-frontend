<template>
  <span>
    {{ relative_time }}
  </span>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    name: "RelativeTime",
    data() {
      return { relative_time: "", interval_id: null };
    },
    props: {
      time_string: { type: String },
      period: { type: Number, default: 1000 },
      min: { type: Number, default: 0 },
    },
    computed: { ...mapGetters(["get_client_time"]) },
    methods: {
      compute_relative_time() {
        var ms = Date.parse(this.time_string) - this.get_client_time();
        if (ms < this.min) {
          ms = this.min;
        }
        var sign = ms >= 0 ? "" : "-";
        ms = Math.abs(ms);
        if (ms > 3600000) {
          return sign + Math.floor(ms / 3600000) + "小時" + Math.floor((ms % 3600000) / 60000) + "分鐘";
        }
        if (ms > 60000) {
          return sign + Math.floor(ms / 60000) + "分鐘" + Math.floor((ms % 60000) / 1000) + "秒";
        }
        if (ms > 0) {
          return sign + (ms / 1000).toFixed(1) + "秒";
        }
        return 0 + "秒";
      },
      set_relative_time() {
        this.relative_time = this.compute_relative_time();
      },
    },
    mounted() {
      this.interval_id = setInterval(this.set_relative_time, this.period);
    },
    beforeUnmount() {
      clearInterval(this.interval_id);
    },
  };
</script>

<style lang="less" scoped></style>
