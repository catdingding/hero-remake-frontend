<template>
  <div>
    <div>
      <div class="panel">
        <span>x:</span>
        <el-input-number v-model="x" size="small" @change="fetch" />
        <span>y:</span>
        <el-input-number v-model="y" size="small" @change="fetch" />
      </div>
      <el-scrollbar class="map-scrollbar">
        <div class="map small-font" v-if="map">
          <div class="location" v-for="(location, index) in map" :key="index">
            <el-popover placement="top" title="詳細資訊" width="200" trigger="hover">
              屬性：{{ location.element_type.name }}<br />
              國家：{{ $filters.country_name(location.country) }}
              <template #reference>
                <el-icon class="info"><InfoFilled /></el-icon>
              </template>
            </el-popover>

            <el-popover placement="top" title="特殊資訊" width="200" trigger="hover" v-if="location.has_world_boss">
              <span v-if="location.has_world_boss">神獸出沒中！</span>
              <template #reference>
                <el-icon class="warning"><WarningFilled /></el-icon>
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
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useStore } from "vuex";
  import { InfoFilled, WarningFilled } from "@element-plus/icons";
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
  .map-scrollbar {
    max-width: 90vw;
    height: 760px;
  }
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
      background-color: var(--color-white);
      text-align: center;
      .no-town {
        color: #999;
      }
      .el-icon {
        position: absolute;
        left: 2px;
        font-size: 16px;
      }
      .info {
        top: 2px;
      }
      .warning {
        top: 18px;
        color: #f56c6c;
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
