<template>
  <div v-if="data">
    <div class="main">
      <!-- 基本 -->
      <div class="attribute">
        <div>
          <div>名稱</div>
          <div>{{ data.name }}</div>
        </div>
        <div>
          <div>屬性</div>
          <div>{{ data.element_type.name }}</div>
        </div>
        <div>
          <div>奧義</div>
          <div>{{ data.abilities.map((x) => x.name).join("、") }}</div>
        </div>
        <div>
          <div>技能</div>
          <div>{{ data.skill_settings.map((x) => x.skill.name).join("、") }}</div>
        </div>
      </div>
      <!-- 屬性 -->
      <div class="attribute">
        <div>
          <div>HP</div>
          <div>{{ data.hp }}</div>
        </div>
        <div>
          <div>MP</div>
          <div>{{ data.mp }}</div>
        </div>
        <div v-for="attr in data.attributes" :key="attr.id">
          <div>{{ attr.type.name }}</div>
          <div>{{ attr.value }}</div>
        </div>
      </div>
      <!-- 贈送/索取 -->
      <div class="store">
        友好度：{{ data.chara_relation ? data.chara_relation.friendliness : 0 }}
        <div>
          <el-divider>贈送</el-divider>
          <div v-for="favorite in data.favorites" :key="favorite.id" class="option">
            {{ favorite.item_type.name }}
            (+{{ favorite.friendliness_reward }}友好)
            <InputNumberWithButton
              text="贈送"
              @click="submit_favorite({ favorite: favorite.id, number: $event, npc_id: data.id }).then(fetch)"
            ></InputNumberWithButton>
          </div>
        </div>

        <div>
          <el-divider>索取</el-divider>
          <div v-for="option in data.exchange_options" :key="option.id" class="option">
            {{ option.item_type.name }}
            (-{{ option.friendliness_cost }}友好)
            <InputNumberWithButton
              text="索取"
              @click="exchange({ exchange_option: option.id, number: $event, npc_id: data.id }).then(fetch)"
            ></InputNumberWithButton>
          </div>
        </div>

        <div>
          <el-divider>其他</el-divider>
          <div>
            <el-button type="primary" @click="fight">切磋</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-divider>說明</el-divider>
    <div class="introduction">{{ data.info.description }}</div>
  </div>
</template>

<script setup>
  import { ref, computed, defineProps, onMounted } from "vue";
  import { useStore } from "vuex";
  import InputNumberWithButton from "@/components/InputNumberWithButton";
  import { get_npc_profile, submit_favorite, exchange, fight_npc } from "@/api/npc";
  const store = useStore();
  const props = defineProps({ npcId: { type: Number } });
  const data = ref(null);

  const fetch = async () => {
    data.value = await get_npc_profile(props.npcId);
  };
  const fight = async () => {
    let result = await fight_npc(data.value.id);
    await store.dispatch("battle/open_battle_result_dialog", result);
  };

  onMounted(async () => {
    await fetch();
  });
</script>

<style lang="less" scoped>
  .main {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    & > div {
      flex: 1;
      padding: 15px;
      @media (max-width: 768px) {
        flex: 0 0 100%;
        padding: 0;
      }
      &.attribute > div {
        margin: 5px 0 5px 0;
        width: 100%;
        display: flex;
        div {
          line-height: 24px;
        }
        div:nth-child(1) {
          width: 30%;
        }
        div:nth-child(2) {
          width: 70%;
          text-align: right;
        }
      }

      &.store {
        flex: 2;
      }
      &.store .option div {
        display: inline-block;
      }
    }
  }

  .introduction {
    white-space: pre-wrap;
  }
</style>
