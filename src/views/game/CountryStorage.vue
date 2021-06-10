<template>
  <div>
    <div style="width: 100%;text-align: center">
      <el-button type="success" @click="upgrade_storage" v-show="chara_official || chara_is_king">
        擴充倉庫({{ (_.get(country_profile, "item_limit") * 1000000) | currency }})
      </el-button>
    </div>
    <div class="storage">
      <h2 class="page-block-title">
        國庫（{{ country_storage_items.length }}/{{ _.get(country_profile, "item_limit") }}）
      </h2>
      <ItemTable :data="country_storage_items">
        <template v-slot:extra-column>
          <el-table-column label="取出" align="center" :width="150">
            <template slot-scope="scope">
              <InputNumberWithButton
                text="取出"
                :max="scope.row.number"
                @click="take_item_from_country_storage({ item: scope.row.id, number: $event })"
              >
              </InputNumberWithButton>
            </template>
          </el-table-column>
        </template>
      </ItemTable>
    </div>
    <div class="bag">
      <h2 class="page-block-title">背包</h2>
      <ItemTable :data="chara_bag_items">
        <template v-slot:extra-column>
          <el-table-column label="存入" align="center" :width="150">
            <template slot-scope="scope">
              <InputNumberWithButton
                text="存入"
                :max="scope.row.number"
                @click="put_item_to_country_storage({ item: scope.row.id, number: $event })"
              >
              </InputNumberWithButton>
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
  import InputNumberWithButton from "@/components/InputNumberWithButton";

  export default {
    name: "CountryStorage",
    data() {
      return {};
    },
    computed: {
      ...mapState("chara", ["chara_bag_items", "chara_is_king", "chara_official"]),
      ...mapState("country", ["country_storage_items", "country_profile"]),
    },
    methods: {
      ...mapActions("country", ["take_item_from_country_storage", "put_item_to_country_storage", "upgrade_storage"]),
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "bag_items,is_king,official,country" }).then(() => {
        this.$store.dispatch("country/get_country_profile");
        this.$store.dispatch("country/get_country_storage_items");
      });
    },
    components: { ItemTable, InputNumberWithButton },
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
