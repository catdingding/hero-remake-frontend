<template>
  <div>
    <el-table :data="lotteries">
      <el-table-column label="彩券名稱" align="center" prop="name"></el-table-column>
      <el-table-column label="期數" align="center" prop="nth"></el-table-column>
      <el-table-column label="累積獎金" align="center">
        <template slot-scope="scope"> {{ scope.row.gold | currency }} </template>
      </el-table-column>
      <el-table-column label="每注價格" align="center">
        <template slot-scope="scope"> {{ scope.row.price | currency }} </template>
      </el-table-column>
      <el-table-column label="號碼範圍" align="center">
        <template slot-scope="scope"> {{ scope.row.number_min }}-{{ scope.row.number_max }} </template>
      </el-table-column>
      <el-table-column label="購買張數上限" align="center" prop="chara_ticket_limit"></el-table-column>
      <el-table-column label="已購買號碼" align="center">
        <template slot-scope="scope">
          {{ scope.row.tickets.map((x) => x.number).join("、") }}
        </template>
      </el-table-column>
      <el-table-column label="購買(輸入號碼)" align="center">
        <template slot-scope="scope">
          <InputNumberWithButton
            text="購買"
            :default="scope.row.number_min"
            :min="scope.row.number_min"
            :max="scope.row.number_max"
            @click="buy_lottery({ lottery: scope.row.id, number: $event })"
          >
          </InputNumberWithButton>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import InputNumberWithButton from "@/components/InputNumberWithButton";

  export default {
    name: "Lottery",
    data() {
      return {};
    },
    computed: {
      ...mapState("chara", ["chara_gold"]),
      ...mapState("trade", ["lotteries"]),
    },
    methods: {
      ...mapActions("trade", ["buy_lottery"]),
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "gold" });
      this.$store.dispatch("trade/get_lotteries");
    },
    components: { InputNumberWithButton },
  };
</script>

<style lang="less" scoped></style>
