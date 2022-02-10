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
      <el-divider></el-divider>
      <h2 class="page-block-title">同伴</h2>
      <div>
        當前同伴：
        {{ chara_partner | partner }}
      </div>
      <el-select v-model="selected_partner" clearable style="width:300px">
        <el-option v-for="partner in chara_partners" :key="partner.id" :label="partner | partner" :value="partner.id" />
      </el-select>
      <el-button type="primary" @click="assign_partner({ partner: selected_partner }).then(() => refresh())">
        更換同伴
      </el-button>
      <el-divider></el-divider>
      <h2 class="page-block-title">稱號</h2>
      <div>
        當前稱號：
        {{ chara_title ? chara_title.type.name : 無 }}
      </div>
      <el-select v-model="selected_title" clearable style="width:300px">
        <el-option v-for="title in chara_titles" :key="title.id" :label="title.type.name" :value="title.id" />
      </el-select>
      <el-button type="primary" @click="set_title({ title: selected_title }).then(() => refresh())">
        更換稱號
      </el-button>
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
      return { bag_item_total: 0, selected_partner: null, selected_title: null };
    },
    computed: {
      ...mapState("chara", [
        "chara_gold",
        "chara_proficiency",
        "chara_slots",
        "chara_bag_item_limit",
        "chara_partner",
        "chara_partners",
        "chara_title",
        "chara_titles",
      ]),
    },
    methods: {
      ...mapActions("item", ["get_bag_items", "use_item", "equip_item", "divest_slot"]),
      ...mapActions("chara", ["assign_partner", "set_title"]),
      refresh() {
        this.$refs.bag_item_table.fetch();
        this.$store.dispatch("chara/get_chara_profile", { fields: "slots,partners,partner,title,titles" });
      },
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", {
        fields: "gold,proficiency,slots,bag_item_limit,partner,partners,title,titles",
      });
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
