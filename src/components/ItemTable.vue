<template>
  <table>
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
    <tr class="item" v-for="(item, index) in items" :key="index">
      <td>{{ item.equipment ? item.equipment.custom_name : item.type.name }}</td>
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
    props: ["items"]
  };
</script>

<style lang="less" scoped></style>
