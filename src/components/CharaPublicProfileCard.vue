<template>
  <div v-if="data">
    <div class="attribute">
      <!-- 基本 -->
      <div>
        <div>
          <div>名稱</div>
          <div>{{ data.name }}</div>
        </div>
        <div>
          <div>國籍</div>
          <div>{{ data.country | country_name }}</div>
        </div>
        <div>
          <div>職業</div>
          <div>{{ data.job.name }}</div>
        </div>
        <div>
          <div>屬性</div>
          <div>{{ data.element_type.name }}</div>
        </div>
        <div>
          <div>等級</div>
          <div>{{ data.level }}</div>
        </div>
      </div>
      <!-- 屬性 -->
      <div>
        <div>
          <div>HP</div>
          <div>{{ data.hp }} / {{ data.hp_max }}</div>
        </div>
        <div>
          <div>MP</div>
          <div>{{ data.mp }}/ {{ data.mp_max }}</div>
        </div>
        <div class="attr" v-for="attr in data.attributes" :key="attr.id">
          <div>{{ attr.type.name }}</div>
          <div>{{ attr.value }}</div>
        </div>
      </div>
      <!-- 裝備 -->
      <div>
        <div v-for="slot in data.slots" :key="slot.id" class="slot">
          <div>{{ slot.type.name }}</div>
          <div v-if="slot.item">
            {{ slot.item | item_name }}{{ slot.item | item_attr }}<br />{{ slot.item | item_ability }}
          </div>
          <div v-else>無</div>
        </div>
      </div>
    </div>
    <el-divider>自傳</el-divider>
    <div class="introduction">{{ data.introduction.content }}</div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "CharaPublicProfileCard",
    data() {
      return {};
    },
    props: { data: { type: Object } },
    methods: {},
  };
</script>

<style lang="less" scoped>
  .attribute {
    display: flex;
    & > div {
      flex: 1;
      padding: 15px;
      & > div {
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
    }
  }

  .introduction {
    white-space: pre-wrap;
  }
</style>
