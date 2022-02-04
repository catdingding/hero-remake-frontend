<template>
  <div>
    <div>
      <el-card>
        <div slot="header">選擇傳送對象</div>
        <CharaSelect v-model="receiver"></CharaSelect>
      </el-card>
      <el-card class="send-gold">
        <div slot="header">傳送金錢</div>
        <InputNumber v-model="gold" :min="0" size="large" width="180px"></InputNumber>
        <br /><br />
        <el-button type="primary" @click="send_gold({ gold: gold, receiver: receiver })">傳送</el-button>
      </el-card>
    </div>

    <el-card class="send-item">
      <div slot="header">傳送物品</div>
      <PaginationItemTable ref="bag_item_table" :fetch-method="get_bag_items">
        <template v-slot:extra-column>
          <el-table-column label="傳送" align="center" width="150px">
            <template slot-scope="scope">
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
  .send-gold {
    text-align: center;
    margin-top: 30px;
  }
  .send-item {
    width: 65%;
  }
</style>
