<template>
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
    <el-card>
      <div slot="header">傳送物品</div>
      <ItemTable :items="chara_bag_items">
        <template v-slot:extra-th><th>傳送</th></template>
        <template v-slot:extra-td="{ item }">
          <td>
            <div>
              <el-input-number :min="1" :max="item.number" size="mini" v-model="item.select_number"></el-input-number>
              <el-button
                type="primary"
                size="mini"
                @click="send_item({ item: item.id, number: item.select_number, receiver: receiver })"
              >
                傳送
              </el-button>
            </div>
          </td>
        </template>
      </ItemTable>
    </el-card>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import ItemTable from "@/components/ItemTable.vue";
  import CharaSelect from "@/components/CharaSelect.vue";

  export default {
    name: "SendItemGold",
    data() {
      return {
        gold: 0,
        receiver: null
      };
    },
    computed: {
      ...mapState("chara", ["chara_bag_items", "chara_gold"])
    },
    methods: {
      ...mapActions("item", ["send_item", "send_gold"])
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { omit: "", fields: "bag_items,gold" });
    },
    components: { ItemTable, CharaSelect }
  };
</script>

<style lang="less" scoped>
  .send-gold {
    text-align: center;
  }
</style>
