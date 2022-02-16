<template>
  <div>
    <div><el-button type="primary" @click="mirror_fight">與自己的鏡像對戰</el-button></div>
    <Pagination :fetch-method="get_pvp_opponents" ref="pvp_table">
      <template v-slot:main="slot_props">
        <el-table :data="slot_props.records">
          <el-table-column label="角色名稱" align="center">
            <template v-slot="scope">
              <CharaLink :chara_name="scope.row.name" :chara_id="scope.row.id"></CharaLink>
            </template>
          </el-table-column>
          <el-table-column label="PvP分數" align="center" prop="pvp_points"></el-table-column>
          <el-table-column label="挑戰" align="center">
            <template v-slot="scope">
              <el-button
                type="primary"
                :disabled="chara_id === scope.row.id"
                @click="pvp_fight(scope.row.id).then(() => $refs.pvp_table.fetch())"
              >
                挑戰
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </Pagination>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import CharaLink from "@/components/CharaLink";
  import Pagination from "@/components/Pagination";

  export default {
    name: "PvP",
    data() {
      return {};
    },
    computed: { ...mapState("chara", ["chara_id", "chara_pvp_points"]) },
    methods: {
      ...mapActions("battle", ["get_pvp_opponents", "pvp_fight", "mirror_fight"]),
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "id,pvp_points" });
    },
    components: { CharaLink, Pagination },
  };
</script>

<style lang="less" scoped></style>
