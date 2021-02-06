<template>
  <el-table :data="items">
    <el-table-column label="名稱" align="center">
      <template slot-scope="scope">
        <el-tooltip effect="dark" :content="scope.row.type.description" placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
        {{ scope.row.equipment ? scope.row.equipment.display_name : scope.row.type.name }}
      </template>
    </el-table-column>
    <el-table-column label="類型" align="center" width="80px">
      <template slot-scope="scope">
        {{ scope.row.equipment ? scope.row.type.slot_type.name : "道具" }}
      </template>
    </el-table-column>
    <el-table-column label="數量" align="center" width="80px">
      <template slot-scope="scope">
        {{ scope.row.number }}
      </template>
    </el-table-column>
    <el-table-column label="攻/防/重量" align="center">
      <template slot-scope="scope">
        {{ scope.row.equipment ? scope.row.equipment.attack : "" }}
        {{ scope.row.equipment ? "/" : "" }}
        {{ scope.row.equipment ? scope.row.equipment.defense : "" }}
        {{ scope.row.equipment ? "/" : "" }}
        {{ scope.row.equipment ? scope.row.equipment.weight : "" }}
      </template>
    </el-table-column>
    <el-table-column label="奧義" align="center">
      <template slot-scope="scope">
        {{ scope.row.equipment | object_ability }}
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
    props: ["items"],
  };
</script>

<style lang="less" scoped></style>
