<template>
  <table class="small-font">
    <tr>
      <th>名稱</th>
      <th>類型</th>
      <th>攻擊</th>
      <th>防禦</th>
      <th>重量</th>
      <th>奧義</th>
      <slot name="extra-th"></slot>
    </tr>
    <tr v-for="(option, index) in options" :key="index">
      <td>
        <el-tooltip effect="dark" :content="option.item_type.description" placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
        {{ option.item_type.name }}
      </td>
      <td>{{ option.item_type.slot_type ? option.item_type.slot_type.name : "道具" }}</td>
      <td>{{ option.item_type.attack }}</td>
      <td>{{ option.item_type.defense }}</td>
      <td>{{ option.item_type.weight }}</td>
      <td>{{ option.item_type | object_ability }}</td>
      <slot name="extra-td" :option="option"></slot>
    </tr>
  </table>
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
