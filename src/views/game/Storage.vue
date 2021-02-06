<template>
  <div>
    <div class="storage">
      <h2>倉庫</h2>
      <ItemTable :items="storage_items">
        <template v-slot:extra-column>
          <el-table-column label="取出" align="center" :width="150">
            <template slot-scope="scope">
              <el-input-number
                size="mini"
                :min="1"
                :max="scope.row.number"
                v-model="scope.row.select_number"
              ></el-input-number>
              <el-button
                type="primary"
                size="mini"
                @click="take_item_from_storage({ item: scope.row.id, number: scope.row.select_number })"
              >
                取出
              </el-button>
            </template>
          </el-table-column>
        </template>
      </ItemTable>
    </div>
    <div class="bag">
      <h2>背包</h2>
      <ItemTable :items="chara_bag_items">
        <template v-slot:extra-column>
          <el-table-column label="存入" align="center" :width="150">
            <template slot-scope="scope">
              <el-input-number
                size="mini"
                :min="1"
                :max="scope.row.number"
                v-model="scope.row.select_number"
              ></el-input-number>
              <el-button
                type="primary"
                size="mini"
                @click="put_item_to_storage({ item: scope.row.id, number: scope.row.select_number })"
              >
                存入
              </el-button>
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
  .bag {
    width: 48%;
  }
</style>
