<template>
  <div>
    <Pagination :fetch-method="get_ugc_dungeons" ref="dungeon_table">
      <template v-slot:main="slot_props">
        <el-table :data="slot_props.records">
          <el-table-column label="地城名稱" align="center" prop="name"></el-table-column>
          <el-table-column label="地城簡介" align="center" prop="description"></el-table-column>
          <el-table-column label="建立者" align="center">
            <template v-slot="scope">
              <CharaLink :chara_name="scope.row.chara.name" :chara_id="scope.row.chara.id"></CharaLink>
            </template>
          </el-table-column>
          <el-table-column label="進度" align="center">
            <template v-slot="scope">
              <span>{{ scope.row.record ? scope.row.record.current_floor : 0 }} / {{ scope.row.max_floor }}</span>
            </template>
          </el-table-column>
          <el-table-column label="行動" align="center">
            <template v-slot="scope">
              <el-button
                v-if="!scope.row.record || scope.row.record.status === 'inactive'"
                type="primary"
                @click="
                  change_ugc_dungeon_record_status({ dungeon: scope.row.id, new_status: 'active' }).then(() =>
                    $refs.dungeon_table.fetch()
                  )
                "
              >
                進入地城
              </el-button>
              <el-button
                v-else-if="scope.row.record.status === 'active'"
                type="success"
                @click="ugc_dungeon_fight({ dungeon: scope.row.id }).then(() => $refs.dungeon_table.fetch())"
              >
                挑戰下一階
              </el-button>
              <el-button
                v-else-if="scope.row.record.status === 'ended'"
                type="primary"
                @click="
                  change_ugc_dungeon_record_status({ dungeon: scope.row.id, new_status: 'inactive' }).then(() =>
                    $refs.dungeon_table.fetch()
                  )
                "
              >
                結算
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
    name: "UGCDungeonList",
    data() {
      return {};
    },
    computed: {},
    methods: { ...mapActions("ugc", ["get_ugc_dungeons", "change_ugc_dungeon_record_status", "ugc_dungeon_fight"]) },
    mounted() {},
    components: { CharaLink, Pagination },
  };
</script>

<style lang="less" scoped></style>
