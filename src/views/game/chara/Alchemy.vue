<template>
  <div>
    <div class="alchemy">
      <h2 class="page-block-title">製作選項</h2>
      <el-table :data="alchemy_options">
        <el-table-column label="名稱" align="center" prop="item_type.name"></el-table-column>
        <el-table-column label="消耗熟練度" align="center" prop="proficiency_cost"></el-table-column>
        <el-table-column label="製作" align="center" prop="created_at">
          <template v-slot="scope">
            <InputNumberWithButton
              text="製作"
              @click="
                make_alchemy_option({ id: scope.row.id, number: $event }).then(() => $refs.bag_item_table.fetch())
              "
            >
            </InputNumberWithButton>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bag">
      <h2 class="page-block-title">背包</h2>
      <PaginationItemTable ref="bag_item_table" :fetch-method="get_bag_items"> </PaginationItemTable>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import PaginationItemTable from "@/components/PaginationItemTable.vue";
  import InputNumberWithButton from "@/components/InputNumberWithButton";

  export default {
    name: "Alchemy",
    data() {
      return {};
    },
    computed: {
      ...mapState("ability", ["alchemy_options"]),
      ...mapState("chara", ["chara_proficiency"]),
    },
    methods: {
      ...mapActions("ability", ["make_alchemy_option"]),
      ...mapActions("item", ["get_bag_items"]),
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "proficiency" });
      this.$store.dispatch("ability/get_alchemy_options");
    },
    components: { PaginationItemTable, InputNumberWithButton },
  };
</script>

<style lang="less" scoped>
  .alchemy,
  .bag {
    width: 48%;
  }
</style>
