<template>
  <div>
    <div>
      <div class="panel">
        <span>x:</span>
        <el-input-number v-model="x" size="small" @change="fetch" />
        <span>y:</span>
        <el-input-number v-model="y" size="small" @change="fetch" />
      </div>
      <div class="map small-font" v-if="map">
        <div class="location" v-for="(location, index) in map" :key="index">
          <el-popover placement="top" title="詳細資訊" width="200" trigger="hover">
            屬性：{{ location.element_type.name }}<br />
            國家：{{ $filters.country_name(location.country) }}
            <template #reference>
              <el-icon class="info"><InfoFilled /></el-icon>
            </template>
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
            size="small"
            disabled
          >
            當前位置
          </el-button>
          <el-button v-else type="success" size="small" @click="move(location)">前往</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useStore } from "vuex";
  import { InfoFilled } from "@element-plus/icons";
  import { get_map } from "@/api/map.js";

  const x = ref(null);
  const y = ref(null);
  const map = ref([]);

  const store = useStore();
  const chara_location = computed(() => store.state.chara.chara_location);

  const fetch = async () => {
    map.value = await get_map({ x: x.value, y: y.value });
  };

  onMounted(async () => {
    await store.dispatch("chara/get_chara_profile", { fields: "location" });
    x.value = chara_location.value.x;
    y.value = chara_location.value.y;
    fetch();
  });

  const move = async (location) => {
    store.dispatch("map/move", location);
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
