<template>
  <div>
    <div style="text-align:center">
      <el-button type="primary" @click="open_dialog(null)">新增地城</el-button><br />
      上限2個
    </div>
    <Pagination :fetch-method="get_ugc_dungeons" :fixed_conditions="{ chara: chara_id }" ref="dungeon_table">
      <template v-slot:main="slot_props">
        <el-table :data="slot_props.records">
          <el-table-column label="地城名稱" align="center" prop="name"></el-table-column>
          <el-table-column label="地城簡介" align="center" prop="description"></el-table-column>
          <el-table-column label="操作" align="center">
            <template v-slot="scope">
              <el-button type="primary" @click="open_dialog(scope.row.id)">
                編輯
              </el-button>
              <el-button
                type="danger"
                @click="delete_ugc_dungeon({ dungeon: scope.row.id }).then(() => $refs.dungeon_table.fetch())"
              >
                刪除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </Pagination>
    <el-dialog title="編輯" v-model="dialog_visible" width="50%">
      <UGCPanelDungeonForm v-if="dialog_visible" :dungeon_id="dialog_dungeon_id" @save="$refs.dungeon_table.fetch()">
      </UGCPanelDungeonForm>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import Pagination from "@/components/Pagination";
  import UGCPanelDungeonForm from "./UGCPanelDungeonForm";

  export default {
    name: "UGCPanelDungeonTab",
    data() {
      return { dialog_visible: false, dialog_dungeon_id: null };
    },
    computed: { ...mapState("chara", ["chara_id"]) },
    methods: {
      ...mapActions("ugc", ["get_ugc_dungeons", "delete_ugc_dungeon"]),
      open_dialog(dungeon_id) {
        this.dialog_visible = true;
        this.dialog_dungeon_id = dungeon_id;
      },
    },
    mounted() {},
    components: { Pagination, UGCPanelDungeonForm },
  };
</script>

<style lang="less" scoped></style>
