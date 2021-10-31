<template>
  <el-table :data="data" row-key="id">
    <el-table-column
      label="名稱"
      align="center"
      sortable
      sort-by="type.id"
      :filters="[
        { text: '綁定', value: true },
        { text: '非綁定', value: false },
      ]"
      :filter-method="filter_item_is_locked"
    >
      <template slot-scope="scope">
        <el-tooltip effect="dark" :content="extract_item(scope.row) | item_description" placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
        {{ extract_item(scope.row) | item_name }}
      </template>
    </el-table-column>
    <el-table-column
      label="類型"
      align="center"
      width="60px"
      :filters="[
        { text: '武器', value: '武器' },
        { text: '防具', value: '防具' },
        { text: '飾品', value: '飾品' },
        { text: '寵物', value: '寵物' },
        { text: '奧義石', value: '奧義石' },
        { text: '道具', value: '道具' },
      ]"
      :filter-method="filter_item_type"
    >
      <template slot-scope="scope">
        {{ extract_item(scope.row) | item_type }}
      </template>
    </el-table-column>
    <el-table-column
      label="屬"
      align="center"
      width="50px"
      :filters="[
        { text: '無', value: '無' },
        { text: '火', value: '火' },
        { text: '水', value: '水' },
        { text: '風', value: '風' },
        { text: '星', value: '星' },
        { text: '雷', value: '雷' },
        { text: '光', value: '光' },
        { text: '暗', value: '暗' },
      ]"
      :filter-method="filter_element_type"
    >
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
  import { mapState } from "vuex";
  export default {
    name: "ItemTable",
    data() {
      return {};
    },
    methods: {
      extract_item(row) {
        if (this.item_field === null) {
          return row;
        } else {
          return row[this.item_field];
        }
      },
      filter_item_type(value, row, column) {
        return this.$options.filters.item_type(this.extract_item(row)) == value;
      },
      filter_element_type(value, row, column) {
        return this.$options.filters.item_element_type(this.extract_item(row)) == value;
      },
      filter_item_is_locked(value, row, column) {
        var item = this.extract_item(row);
        return (!!item.equipment && item.equipment.is_locked) === value;
      },
    },
    props: { data: { type: Array }, item_field: { default: null } },
  };
</script>

<style lang="less" scoped>
  .el-table /deep/ .cell {
    padding-left: 5px;
    padding-right: 5px;
  }
</style>
