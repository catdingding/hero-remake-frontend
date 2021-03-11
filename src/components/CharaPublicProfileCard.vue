<template>
  <div v-if="data">
    <div class="attribute">
      <!-- 基本 -->
      <div>
        <div>
          <span>名稱</span><span>{{ data.name }}</span>
        </div>
        <div>
          <span>國籍</span><span>{{ data.country === null ? "無所屬" : data.country.name }}</span>
        </div>
        <div>
          <span>職業</span><span>{{ data.job.name }}</span>
        </div>
        <div>
          <span>屬性</span><span>{{ data.element_type.name }}</span>
        </div>
        <div>
          <span>等級</span><span>{{ data.level }}</span>
        </div>
      </div>
      <!-- 屬性 -->
      <div>
        <div>
          <span>HP</span><span>{{ data.hp }} / {{ data.hp_max }}</span>
        </div>
        <div>
          <span>MP</span><span>{{ data.mp }}/ {{ data.mp_max }}</span>
        </div>
        <div class="attr" v-for="attr in data.attributes" :key="attr.id">
          <span>{{ attr.type.name }}</span>
          <span>{{ attr.value }}</span>
        </div>
      </div>
      <!-- 裝備 -->
      <div>
        <div v-for="slot in data.slots" :key="slot.id">
          <span>{{ slot.type.name }}</span>
          <span v-if="slot.item">
            {{ slot.item | item_name }}{{ slot.item | item_attr }}{{ slot.item | item_ability }}
          </span>
          <span v-else>無</span>
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
        height: 24px;

        span:nth-child(1) {
          width: 30%;
          line-height: 24px;
          display: inline-block;
        }
        span:nth-child(2) {
          width: 70%;
          line-height: 24px;
          text-align: right;
          display: inline-block;
        }
      }
    }
  }

  .introduction {
    white-space: pre-wrap;
  }
</style>
