<template>
  <el-table :data="slots">
    <el-table-column label="裝備欄" align="center" width="80px">
      <template slot-scope="scope">
        {{ scope.row.type.name }}
      </template>
    </el-table-column>
    <el-table-column label="名稱" align="center">
      <template slot-scope="scope">
        {{ scope.row.item ? scope.row.item.equipment.display_name : "" }}
      </template>
    </el-table-column>
    <el-table-column label="攻/防/重量" align="center" width="110px">
      <template slot-scope="scope">
        {{ scope.row.item ? scope.row.item.equipment.attack : "" }}
        {{ scope.row.item ? "/" : "" }}
        {{ scope.row.item ? scope.row.item.equipment.defense : "" }}
        {{ scope.row.item ? "/" : "" }}
        {{ scope.row.item ? scope.row.item.equipment.weight : "" }}
      </template>
    </el-table-column>
    <el-table-column label="奧義" align="center">
      <template slot-scope="scope">
        {{ scope.row.item ? scope.row.item.equipment : "" | object_ability }}
      </template>
    </el-table-column>
    <slot name="extra-column"></slot>
  </el-table>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: "SlotTable",
    data() {
      return {};
    },
    props: ["slots"],
  };
</script>

<style lang="less" scoped></style>
