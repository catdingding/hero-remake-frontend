<template>
  <el-table :data="slots">
    <el-table-column label="裝備欄" align="center" width="80px">
      <template v-slot="scope">
        {{ scope.row.type.name }}
      </template>
    </el-table-column>
    <el-table-column label="名稱" align="center">
      <template v-slot="scope">
        {{
          scope.row.item
            ? scope.row.item.equipment.display_name + (scope.row.item.equipment.is_locked ? "[綁]" : "")
            : ""
        }}
      </template>
    </el-table-column>
    <el-table-column label="屬" align="center" width="35px">
      <template v-slot="scope">
        {{ scope.row.item ? scope.row.item.equipment.element_type.name : "" }}
      </template>
    </el-table-column>
    <el-table-column label="攻/防/重量" align="center" width="110px">
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

<script>
  export default {
    name: "SlotTable",
    data() {
      return {};
    },
    props: ["slots"],
  };
</script>

<style lang="less" scoped>
  .el-table :deep(.cell) {
    padding-left: 5px;
    padding-right: 5px;
  }
</style>
