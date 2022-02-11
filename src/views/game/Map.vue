<template>
  <div>
    <div>
      <div class="panel">
        <span>x:</span>
        <el-input-number v-model="x" size="mini" @change="get_map" />
        <span>y:</span>
        <el-input-number v-model="y" size="mini" @change="get_map" />
      </div>
      <div class="map small-font" v-if="map">
        <div class="location" v-for="(location, index) in map" :key="index">
          <el-popover placement="top" title="詳細資訊" width="200" trigger="hover">
            屬性：{{ location.element_type.name }}<br />
            國家：{{ location.country | country_name }}
            <i slot="reference" class="info el-icon-info"></i>
          </el-popover>

          <span :class="{ 'no-town': !location.town }">{{ location.town ? location.town.name : "無城鎮" }}</span>
          <br />
          <span>{{ location.battle_map_name }}</span>
          <br />
          <span>({{ location.x }}, {{ location.y }})</span>
          <br />
          <el-button
            v-if="location.x === chara_location.x && location.y === chara_location.y"
            type="info"
            size="mini"
            disabled
          >
            當前位置
          </el-button>
          <el-button v-else type="success" size="mini" @click="move(location)">前往</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "Map",
    data() {
      return {
        x: null,
        y: null,
      };
    },
    computed: { ...mapState("map", ["map"]), ...mapState("chara", ["chara_location"]) },
    methods: {
      ...mapActions("map", ["move"]),
      async get_map() {
        this.$store.dispatch("map/get_map", { x: this.x, y: this.y });
      },
    },
    async mounted() {
      await this.$store.dispatch("chara/get_chara_profile", { fields: "location" });
      this.x = this.chara_location.x;
      this.y = this.chara_location.y;
      await this.get_map();
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
      position: relative;
      border: #aaa 1px solid;
      background-color: #fff;
      text-align: center;
      .no-town {
        color: #999;
      }
      .info {
        position: absolute;
        left: 2px;
        top: 2px;
        font-size: 16px;
      }
    }
  }
  .panel {
    text-align: center;
    padding: 10px;
    .el-input-number {
      width: 120px;
    }
    span {
      display: inline-block;
      padding: 10px;
    }
  }
</style>
