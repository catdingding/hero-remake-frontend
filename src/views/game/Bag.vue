<template>
  <div>
    <div class="slots" v-if="chara_profile && chara_profile.slots">
      <table>
        <tr>
          <th>裝備欄</th>
          <th>名稱</th>
          <th>攻擊</th>
          <th>防禦</th>
          <th>重量</th>
          <th>奧義</th>
          <th>卸下</th>
        </tr>
        <tr class="item" v-for="(slot, index) in chara_profile.slots" :key="index">
          <td>{{ slot.type.name }}</td>
          <td>{{ slot.item ? slot.item.equipment.custom_name : "" }}</td>
          <td>{{ slot.item ? slot.item.equipment.attack : "" }}</td>
          <td>{{ slot.item ? slot.item.equipment.defense : "" }}</td>
          <td>{{ slot.item ? slot.item.equipment.weight : "" }}</td>
          <td>{{ slot.item ? slot.item.equipment : "" | object_ability }}</td>
          <td>
            <div v-if="slot.item">
              <Button type="primary" @click="divest_slot({ slot_type: slot.type.id })">卸下</Button>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="bag" v-if="chara_profile && chara_profile.bag_items">
      <ItemTable :items="chara_profile.bag_items">
        <template v-slot:extra-th>
          <th>使用/裝備</th>
        </template>
        <template v-slot:extra-td="{ item }">
          <td>
            <div v-if="item.type.use_effect">
              <InputNumber :min="1" v-model="item.select_number"></InputNumber>
              <Button type="primary" @click="use_item({ item: item.id, number: item.select_number })">使用</Button>
            </div>
            <div v-if="item.equipment">
              <Button type="primary" @click="equip_item({ item: item.id })">裝備</Button>
            </div>
          </td>
        </template>
      </ItemTable>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import ItemTable from "@/components/ItemTable.vue";
  export default {
    name: "Bag",
    data() {
      return {};
    },
    computed: { ...mapState(["chara_profile"]) },
    methods: {
      ...mapActions("item", ["use_item", "equip_item", "divest_slot"])
    },
    mounted() {
      this.$store.dispatch("get_chara_profile", { omit: "", fields: "slots,bag_items" });
    },
    components: { ItemTable }
  };
</script>

<style lang="less" scoped>
  .bag {
    width: 55%;
  }
  .slots {
    width: 40%;
  }
</style>
