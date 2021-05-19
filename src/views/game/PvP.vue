<template>
  <div>
    <el-table :data="pvp_opponents">
      <el-table-column label="角色名稱" align="center" prop="name"></el-table-column>
      <el-table-column label="PvP分數" align="center" prop="pvp_points"></el-table-column>
      <el-table-column label="挑戰" align="center">
        <template slot-scope="scope">
          <el-button type="primary" :disabled="chara_id === scope.row.id" @click="pvp_fight(scope.row.id)">
            挑戰
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "PvP",
    data() {
      return {};
    },
    computed: { ...mapState("battle", ["pvp_opponents"]), ...mapState("chara", ["chara_id", "chara_pvp_points"]) },
    methods: {
      ...mapActions("battle", ["pvp_fight"]),
    },
    mounted() {
      this.$store.dispatch("battle/get_pvp_opponents");
      this.$store.dispatch("chara/get_chara_profile", { omit: "", fields: "id,pvp_points" });
    },
  };
</script>

<style lang="less" scoped></style>
