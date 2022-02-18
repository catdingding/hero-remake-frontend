<template>
  <el-table :data="options">
    <el-table-column label="名稱" align="center">
      <template v-slot="scope">
        <el-tooltip effect="dark" :content="scope.row.item_type.description" placement="top">
          <el-icon><InfoFilled /></el-icon>
        </el-tooltip>
        {{ scope.row.item_type.name }}
      </template>
    </el-table-column>
    <el-table-column label="類型" align="center" width="50px">
      <template v-slot="scope">
        {{ scope.row.item_type.slot_type ? scope.row.item_type.slot_type.name : "道具" }}
      </template>
    </el-table-column>
    <el-table-column label="屬" align="center" width="35px">
      <template v-slot="scope">
        {{ scope.row.item_type.slot_type ? scope.row.item_type.element_type.name : "" }}
      </template>
    </el-table-column>
    <el-table-column label="攻/防/重量" align="center" width="100px">
      <template v-slot="scope">
        {{ scope.row.item_type.slot_type ? scope.row.item_type.attack : "" }}
        {{ scope.row.item_type.slot_type ? "/" : "" }}
        {{ scope.row.item_type.slot_type ? scope.row.item_type.defense : "" }}
        {{ scope.row.item_type.slot_type ? "/" : "" }}
        {{ scope.row.item_type.slot_type ? scope.row.item_type.weight : "" }}
      </template>
    </el-table-column>
    <el-table-column label="奧義" align="center">
      <template v-slot="scope">
        {{ $filters.object_ability(scope.row.item_type) }}
      </template>
    </el-table-column>
    <slot name="extra-column"></slot>
  </el-table>
</template>

<script>
  import { InfoFilled } from "@element-plus/icons";
  export default {
    name: "ItemTypeOptionTable",
    data() {
      return {};
    },
    props: ["options"],
    components: { InfoFilled },
  };
</script>

<style lang="less" scoped>
  .el-table :deep(.cell) {
    padding-left: 5px;
    padding-right: 5px;
  }
</style>
