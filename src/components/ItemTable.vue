<template>
  <el-table :data="data" row-key="id">
    <el-table-column label="名稱" align="center">
      <template v-slot="scope">
        <ItemName :item="extract_item(scope.row)" />
      </template>
    </el-table-column>
    <el-table-column label="類型" align="center" width="60px">
      <template v-slot="scope">
        {{ $filters.item_type(extract_item(scope.row)) }}
      </template>
    </el-table-column>
    <el-table-column label="屬" align="center" width="50px">
      <template v-slot="scope">
        {{ $filters.item_element_type(extract_item(scope.row)) }}
      </template>
    </el-table-column>
    <el-table-column label="數量" align="center" width="50px">
      <template v-slot="scope">
        {{ extract_item(scope.row).number }}
      </template>
    </el-table-column>
    <el-table-column label="攻/防/重" align="center" width="100px">
      <template v-slot="scope">
        {{ $filters.item_attr(extract_item(scope.row)) }}
      </template>
    </el-table-column>
    <el-table-column label="奧義" align="center">
      <template v-slot="scope">
        {{ $filters.item_ability(extract_item(scope.row)) }}
      </template>
    </el-table-column>
    <slot name="extra-column"></slot>
  </el-table>
</template>

<script>
  import ItemName from "@/components/ItemName";
  export default {
    name: "ItemTable",
    data() {
      return {};
    },
    methods: {
      extract_item(row) {
        if (this.itemField === null) {
          return row;
        } else {
          return row[this.itemField];
        }
      },
    },
    props: { data: { type: Array, default: () => [] }, itemField: { default: null } },
    components: { ItemName },
  };
</script>

<style lang="less" scoped>
  .el-table :deep(.cell) {
    padding-left: 5px;
    padding-right: 5px;
  }
</style>
