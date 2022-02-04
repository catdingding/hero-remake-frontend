<template>
  <div>
    <div>
      <div style="width: 100%;">
        失敗率：20%
      </div>
      <el-table :data="chara_battle_map_tickets">
        <el-table-column label="地圖類型" align="center" prop="battle_map.name"></el-table-column>
        <el-table-column label="當前數量" align="center" prop="value"></el-table-column>
        <el-table-column label="製作" align="center" prop="created_at">
          <template slot-scope="scope">
            <InputNumberWithButton
              text="製作"
              @click="battle_map_ticket_to_item({ battle_map: scope.row.battle_map.id, number: $event })"
            >
            </InputNumberWithButton>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import InputNumberWithButton from "@/components/InputNumberWithButton";

  export default {
    name: "BattleMapTicketToItem",
    data() {
      return {};
    },
    computed: { ...mapState("chara", ["chara_battle_map_tickets"]) },
    methods: { ...mapActions("item", ["battle_map_ticket_to_item"]) },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "battle_map_tickets" });
    },
    components: { InputNumberWithButton },
  };
</script>

<style lang="less" scoped></style>
