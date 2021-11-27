<template>
  <div>
    <div class="storage">
      <h2 class="page-block-title">倉庫（{{ storage_item_total }}/{{ chara_storage_item_limit }}）</h2>
      <PaginationItemTable
        :fetch-method="get_storage_items"
        ref="storage_item_table"
        @change="storage_item_total = $refs.storage_item_table.total"
      >
        <template v-slot:extra-column>
          <el-table-column label="取出" align="center" width="120px">
            <template slot-scope="scope">
              <InputNumberWithButton
                text="取出"
                :max="scope.row.number"
                @click="take_item_from_storage({ item: scope.row.id, number: $event }).then(() => refresh())"
              >
              </InputNumberWithButton>
            </template>
          </el-table-column>
        </template>
      </PaginationItemTable>
    </div>
    <div class="bag">
      <h2 class="page-block-title">背包（{{ bag_item_total }}/{{ chara_bag_item_limit }}）</h2>
      <PaginationItemTable
        :fetch-method="get_bag_items"
        ref="bag_item_table"
        @change="bag_item_total = $refs.bag_item_table.total"
      >
        <template v-slot:extra-column>
          <el-table-column label="存入" align="center" width="120px">
            <template slot-scope="scope">
              <InputNumberWithButton
                text="存入"
                :max="scope.row.number"
                @click="put_item_to_storage({ item: scope.row.id, number: $event }).then(() => refresh())"
              >
              </InputNumberWithButton>
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
  import InputNumberWithButton from "@/components/InputNumberWithButton";

  export default {
    name: "Storage",
    data() {
      return { storage_item_total: 0, bag_item_total: 0 };
    },
    computed: {
      ...mapState("chara", ["chara_storage_item_limit", "chara_bag_item_limit"]),
    },
    methods: {
      ...mapActions("item", ["get_bag_items", "get_storage_items", "take_item_from_storage", "put_item_to_storage"]),
      refresh() {
        this.$refs.storage_item_table.fetch();
        this.$refs.bag_item_table.fetch();
      },
    },
    activated() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "storage_item_limit,bag_item_limit" });
    },
    components: { PaginationItemTable, InputNumberWithButton },
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
