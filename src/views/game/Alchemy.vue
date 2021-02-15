<template>
  <div>
    <div>
      <table>
        <tr>
          <th>名稱</th>
          <th>消耗熟練度</th>
          <th>製作</th>
        </tr>
        <tr v-for="(option, index) in alchemy_options" :key="index">
          <td>{{ option.item_type.name }}</td>
          <td>{{ option.proficiency_cost }}</td>
          <td>
            <InputNumberWithButton text="製作" @click="make_alchemy_option({ id: option.id, number: $event })">
            </InputNumberWithButton>
          </td>
        </tr>
      </table>
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
      this.$store.dispatch("chara/get_chara_profile", { omit: "", fields: "bag_items,proficiency" });
      this.$store.dispatch("ability/get_alchemy_options");
    },
    components: { ItemTable, InputNumberWithButton },
  };
</script>

<style lang="less" scoped>
  .bag {
    width: 48%;
  }
</style>
