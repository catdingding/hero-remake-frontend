<template>
  <div>
    <Pagination :fetch-method="get_chara_achievement_types">
      <template v-slot:main="slot_props">
        <el-table :data="slot_props.records">
          <el-table-column label="成就名稱" align="center" prop="name"></el-table-column>
          <el-table-column label="稱號" align="center" prop="title_type.name"></el-table-column>
          <el-table-column label="已取得" align="center">
            <template v-slot="scope">
              <span v-if="scope.row.obtained">已取得</span>
              <span v-else style="color: #aaa">
                未取得({{ scope.row.counter_value || 0 }}/{{ scope.row.requirement }})
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </Pagination>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import Pagination from "@/components/Pagination";

  export default {
    name: "CharaAchievementTypeList",
    data() {
      return {};
    },
    computed: {},
    methods: {
      ...mapActions("chara", ["get_chara_achievement_types"]),
    },
    mounted() {},
    components: { Pagination },
  };
</script>

<style lang="less" scoped></style>
