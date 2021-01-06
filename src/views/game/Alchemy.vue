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
            <el-input-number :min="1" v-model="option.select_number"></el-input-number>
            <el-button type="primary" @click="make_alchemy_option({ id: option.id, number: option.select_number })">
              製作
            </el-button>
          </td>
        </tr>
      </table>
    </div>
    <div class="bag" v-if="chara_profile && chara_profile.bag_items">
      <h2>背包</h2>
      <ItemTable :items="chara_profile.bag_items"></ItemTable>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import ItemTable from "@/components/ItemTable.vue";
  export default {
    name: "Alchemy",
    data() {
      return {};
    },
    computed: { ...mapState("ability", ["alchemy_options"]), ...mapState(["chara_profile"]) },
    methods: { ...mapActions("ability", ["make_alchemy_option"]) },
    mounted() {
      this.$store.dispatch("get_chara_profile", { omit: "", fields: "bag_items,proficiency" });
      this.$store.dispatch("ability/get_alchemy_options");
    },
    components: { ItemTable }
  };
</script>

<style lang="less" scoped></style>
