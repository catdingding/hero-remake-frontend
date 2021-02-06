<template>
  <div>
    <div>
      <el-card>
        <div slot="header">選擇傳送對象</div>
        <CharaSelect v-model="receiver"></CharaSelect>
      </el-card>
      <el-card class="send-gold">
        <div slot="header">傳送金錢</div>
        <el-input-number v-model="gold" :min="0" :max="chara_gold"></el-input-number>
        <br /><br />
        <el-button type="primary" @click="send_gold({ gold: gold, receiver: receiver })">傳送</el-button>
      </el-card>
    </div>

    <el-card class="send-item">
      <div slot="header">傳送物品</div>
      <ItemTable :items="chara_bag_items">
        <template v-slot:extra-column>
          <el-table-column label="傳送" align="center" width="150px">
            <template slot-scope="scope">
              <InputNumberWithButton
                text="傳送"
                :max="scope.row.number"
                @click="send_item({ item: scope.row.id, number: $event, receiver: receiver })"
              >
              </InputNumberWithButton>
            </template>
          </el-table-column>
        </template>
      </ItemTable>
    </el-card>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import ItemTable from "@/components/ItemTable.vue";
  import CharaSelect from "@/components/CharaSelect.vue";
  import InputNumberWithButton from "@/components/InputNumberWithButton";

  export default {
    name: "SendItemGold",
    data() {
      return {
        gold: 0,
        receiver: null,
      };
    },
    computed: {
      ...mapState("chara", ["chara_bag_items", "chara_gold"]),
    },
    methods: {
      ...mapActions("item", ["send_item", "send_gold"]),
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { omit: "", fields: "bag_items,gold" });
    },
    components: { ItemTable, CharaSelect, InputNumberWithButton },
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
