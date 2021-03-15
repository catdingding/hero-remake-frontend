<template>
  <div>
    <div class="slots">
      <CharaWallet></CharaWallet>
      <table>
        <tr>
          <th>裝備欄</th>
          <th>名稱</th>
          <th>攻擊</th>
          <th>防禦</th>
          <th>重量</th>
          <th>奧義1<br />（裝備注入）</th>
          <th>奧義2<br />（奧義石注入）</th>
          <th>強化</th>
        </tr>
        <tr class="item" v-for="(slot, index) in chara_slots" :key="index">
          <td>{{ slot.type.name }}</td>
          <td>{{ slot.item ? slot.item.name : "" }}</td>
          <td>{{ slot.item ? slot.item.equipment.attack : "" }}</td>
          <td>{{ slot.item ? slot.item.equipment.defense : "" }}</td>
          <td>{{ slot.item ? slot.item.equipment.weight : "" }}</td>
          <td>
            <div v-if="slot.item">
              {{ slot.item && slot.item.equipment.ability_1 ? slot.item.equipment.ability_1.name : "無" }}
              <br />
              <el-select placeholder="請選擇裝備" v-model="slot.source_item_1">
                <template v-for="item in chara_bag_items">
                  <el-option
                    :key="item.id"
                    v-if="item.type.category == 1 && item.type.slot_type.id == slot.type.id && item.equipment.ability_1"
                    :label="item.name + '（' + item.equipment.ability_1.name + '）'"
                    :value="item.id"
                  >
                  </el-option>
                </template>
              </el-select>
              <br />
              <el-button
                type="primary"
                @click="smith_replace_ability({ slot_type: slot.type.id, source_item: slot.source_item_1 })"
              >
                注入（消耗{{ compute_replace_ability_cost(slot.item, slot.source_item_1) }}熟練）
              </el-button>
            </div>
          </td>
          <td>
            <div v-if="slot.item">
              {{ slot.item && slot.item.equipment.ability_2 ? slot.item.equipment.ability_2.name : "無" }}
              <br />
              <el-select placeholder="請選擇奧義石" v-model="slot.source_item_2">
                <template v-for="item in chara_bag_items">
                  <el-option
                    v-if="item.type.category == 3 && item.type.slot_type.id == slot.type.id"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </template>
              </el-select>
              <br />
              <el-button
                type="primary"
                @click="smith_replace_ability({ slot_type: slot.type.id, source_item: slot.source_item_2 })"
              >
                注入（消耗{{ compute_replace_ability_cost(slot.item, slot.source_item_2) }}熟練）
              </el-button>
            </div>
          </td>
          <td>
            <div v-if="slot.item">
              {{ slot.item.equipment.upgrade_times }}/{{ slot.item.equipment.upgrade_times_limit }}
              <br />
              <el-button type="primary" @click="smith_upgrade({ slot_type: slot.type.id, times: 1 })">
                強化（消耗{{ slot.item.equipment.element_type.name }}原料*3）
              </el-button>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import CharaWallet from "@/components/CharaWallet.vue";
  export default {
    name: "Smith",
    data() {
      return {};
    },
    computed: { ...mapState("chara", ["chara_slots", "chara_bag_items", "chara_element_type"]) },
    methods: {
      ...mapActions("item", ["smith_upgrade", "smith_replace_ability"]),
      compute_replace_ability_cost(target, source_id) {
        for (let item of this.chara_bag_items) {
          if (item.id === source_id) {
            var source = item;
          }
        }
        if (!target || !source) {
          return 0;
        }
        if (source.type.category === 3) {
          return 25000;
        }
        var cost =
          50 - Math.floor((source.equipment.attack - source.equipment.defense + source.equipment.weight * 3) / 10);
        if (source.equipment.element_type === target.equipment.element_type) {
          cost -= 10;
          if (this.chara_element_type === target.equipment.element_type) {
            cost -= 10;
          }
        }
        cost = Math.max(0, cost);
        return cost * 500;
      },
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", {
        omit: "",
        fields: "slots,bag_items,proficiency,gold",
      });
    },
    components: { CharaWallet },
  };
</script>

<style lang="less" scoped>
  .slots {
    width: 100%;
  }
</style>
