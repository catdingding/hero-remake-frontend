<template>
  <div>
    <div class="map" v-if="map">
      <div class="location" v-for="(location, index) in map" :key="index">
        {{ location.town_name || "無城鎮" }}<br />{{ location.battle_map_name }}<br />({{ location.x }},
        {{ location.y }})<br />
        <el-button type="success" @click="move(location)">前往</el-button>
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
      }
    },
    mounted() {
      this.$store.dispatch("map/get_map");
    }
  };
</script>

<style lang="less" scoped>
  .map {
    width: 700px;
    height: 700px;
    display: flex;
    flex-wrap: wrap;
    .location {
      width: 100px;
      height: 100px;
      border: #aaa 1px solid;
      background-color: #fff;
      text-align: center;
    }
  }
</style>
