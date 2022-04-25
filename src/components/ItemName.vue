<template>
  <span>
    <el-tooltip effect="dark" placement="top">
      <template #content>
        {{ description }}
        <template v-if="battle_effect"> <br />戰場效果：{{ battle_effect }} </template>
      </template>
      <el-icon><InfoFilled /></el-icon>
    </el-tooltip>
    <span :class="{ 'has-battle-effect': battle_effect }">{{ name }} </span>
  </span>
</template>

<script setup>
  import { defineProps, toRef, computed } from "vue";
  import { InfoFilled } from "@element-plus/icons";

  const props = defineProps({ item: { type: Object } });
  const item = toRef(props, "item");

  const name = computed(() => {
    return item.value.equipment
      ? item.value.equipment.display_name + (item.value.equipment.is_locked ? "[綁]" : "")
      : item.value.type.name;
  });
  const description = computed(() => {
    return item.value.type.description;
  });
  const battle_effect = computed(() => {
    return item.value.equipment?.battle_effect?.name;
  });
</script>

<style lang="less" scoped>
  .has-battle-effect {
    color: orangered;
  }
</style>
