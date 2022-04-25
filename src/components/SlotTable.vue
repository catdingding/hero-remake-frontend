<template>
  <el-table :data="slots">
    <el-table-column label="欄位" align="center" width="60px">
      <template v-slot="scope">
        {{ scope.row.type.name }}
      </template>
    </el-table-column>
    <el-table-column label="名稱" align="center">
      <template v-slot="scope">
        <ItemName v-if="scope.row.item" :item="scope.row.item" />
      </template>
    </el-table-column>
    <el-table-column label="屬" align="center" width="35px">
      <template v-slot="scope">
        {{ scope.row.item ? scope.row.item.equipment.element_type.name : "" }}
      </template>
    </el-table-column>
    <el-table-column label="攻/防/重" align="center" width="100px">
      <template v-slot="scope">
        {{ scope.row.item ? scope.row.item.equipment.attack : "" }}
        {{ scope.row.item ? "/" : "" }}
        {{ scope.row.item ? scope.row.item.equipment.defense : "" }}
        {{ scope.row.item ? "/" : "" }}
        {{ scope.row.item ? scope.row.item.equipment.weight : "" }}
      </template>
    </el-table-column>
    <el-table-column label="奧義" align="center">
      <template v-slot="scope">
        {{ $filters.object_ability(scope.row.item ? scope.row.item.equipment : "") }}
      </template>
    </el-table-column>
    <slot name="extra-column"></slot>
  </el-table>
</template>

<script setup>
  import { defineProps, toRef, computed } from "vue";
  import ItemName from "@/components/ItemName";

  const props = defineProps({ slots: { type: Object } });
  const slots = toRef(props, "slots");
</script>

<style lang="less" scoped>
  .el-table :deep(.cell) {
    padding-left: 5px;
    padding-right: 5px;
  }
</style>
