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
          <div>{{ $filters.country_name(data.country) }}</div>
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
        <div>
          <div>總戰數</div>
          <div>{{ data.record.total_battle }}</div>
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
        <div v-for="attr in data.attributes" :key="attr.id">
          <div>{{ attr.type.name }}</div>
          <div>{{ attr.value }}</div>
        </div>
      </div>
      <!-- 裝備 -->
      <div>
        <div v-for="slot in data.slots" :key="slot.id">
          <div>{{ slot.type.name }}</div>
          <div v-if="slot.item">
            <ItemName :item="slot.item" />-{{ $filters.item_element_type(slot.item) }}<br />
            {{ $filters.item_attr(slot.item) }}<br />
            {{ $filters.item_ability(slot.item) }}
          </div>
          <div v-else>無</div>
        </div>
        <div>
          <div>同伴</div>
          <div>{{ $filters.partner(data.partner) }}</div>
        </div>
      </div>
    </div>
    <el-divider>自傳</el-divider>
    <div class="introduction">{{ data.introduction.content }}</div>
    <el-divider>家園</el-divider>
    <CharaHome style="margin: 0 auto" :data="data.home" />
  </div>
</template>

<script setup>
  import { defineProps, toRef } from "vue";
  import ItemName from "@/components/ItemName";
  import CharaHome from "@/components/CharaHome";
  const props = defineProps({ data: { type: Object } });
  const data = toRef(props, "data");
</script>

<style lang="less" scoped>
  .attribute {
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
