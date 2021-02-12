<template>
  <el-table :data="data">
    <el-table-column label="名稱" align="center">
      <template slot-scope="scope">
        <el-tooltip effect="dark" :content="extract_item(scope) | item_description" placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
        {{ extract_item(scope) | item_name }}
      </template>
    </el-table-column>
    <el-table-column label="類型" align="center" width="60px">
      <template slot-scope="scope">
        {{ extract_item(scope) | item_type }}
      </template>
    </el-table-column>
    <el-table-column label="數量" align="center" width="60px">
      <template slot-scope="scope">
        {{ extract_item(scope) | item_field_value("number") }}
      </template>
    </el-table-column>
    <el-table-column label="攻/防/重量" align="center" width="110px">
      <template slot-scope="scope">
        {{ extract_item(scope) | item_attr }}
      </template>
    </el-table-column>
    <el-table-column label="奧義" align="center">
      <template slot-scope="scope">
        {{ extract_item(scope) | object_ability }}
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
      extract_item(scope) {
        if (this.item_field === null) {
          return scope.row;
        } else {
          return scope.row[this.item_field];
        }
      },
    },
    props: { data: { type: Array }, item_field: { default: null } },
  };
</script>

<style lang="less" scoped></style>
