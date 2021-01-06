<template>
  <table>
    <tr>
      <th>名稱</th>
      <th>類型</th>
      <th>攻擊</th>
      <th>防禦</th>
      <th>重量</th>
      <th>奧義</th>
      <th>購買</th>
      <th>價格</th>
    </tr>
    <tr class="item" v-for="(option, index) in options" :key="index">
      <td>{{ option.item_type.name }}</td>
      <td>{{ option.item_type.slot_type ? option.item_type.slot_type.name : "道具" }}</td>
      <td>{{ option.item_type.attack }}</td>
      <td>{{ option.item_type.defense }}</td>
      <td>{{ option.item_type.weight }}</td>
      <td>{{ option.item_type | object_ability }}</td>
      <td>{{ option.item_type.value }}</td>
      <td>
        <div>
          <InputNumber :min="1" v-model="option.select_number"></InputNumber>
          <Button type="primary" @click="buy_store_option({ id: option.id, number: option.select_number })">
            購買
          </Button>
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "StoreOptionTable",
    data() {
      return {};
    },
    props: ["options"],
    methods: mapActions("trade", ["buy_store_option"])
  };
</script>

<style lang="less" scoped></style>
