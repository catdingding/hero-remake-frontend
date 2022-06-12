<template>
  <div>
    <div class="adventure-selection">
      <el-select v-model="adventureId" placeholder="選擇冒險項目" size="large">
        <el-option v-for="x in adventures" :key="x.id" :label="generateAdventureTitle(x)" :value="x.id" />
      </el-select>
    </div>
    <el-divider></el-divider>
    <div class="adventure" v-if="adventure">
      <div v-if="adventure.record?.status === 'active'" class="content">
        <h3>{{ adventure.record ? adventure.record.current_step : 0 }}/{{ adventure.max_step }}</h3>
        <h2>{{ currentStep.name }}</h2>
        <div v-if="adventure.record" class="ability">
          <span>本次冒險持有奧義：</span>
          <span>{{ adventure.record.abilities.map((x) => x.name).join("、") }}</span>
        </div>
        <div class="description">
          {{ currentStep.description }}
        </div>
        <div class="process-panel" style="text-align: center">
          <el-button
            v-show="currentStep.type === 'battle'"
            type="primary"
            @click="processBattle(adventureId).then(refreshAdventure)"
            :disabled="adventure.record.current_step >= currentStepIndex"
          >
            進行戰鬥
          </el-button>
          <el-button
            v-show="currentStep.type === 'event'"
            type="primary"
            @click="processEvent(adventureId).then(refreshAdventure)"
            :disabled="adventure.record.current_step >= currentStepIndex"
          >
            進行事件
          </el-button>
          <el-button
            v-show="currentStep.type === 'scene'"
            type="primary"
            @click="
              processScene(adventureId)
                .then((data) => openSceneDialog(data.contents))
                .then(refreshAdventure)
            "
            :disabled="adventure.record.current_step >= currentStepIndex"
          >
            載入場景
          </el-button>
        </div>
      </div>

      <div class="step-panel">
        <el-button
          v-if="!adventure.record || adventure.record.status === 'inactive'"
          type="success"
          @click="
            startAdventure(adventureId)
              .then(() => (currentStepIndex = 1))
              .then(refreshAdventure)
          "
        >
          開始冒險
        </el-button>
        <el-button
          v-else-if="adventure.record.current_step === adventure.max_step || adventure.record.status === 'ended'"
          type="success"
          @click="terminateAdventure(adventureId).then(refreshAdventure)"
        >
          結束冒險
        </el-button>
        <el-button
          v-else
          :disabled="adventure.record.current_step !== currentStepIndex"
          type="success"
          @click="nextStep()"
        >
          繼續前進
        </el-button>
      </div>
    </div>

    <SceneDialog v-model="sceneDialogVisible" start-key="0" :contents="sceneContents" />
  </div>
</template>

<script setup>
  import { onMounted, ref, watch, computed } from "vue";
  import { useStore } from "vuex";
  import {
    getAdventures,
    getAdventure,
    processBattle,
    processEvent,
    processScene,
    startAdventure,
    terminateAdventure,
  } from "@/api/adventure";
  import SceneDialog from "@/components/SceneDialog";

  const store = useStore();

  const adventures = ref([]);
  const adventureId = ref(null);

  const adventure = ref(null);
  const currentStepIndex = ref(1);

  watch(adventureId, async () => {
    await refreshAdventure();
    var step = adventure.value.record ? adventure.value.record.current_step + 1 : 1;
    currentStepIndex.value = step > adventure.value.max_step ? adventure.value.max_step : step;
  });

  async function refreshAdventure() {
    adventure.value = await getAdventure(adventureId.value);
  }

  const currentStep = computed(() => {
    return adventure.value.steps[currentStepIndex.value - 1];
  });

  function nextStep() {
    if (adventure.value.max_step === currentStepIndex.value) {
      return;
    }
    currentStepIndex.value += 1;
  }

  function generateAdventureTitle(adventure) {
    return `${adventure.name}（${adventure.record ? adventure.record.current_step : 0} / ${adventure.max_step}）`;
  }

  const sceneDialogVisible = ref(false);
  const sceneContents = ref({});
  function openSceneDialog(contents) {
    sceneContents.value = contents;
    sceneDialogVisible.value = true;
  }

  onMounted(async () => {
    adventures.value = await getAdventures();
  });
</script>

<style lang="less" scoped>
  .adventure-selection {
    width: 100%;
    text-align: center;
    .el-select {
      width: 300px;
    }
  }
  .adventure {
    width: 100%;
    text-align: center;
    .step-panel {
      margin-top: 50px;
      text-align: center;
    }
    .content {
      .process-panel {
        margin-top: 30px;
        .el-button {
          margin-left: 0;
        }
      }
      .description {
        margin-top: 30px;
      }
    }
  }
</style>
