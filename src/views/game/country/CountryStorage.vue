<template>
  <div>
    <div style="width: 100%; text-align: center">
      <el-button type="success" @click="upgrade_storage" v-show="chara_official || chara_is_king">
        擴充倉庫({{ $filters.currency(country_profile?.item_limit * 1000000) }})
      </el-button>
    </div>
    <div class="storage">
      <h2 class="page-block-title">國庫（{{ country_item_total }}/{{ country_profile?.item_limit }}）</h2>
      <PaginationItemTable
        :fetch-method="get_country_storage_items"
        ref="country_item_table"
        @change="country_item_total = $refs.country_item_table.total"
      >
        <template v-slot:extra-column>
          <el-table-column label="取出" align="center" :width="150">
            <template v-slot="scope">
              <InputNumberWithButton
                text="取出"
                :max="scope.row.number"
                @click="take_item_from_country_storage({ item: scope.row.id, number: $event }).then(() => refresh())"
              >
              </InputNumberWithButton>
            </template>
          </el-table-column>
        </template>
      </PaginationItemTable>
    </div>
    <div class="bag">
      <h2 class="page-block-title">背包</h2>
      <PaginationItemTable :fetch-method="get_bag_items" ref="bag_item_table">
        <template v-slot:extra-column>
          <el-table-column label="存入" align="center" :width="150">
            <template v-slot="scope">
              <InputNumberWithButton
                text="存入"
                :max="scope.row.number"
                @click="put_item_to_country_storage({ item: scope.row.id, number: $event }).then(() => refresh())"
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
  import InputNumberWithButton from "@/components/InputNumberWithButton";
  import PaginationItemTable from "@/components/PaginationItemTable";

  export default {
    name: "CountryStorage",
    data() {
      return { country_item_total: 0 };
    },
    computed: {
      ...mapState("chara", ["chara_is_king", "chara_official"]),
      ...mapState("country", ["country_profile"]),
    },
    methods: {
      ...mapActions("country", [
        "get_country_storage_items",
        "take_item_from_country_storage",
        "put_item_to_country_storage",
        "upgrade_storage",
      ]),
      ...mapActions("item", ["get_bag_items"]),
      refresh() {
        this.$refs.country_item_table.fetch();
        this.$refs.bag_item_table.fetch();
      },
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "is_king,official,country" }).then(() => {
        this.$store.dispatch("country/get_country_profile");
      });
    },
    components: { InputNumberWithButton, PaginationItemTable },
  };
</script>

<style lang="less" scoped>
  .storage {
    width: 48%;
  }
  .bag {
    width: 48%;
  }
  @media screen and (max-width: 768px) {
    .router-view > div {
      width: 100%;
    }
  }
</style>
