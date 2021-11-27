<template>
  <el-table :data="data" row-key="id">
    <el-table-column label="名稱" align="center">
      <template slot-scope="scope">
        <el-tooltip effect="dark" :content="extract_item(scope.row) | item_description" placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
        {{ extract_item(scope.row) | item_name }}
      </template>
    </el-table-column>
    <el-table-column label="類型" align="center" width="60px">
      <template slot-scope="scope">
        {{ extract_item(scope.row) | item_type }}
      </template>
    </el-table-column>
    <el-table-column label="屬" align="center" width="50px">
      <template slot-scope="scope">
        {{ extract_item(scope.row) | item_element_type }}
      </template>
    </el-table-column>
    <el-table-column label="數量" align="center" width="50px">
      <template slot-scope="scope">
        {{ extract_item(scope.row) | item_field_value("number") }}
      </template>
    </el-table-column>
    <el-table-column label="攻/防/重量" align="center" width="100px">
      <template slot-scope="scope">
        {{ extract_item(scope.row) | item_attr }}
      </template>
    </el-table-column>
    <el-table-column label="奧義" align="center">
      <template slot-scope="scope">
        {{ extract_item(scope.row) | item_ability }}
      </template>
    </el-table-column>
    <slot name="extra-column"></slot>
  </el-table>
</template>

<script>
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
    props: { data: { type: Array }, itemField: { default: null } },
  };
</script>

<style lang="less" scoped>
  .el-table /deep/ .cell {
    padding-left: 5px;
    padding-right: 5px;
  }
</style>
