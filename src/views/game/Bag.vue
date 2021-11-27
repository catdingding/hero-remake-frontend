<template>
  <div>
    <div class="slots">
      <h2 class="page-block-title">裝備欄</h2>
      <SlotTable :slots="chara_slots">
        <template v-slot:extra-column>
          <el-table-column label="卸下" align="center">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.item"
                type="primary"
                size="mini"
                @click="divest_slot({ slot_type: scope.row.type.id }).then(() => refresh())"
              >
                卸下
              </el-button>
            </template>
          </el-table-column>
        </template>
      </SlotTable>
    </div>
    <div class="bag">
      <h2 class="page-block-title">背包（{{ bag_item_total }}/{{ chara_bag_item_limit }}）</h2>
      <PaginationItemTable
        :fetch-method="get_bag_items"
        ref="bag_item_table"
        @change="bag_item_total = $refs.bag_item_table.total"
      >
        <template v-slot:extra-column>
          <el-table-column label="使用/裝備" align="center" :width="120">
            <template slot-scope="scope">
              <div v-if="scope.row.type.use_effect">
                <InputNumberWithButton
                  text="使用"
                  :max="scope.row.number"
                  @click="use_item({ item: scope.row.id, number: $event }).then(() => refresh())"
                >
                </InputNumberWithButton>
              </div>
              <div v-if="scope.row.equipment">
                <el-button type="primary" size="mini" @click="equip_item({ item: scope.row.id }).then(() => refresh())">
                  裝備
                </el-button>
              </div>
            </template>
          </el-table-column>
        </template>
      </PaginationItemTable>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import PaginationItemTable from "@/components/PaginationItemTable.vue";
  import SlotTable from "@/components/SlotTable.vue";
  import InputNumberWithButton from "@/components/InputNumberWithButton";

  export default {
    name: "Bag",
    data() {
      return { bag_item_total: 0 };
    },
    computed: {
      ...mapState("chara", ["chara_gold", "chara_proficiency", "chara_slots", "chara_bag_item_limit"]),
    },
    methods: {
      ...mapActions("item", ["get_bag_items", "use_item", "equip_item", "divest_slot"]),
      refresh() {
        this.$refs.bag_item_table.fetch();
        this.$store.dispatch("chara/get_chara_profile", { fields: "slots" });
      },
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "gold,proficiency,slots,bag_item_limit" });
    },
    components: { PaginationItemTable, SlotTable, InputNumberWithButton },
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
