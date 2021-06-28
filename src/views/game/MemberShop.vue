<template>
  <div>
    <div>當前贊助點數：{{ chara_member_point }}</div>
    <table>
      <tr>
        <th style="width:50%">項目</th>
        <th>價格</th>
        <th>購買</th>
      </tr>
      <tr>
        <td>減少行動冷卻時間(20s=>15s)</td>
        <td>300點</td>
        <td>
          <el-button
            type="primary"
            size="mini"
            :disabled="chara_has_cold_down_bonus"
            @click="buy_member_shop({ option: 'buy-cold-down-bonus' })"
            >購買</el-button
          >
        </td>
      </tr>
      <tr>
        <td>戰鬥後回血回魔</td>
        <td>200點</td>
        <td>
          <el-button
            type="primary"
            size="mini"
            :disabled="chara_has_auto_heal"
            @click="buy_member_shop({ option: 'buy-auto-heal' })"
            >購買</el-button
          >
        </td>
      </tr>
      <tr>
        <td>任務提交後，累積數量不清零（只扣需求量）</td>
        <td>200點</td>
        <td>
          <el-button
            type="primary"
            size="mini"
            :disabled="chara_has_quest_bonus"
            @click="buy_member_shop({ option: 'buy-quest-bonus' })"
          >
            購買
          </el-button>
        </td>
      </tr>
      <tr>
        <td>降低等級（本轉可再降低{{ 300 - chara_record.level_down_count }}級）</td>
        <td>20點</td>
        <td>
          <InputNumberWithButton
            text="購買"
            :max="300 - chara_record.level_down_count"
            @click="buy_member_shop({ option: 'buy-level-down', number: $event })"
          >
          </InputNumberWithButton>
        </td>
      </tr>
      <tr>
        <td>擴充背包（可再擴充{{ 60 - chara_bag_item_limit }}格）</td>
        <td>20點</td>
        <td>
          <InputNumberWithButton
            text="購買"
            :max="60 - chara_bag_item_limit"
            @click="buy_member_shop({ option: 'buy-bag-item-limit', number: $event })"
          >
          </InputNumberWithButton>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import InputNumberWithButton from "@/components/InputNumberWithButton";

  export default {
    name: "MemberShop",
    data() {
      return {};
    },
    computed: {
      ...mapState("chara", [
        "chara_record",
        "chara_bag_item_limit",
        "chara_member_point",
        "chara_has_cold_down_bonus",
        "chara_has_quest_bonus",
        "chara_has_auto_heal",
      ]),
    },
    methods: { ...mapActions("trade", ["buy_member_shop"]) },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", {
        fields: "record,bag_item_limit,member_point,has_cold_down_bonus,has_quest_bonus,has_auto_heal",
      });
    },
    components: { InputNumberWithButton },
  };
</script>

<style lang="less" scoped></style>
