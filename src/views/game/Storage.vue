<template>
  <div>
    <div class="storage">
      <h2>倉庫</h2>
      <ItemTable :items="storage_items">
        <template v-slot:extra-th><th class="table-input-number-th">取出</th></template>
        <template v-slot:extra-td="{ item }">
          <td>
            <div>
              <el-input-number size="mini" :min="1" :max="item.number" v-model="item.select_number"></el-input-number>
              <el-button
                type="primary"
                size="mini"
                @click="take_item_from_storage({ item: item.id, number: item.select_number })"
              >
                取出
              </el-button>
            </div>
          </td>
        </template>
      </ItemTable>
    </div>
    <div class="bag">
      <h2>背包</h2>
      <ItemTable :items="chara_bag_items">
        <template v-slot:extra-th><th class="table-input-number-th">存入</th></template>
        <template v-slot:extra-td="{ item }">
          <td>
            <div>
              <el-input-number size="mini" :min="1" :max="item.number" v-model="item.select_number"></el-input-number>
              <el-button
                type="primary"
                size="mini"
                @click="put_item_to_storage({ item: item.id, number: item.select_number })"
              >
                存入
              </el-button>
            </div>
          </td>
        </template>
      </ItemTable>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import ItemTable from "@/components/ItemTable.vue";
  export default {
    name: "Storage",
    data() {
      return {};
    },
    computed: { ...mapState("chara", ["chara_bag_items"]), ...mapState("item", ["storage_items"]) },
    methods: {
      ...mapActions("item", ["take_item_from_storage", "put_item_to_storage"]),
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { omit: "", fields: "bag_items" });
      this.$store.dispatch("item/get_storage_items");
    },
    components: { ItemTable },
  };
</script>

<style lang="less" scoped>
  .storage {
    width: 48%;
  }
  .slots {
    width: 48%;
  }
</style>
