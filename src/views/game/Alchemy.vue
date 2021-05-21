<template>
  <div>
    <div class="alchemy">
      <h2 class="page-block-title">製作選項</h2>
      <el-table :data="alchemy_options">
        <el-table-column label="名稱" align="center" prop="item_type.name"></el-table-column>
        <el-table-column label="消耗熟練度" align="center" prop="proficiency_cost"></el-table-column>
        <el-table-column label="製作" align="center" prop="created_at">
          <template slot-scope="scope">
            <InputNumberWithButton text="製作" @click="make_alchemy_option({ id: scope.row.id, number: $event })">
            </InputNumberWithButton>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bag">
      <h2 class="page-block-title">背包</h2>
      <ItemTable :data="chara_bag_items"></ItemTable>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import ItemTable from "@/components/ItemTable.vue";
  import InputNumberWithButton from "@/components/InputNumberWithButton";

  export default {
    name: "Alchemy",
    data() {
      return {};
    },
    computed: {
      ...mapState("ability", ["alchemy_options"]),
      ...mapState("chara", ["chara_bag_items", "chara_proficiency"]),
    },
    methods: { ...mapActions("ability", ["make_alchemy_option"]) },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "bag_items,proficiency" });
      this.$store.dispatch("ability/get_alchemy_options");
    },
    components: { ItemTable, InputNumberWithButton },
  };
</script>

<style lang="less" scoped>
  .alchemy,
  .bag {
    width: 48%;
  }
</style>
