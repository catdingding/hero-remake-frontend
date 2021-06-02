<template>
  <div>
    <div style="width: 100%;">
      奧義注入：以奧義石注入固定消耗25000熟練值，以裝備注入所消耗的熟練會依照攻防重而不同<br />
      強化：消耗與裝備同屬性的原料*3與1500萬金錢
    </div>
    <div class="slots">
      <CharaWallet></CharaWallet>
      <table>
        <tr>
          <th style="width:60px">裝備欄</th>
          <th>名稱</th>
          <th>屬性</th>
          <th>攻擊</th>
          <th>防禦</th>
          <th>重量</th>
          <th>奧義1</th>
          <th>奧義2</th>
          <th>強化</th>
          <th>轉屬</th>
        </tr>
        <tr class="item" v-for="(slot, index) in chara_slots" :key="index">
          <td>{{ slot.type.name }}</td>
          <td>{{ slot.item ? slot.item.name : "" }}</td>
          <td>{{ slot.item ? slot.item.equipment.element_type.name : "" }}</td>
          <td>{{ slot.item ? slot.item.equipment.attack : "" }}</td>
          <td>{{ slot.item ? slot.item.equipment.defense : "" }}</td>
          <td>{{ slot.item ? slot.item.equipment.weight : "" }}</td>
          <td>
            <div v-if="slot.item">
              {{ slot.item && slot.item.equipment.ability_1 ? slot.item.equipment.ability_1.name : "無" }}
              <br />
              <el-select v-if="slot.type.id != 4" placeholder="請選擇裝備" v-model="slot.source_item_1">
                <template v-for="item in chara_bag_items">
                  <el-option
                    :key="item.id"
                    v-if="item.type.category == 1 && item.type.slot_type.id == slot.type.id && item.equipment.ability_1"
                    :label="item.name + '(' + item.equipment.ability_1.name + ')'"
                    :value="item.id"
                  >
                  </el-option>
                </template>
              </el-select>
              <el-select v-else placeholder="請選擇寵物/飾奧石" v-model="slot.source_item_1">
                <template v-for="item in chara_bag_items">
                  <el-option
                    :key="item.id"
                    v-if="
                      (item.type.category == 3 && item.type.slot_type.id == 3) ||
                        (item.type.category == 1 && item.type.slot_type.id == slot.type.id && item.equipment.ability_1)
                    "
                    :label="item.name + (item.equipment ? '(' + item.equipment.ability_1.name + ')' : '')"
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
                注入(消耗{{ compute_replace_ability_cost(slot.item, slot.source_item_1) }}熟練)
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
                注入(消耗{{ compute_replace_ability_cost(slot.item, slot.source_item_2) }}熟練)
              </el-button>
            </div>
          </td>
          <td>
            <div v-if="slot.item && slot.type.id != 4">
              {{ slot.item.equipment.upgrade_times }}/{{ slot.item.equipment.upgrade_times_limit }}
              <br />
              <el-button type="primary" @click="smith_upgrade({ slot_type: slot.type.id, times: 1 })">
                強化
              </el-button>
            </div>
          </td>
          <td>
            <div v-if="slot.item && slot.type.id != 4">
              <el-select v-model="slot.new_element_type" style="width:200px">
                <el-option
                  v-for="item in element_types"
                  :value="item.id"
                  :key="item.id"
                  :label="item.name"
                ></el-option> </el-select
              ><br />
              <el-button
                v-if="slot.item.equipment.upgrade_times === slot.item.equipment.upgrade_times_limit"
                type="primary"
                @click="
                  smith_replace_element_type({ slot_type: slot.type.id, new_element_type: slot.new_element_type })
                "
              >
                更改屬性(強化歸零)
              </el-button>
              <el-button v-else disabled>需強化滿級</el-button>
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
    computed: {
      ...mapState("chara", ["chara_slots", "chara_bag_items", "chara_element_type"]),
      ...mapState(["element_types"]),
    },
    methods: {
      ...mapActions("item", ["smith_upgrade", "smith_replace_ability", "smith_replace_element_type"]),
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
          50 - Math.floor((source.equipment.attack + source.equipment.defense - source.equipment.weight * 3) / 10);
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
      this.$store.dispatch("refresh_element_types");
      this.$store.dispatch("chara/get_chara_profile", { fields: "slots,bag_items,proficiency,gold" });
    },
    components: { CharaWallet },
  };
</script>

<style lang="less" scoped>
  .slots {
    width: 100%;
  }
</style>
