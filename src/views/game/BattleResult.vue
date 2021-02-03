<template>
  <div v-if="battle_result">
    <div style="width: 100%;">
      <div class="header">
        <div>攻擊方</div>
        <div>防禦方</div>
      </div>

      <RecycleScroller class="scroller" :items="battle_result.logs" key-field="index" :item-size="110">
        <template v-slot="{ item }">
          <div class="round">
            <div class="attackers">
              <div class="charas">
                <div
                  class="chara"
                  v-for="(chara, chara_index) in item.charas.filter(x => x.team === 'attacker')"
                  :key="chara_index"
                >
                  <BattleCharaStatus :chara="chara" />
                </div>
              </div>
              <div class="actions">
                <div
                  v-for="(action, action_index) in item.actions.filter(x => x.team === 'attacker')"
                  :key="action_index"
                >
                  {{ action.message }}
                </div>
              </div>
            </div>
            <div class="defenders">
              <div class="charas">
                <div
                  class="chara"
                  v-for="(chara, chara_index) in item.charas.filter(x => x.team === 'defender')"
                  :key="chara_index"
                >
                  <BattleCharaStatus :chara="chara" />
                </div>
              </div>
              <div class="actions">
                <div
                  v-for="(action, action_index) in item.actions.filter(x => x.team === 'defender')"
                  :key="action_index"
                >
                  <div>{{ action.message }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </RecycleScroller>
      <div class="result">
        {{ winner_mesasage[battle_result.winner] }}<br />
        <div v-if="battle_result.winner === 'attacker'">
          獲得了 {{ battle_result.gold }} 金錢<br />
          獲得了 {{ battle_result.proficiency }} 熟練<br />
          獲得了 {{ battle_result.exp }} 經驗值<br />
          <span v-if="loots">獲得了 {{ loots }}<br /></span>
        </div>
        <router-link to="./"><el-button type="primary" size="medium">返回主頁</el-button></router-link>
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
        winner_mesasage: { attacker: "攻擊方獲得了勝利！", defender: "防禦方獲得了勝利！", draw: "雙方不分勝負……" }
      };
    },
    computed: {
      ...mapState("battle", ["battle_result"]),
      loots() {
        return this.battle_result.loots.map(x => x.name + x.number).join("、");
      }
    },
    components: { BattleCharaStatus }
  };
</script>

<style lang="less" scoped>
  .round {
    display: flex;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #fff;

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
