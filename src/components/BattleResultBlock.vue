<template>
  <div v-if="battle_result">
    <div style="width: 100%">
      <div class="panel">
        <el-slider v-model="index" :min="1" :max="filtered_logs.length" @change="stopPlay" />
        <el-input-number size="small" v-model="index" :min="1" :max="filtered_logs.length" @change="stopPlay" />
        <span>/</span>
        <span>{{ filtered_logs.length }}</span>
        <div class="play-control">
          <el-button @click="index = 1">開頭</el-button>
          <el-button v-show="!isPlaying" @click="startPlay">播放</el-button>
          <el-button v-show="isPlaying" @click="stopPlay">暫停</el-button>
          <el-button @click="index = filtered_logs.length">結束</el-button>
        </div>
      </div>
      <div class="round" v-if="currentLog">
        <div class="attackers">
          <div class="header">攻擊方</div>
          <div class="charas">
            <div
              class="chara"
              v-for="(chara, chara_index) in currentLog.charas.filter((x) => x.team === 'attacker')"
              :key="chara_index"
            >
              <BattleCharaStatus :chara="chara" />
            </div>
          </div>
        </div>
        <div class="defenders">
          <div class="header">防禦方</div>
          <div class="charas">
            <div
              class="chara"
              v-for="(chara, chara_index) in currentLog.charas.filter((x) => x.team === 'defender')"
              :key="chara_index"
            >
              <BattleCharaStatus :chara="chara" />
            </div>
          </div>
        </div>
        <div class="actions">
          <div v-for="(action, action_index) in currentLog.actions" :key="action_index" class="action">
            <span>{{ action.message }}</span>
          </div>
        </div>
      </div>
      <div class="result" v-show="index == filtered_logs.length">
        {{ winner_mesasage[battle_result.winner] }}<br />
        <div>
          <div v-show="battle_result.gold">獲得了 {{ battle_result.gold }} 金錢</div>
          <div v-show="battle_result.proficiency">獲得了 {{ battle_result.proficiency }} 熟練</div>
          <div v-show="battle_result.exp">獲得了 {{ battle_result.exp }} 經驗值</div>
          <div v-show="loots">獲得了 {{ loots }}</div>
        </div>
        <div v-for="(message, index) in battle_result.messages" :key="index">
          {{ message }}
        </div>
        <router-link v-if="props.show_home_button" to="/game">
          <el-button type="primary">返回主頁</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, defineProps, onMounted } from "vue";
  import { useStore } from "vuex";
  import BattleCharaStatus from "@/components/BattleCharaStatus.vue";

  const props = defineProps({ show_home_button: { type: Boolean, default: false } });
  const store = useStore();

  const winner_mesasage = { attacker: "攻擊方獲得了勝利！", defender: "防禦方獲得了勝利！", draw: "雙方不分勝負……" };
  const battle_result = computed(() => store.state.battle.battle_result);
  const filtered_logs = computed(() => {
    return battle_result.value.logs.filter((x) => x.actions.length !== 0);
  });
  const loots = computed(() => {
    if (battle_result.value.loots) {
      return battle_result.value.loots.map((x) => x.name + "×" + x.number).join("、");
    } else {
      return "";
    }
  });

  const index = ref(1);
  const currentLog = computed(() => filtered_logs.value[index.value - 1]);
  const addIndex = () => {
    if (index.value >= filtered_logs.value.length) {
      stopPlay();
      return;
    }
    index.value += 1;
  };

  const isPlaying = ref(true);
  const frequency = ref(1000);
  let playingInterval = null;
  const startPlay = () => {
    playingInterval = setInterval(addIndex, frequency.value);
    isPlaying.value = true;
  };
  const stopPlay = () => {
    clearInterval(playingInterval);
    isPlaying.value = false;
  };

  onMounted(() => startPlay());
</script>

<style lang="less" scoped>
  .round {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    background-color: var(--color-white);
    border-bottom: 1px solid #999;

    & > .defenders {
      flex-direction: row-reverse;
    }
    .attackers,
    .defenders {
      display: flex;
      flex-wrap: wrap;
      width: 50%;
      @media screen and (max-width: 480px) {
        & {
          width: 100%;
        }
      }

      .header {
        padding: 10px;
        font-size: 16px;
        font-weight: 700;
        width: 100%;
        text-align: center;
      }
    }
    .charas {
      display: flex;
      flex-wrap: wrap;
      @media screen and (max-width: 480px) {
        & {
          width: 100%;
        }
        .chara {
          width: 100%;
        }
      }
    }
    .actions {
      width: 100%;
      min-height: 120px;
      text-align: center;
      .action {
        height: 24px;
      }
    }
  }

  .panel {
    text-align: center;
    .play-control {
      margin-top: 15px;
      .el-button {
        width: 100px;
      }
    }
    > span {
      line-height: 24px;
      font-size: 16px;
      padding-left: 8px;
    }
  }
  .result {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  .scroller {
    height: 500px;
  }
</style>
