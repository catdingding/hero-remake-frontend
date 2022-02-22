<template>
  <div>
    <div>
      <el-card>
        <template #header>
          <div>選擇傳送對象</div>
        </template>
        <CharaSelect v-model="receiver"></CharaSelect>
      </el-card>
      <el-card class="send-gold">
        <template #header>
          <div>傳送金錢</div>
        </template>
        <InputNumber v-model="gold" :min="0" size="large" width="180px"></InputNumber>
        <br /><br />
        <el-button type="primary" @click="send_gold({ gold: gold, receiver: receiver })">傳送</el-button>
      </el-card>
    </div>

    <el-card class="send-item">
      <template #header>
        <div>傳送物品</div>
      </template>
      <PaginationItemTable ref="bag_item_table" :fetch-method="get_bag_items">
        <template v-slot:extra-column>
          <el-table-column label="傳送" align="center" width="150px">
            <template v-slot="scope">
              <InputNumberWithButton
                text="傳送"
                :max="scope.row.number"
                @click="
                  send_item({ item: scope.row.id, number: $event, receiver: receiver }).then(() =>
                    $refs.bag_item_table.fetch()
                  )
                "
              >
              </InputNumberWithButton>
            </template>
          </el-table-column>
        </template>
      </PaginationItemTable>
    </el-card>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import PaginationItemTable from "@/components/PaginationItemTable.vue";
  import CharaSelect from "@/components/CharaSelect.vue";
  import InputNumberWithButton from "@/components/InputNumberWithButton";
  import InputNumber from "@/components/InputNumber";

  export default {
    name: "SendItemGold",
    data() {
      return {
        gold: 0,
        receiver: null,
      };
    },
    computed: {
      ...mapState("chara", ["chara_gold"]),
    },
    methods: {
      ...mapActions("item", ["get_bag_items", "send_item", "send_gold"]),
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "gold" });
    },
    components: { PaginationItemTable, CharaSelect, InputNumberWithButton, InputNumber },
  };
</script>

<style lang="less" scoped>
  .el-card {
    text-align: center;
    margin-top: 30px;
  }
  .send-item {
    width: 65%;
  }
  @media screen and (max-width: 768px) {
    .router-view > div {
      width: 100%;
    }
  }
</style>
