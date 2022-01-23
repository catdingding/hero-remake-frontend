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
              @click="submit_favorite({ favorite: favorite.id, number: $event, npc_id: data.id })"
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
              @click="exchange({ exchange_option: option.id, number: $event, npc_id: data.id })"
            ></InputNumberWithButton>
          </div>
        </div>
      </div>
    </div>
    <el-divider>說明</el-divider>
    <div class="introduction">{{ data.info.description }}</div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import InputNumberWithButton from "@/components/InputNumberWithButton";
  export default {
    name: "NPCProfileCard",
    data() {
      return {};
    },
    props: { data: { type: Object } },
    methods: { ...mapActions("npc", ["submit_favorite", "exchange"]) },
    components: { InputNumberWithButton },
  };
</script>

<style lang="less" scoped>
  .main {
    display: flex;
    & > div {
      flex: 1;
      padding: 15px;
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
