<template>
  <table class="small-font">
    <tr>
      <th>名稱</th>
      <th>類型</th>
      <th>數量</th>
      <th>攻擊</th>
      <th>防禦</th>
      <th>重量</th>
      <th>奧義</th>
      <slot name="extra-th"></slot>
    </tr>
    <tr class="item" v-for="item in items" :key="item.id">
      <td>
        <el-tooltip effect="dark" :content="item.type.description" placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
        {{ item.equipment ? item.equipment.display_name : item.type.name }}
      </td>
      <td>{{ item.equipment ? item.type.slot_type.name : "道具" }}</td>
      <td>{{ item.number }}</td>
      <td>{{ item.equipment ? item.equipment.attack : "" }}</td>
      <td>{{ item.equipment ? item.equipment.defense : "" }}</td>
      <td>{{ item.equipment ? item.equipment.weight : "" }}</td>
      <td>{{ item.equipment | object_ability }}</td>
      <slot name="extra-td" :item="item"></slot>
    </tr>
  </table>
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
