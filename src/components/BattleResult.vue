<template>
  <div v-if="battle_result">
    <div style="width: 100%;">
      <div class="header">
        <div>攻擊方</div>
        <div>防禦方</div>
      </div>
      <RecycleScroller class="scroller" :items="filtered_logs" key-field="index" :item-size="125">
        <template v-slot="{ item }">
          <div class="round">
            <div class="attackers">
              <div class="charas">
                <div
                  class="chara"
                  v-for="(chara, chara_index) in item.charas.filter((x) => x.team === 'attacker')"
                  :key="chara_index"
                >
                  <BattleCharaStatus :chara="chara" />
                </div>
              </div>
              <div class="actions">
                <div v-for="(action, action_index) in item.actions" :key="action_index" class="action">
                  <span v-if="action.team === 'attacker'">{{ action.message }}</span>
                </div>
              </div>
            </div>
            <div class="defenders">
              <div class="charas">
                <div
                  class="chara"
                  v-for="(chara, chara_index) in item.charas.filter((x) => x.team === 'defender')"
                  :key="chara_index"
                >
                  <BattleCharaStatus :chara="chara" />
                </div>
              </div>
              <div class="actions">
                <div v-for="(action, action_index) in item.actions" :key="action_index" class="action">
                  <span v-if="action.team === 'defender'">{{ action.message }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </RecycleScroller>
      <div class="result">
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
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import BattleCharaStatus from "@/components/BattleCharaStatus.vue";

  export default {
    name: "BattleResult",
    data() {
      return {
        winner_mesasage: { attacker: "攻擊方獲得了勝利！", defender: "防禦方獲得了勝利！", draw: "雙方不分勝負……" },
      };
    },
    computed: {
      ...mapState("battle", ["battle_result"]),
      filtered_logs() {
        return this.battle_result.logs.filter((x) => x.actions.length !== 0);
      },
      loots() {
        if (this.battle_result.loots) {
          return this.battle_result.loots.map((x) => x.name + "×" + x.number).join("、");
        } else {
          return "";
        }
      },
    },
    components: { BattleCharaStatus },
  };
</script>

<style lang="less" scoped>
  .round {
    display: flex;
    padding: 10px;
    background-color: #fff;
    border-bottom: 1px solid #999;

    & > .defenders {
      flex-direction: row-reverse;
    }
    & > div {
      display: flex;
      width: 50%;
    }
    .charas {
      display: flex;
    }
    .actions {
      flex: 1;
      text-align: center;

      .action {
        height: 24px;
      }
    }
  }

  .header {
    display: flex;
    padding: 15px;
    font-size: 16px;
    font-weight: 700;
    background-color: #fff;
    margin-bottom: 10px;

    div {
      width: 50%;
      &:nth-child(2) {
        text-align: right;
      }
    }
  }
  .result {
    width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  .scroller {
    height: 500px;
  }
</style>
