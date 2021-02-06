<template>
  <div>
    <div class="slots">
      <table class="small-font">
        <tr>
          <th>裝備欄</th>
          <th>名稱</th>
          <th>攻擊</th>
          <th>防禦</th>
          <th>重量</th>
          <th>奧義</th>
          <th>卸下</th>
        </tr>
        <tr class="item" v-for="(slot, index) in chara_slots" :key="index">
          <td>{{ slot.type.name }}</td>
          <td>{{ slot.item ? slot.item.equipment.display_name : "" }}</td>
          <td>{{ slot.item ? slot.item.equipment.attack : "" }}</td>
          <td>{{ slot.item ? slot.item.equipment.defense : "" }}</td>
          <td>{{ slot.item ? slot.item.equipment.weight : "" }}</td>
          <td>{{ slot.item ? slot.item.equipment : "" | object_ability }}</td>
          <td>
            <div v-if="slot.item">
              <el-button type="primary" size="mini" @click="divest_slot({ slot_type: slot.type.id })">卸下</el-button>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="bag">
      <ItemTable :items="chara_bag_items">
        <template v-slot:extra-column>
          <el-table-column label="使用/裝備" align="center" :width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.type.use_effect">
                <el-input-number size="mini" :min="1" v-model="scope.row.select_number"></el-input-number>
                <el-button
                  type="primary"
                  size="mini"
                  @click="use_item({ item: scope.row.id, number: scope.row.select_number })"
                >
                  使用
                </el-button>
              </div>
              <div v-if="scope.row.equipment">
                <el-button type="primary" size="mini" @click="equip_item({ item: scope.row.id })">裝備</el-button>
              </div>
            </template>
          </el-table-column>
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
    computed: { ...mapState("chara", ["chara_gold", "chara_proficiency", "chara_slots", "chara_bag_items"]) },
    methods: {
      ...mapActions("item", ["use_item", "equip_item", "divest_slot"]),
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { omit: "", fields: "gold,proficiency,slots,bag_items" });
    },
    components: { ItemTable },
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
