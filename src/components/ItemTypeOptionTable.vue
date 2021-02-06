<template>
  <el-table :data="options">
    <el-table-column label="名稱" align="center">
      <template slot-scope="scope">
        <el-tooltip effect="dark" :content="scope.row.item_type.description" placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
        {{ scope.row.item_type.name }}
      </template>
    </el-table-column>
    <el-table-column label="類型" align="center" width="60px">
      <template slot-scope="scope">
        {{ scope.row.item_type.slot_type ? scope.row.item_type.slot_type.name : "道具" }}
      </template>
    </el-table-column>
    <el-table-column label="攻/防/重量" align="center" width="100px">
      <template slot-scope="scope">
        {{ scope.row.item_type.slot_type ? scope.row.item_type.attack : "" }}
        {{ scope.row.item_type.slot_type ? "/" : "" }}
        {{ scope.row.item_type.slot_type ? scope.row.item_type.defense : "" }}
        {{ scope.row.item_type.slot_type ? "/" : "" }}
        {{ scope.row.item_type.slot_type ? scope.row.item_type.weight : "" }}
      </template>
    </el-table-column>
    <el-table-column label="奧義" align="center">
      <template slot-scope="scope">
        {{ scope.row.item_type | object_ability }}
      </template>
    </el-table-column>
    <slot name="extra-column"></slot>
  </el-table>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: "ItemTypeOptionTable",
    data() {
      return {};
    },
    props: ["options"],
  };
</script>

<style lang="less" scoped></style>
