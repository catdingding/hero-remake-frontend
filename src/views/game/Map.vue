<template>
  <div>
    <div class="map small-font" v-if="map">
      <div class="location" v-for="(location, index) in map" :key="index">
        <span :class="{ 'no-town': !location.town_name }">{{ location.town_name || "無城鎮" }}</span>
        <br />
        <span>{{ location.battle_map_name }}</span>
        <br />
        <span>({{ location.x }}, {{ location.y }})</span>
        <br />
        <el-button type="success" size="mini" @click="move(location)">前往</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: "Map",
    data() {
      return {};
    },
    computed: { ...mapState("map", ["map"]) },
    methods: {
      move(location) {
        this.$store.dispatch("map/move", location).then(() => {
          this.$router.push("./");
        });
      },
    },
    mounted() {
      this.$store.dispatch("map/get_map");
    },
  };
</script>

<style lang="less" scoped>
  .map {
    width: 740px;
    height: 740px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .location {
      width: 100px;
      height: 100px;
      border: #aaa 1px solid;
      background-color: #fff;
      text-align: center;
      .no-town {
        color: #999;
      }
    }
  }
</style>
