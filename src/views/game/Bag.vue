<template>
  <div>
    <div class="slots">
      <SlotTable :slots="chara_slots">
        <template v-slot:extra-column>
          <el-table-column label="卸下" align="center">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.item"
                type="primary"
                size="mini"
                @click="divest_slot({ slot_type: scope.row.type.id })"
              >
                卸下
              </el-button>
            </template>
          </el-table-column>
        </template>
      </SlotTable>
    </div>
    <div class="bag">
      <ItemTable :data="chara_bag_items">
        <template v-slot:extra-column>
          <el-table-column label="使用/裝備" align="center" :width="120">
            <template slot-scope="scope">
              <div v-if="scope.row.type.use_effect">
                <InputNumberWithButton
                  text="使用"
                  :max="scope.row.number"
                  @click="use_item({ item: scope.row.id, number: $event })"
                >
                </InputNumberWithButton>
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
  import SlotTable from "@/components/SlotTable.vue";
  import InputNumberWithButton from "@/components/InputNumberWithButton";

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
      this.$store.dispatch("chara/get_chara_profile", { fields: "gold,proficiency,slots,bag_items" });
    },
    components: { ItemTable, SlotTable, InputNumberWithButton },
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
