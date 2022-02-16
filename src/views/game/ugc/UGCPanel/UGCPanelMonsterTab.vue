<template>
  <div>
    <div style="text-align:center">
      <el-button type="primary" @click="open_dialog(null)">新增怪物</el-button><br />
      上限10個
    </div>
    <Pagination
      v-if="chara_id"
      :fetch-method="get_ugc_monsters"
      :fixed_conditions="{ chara: chara_id }"
      ref="monster_table"
    >
      <template v-slot:main="slot_props">
        <el-table :data="slot_props.records">
          <el-table-column label="怪物名稱" align="center" prop="name"></el-table-column>
          <el-table-column label="操作" align="center">
            <template v-slot="scope">
              <el-button type="primary" @click="open_dialog(scope.row.id)">
                編輯
              </el-button>
              <el-button
                type="danger"
                @click="delete_ugc_monster({ monster: scope.row.id }).then(() => $refs.monster_table.fetch())"
              >
                刪除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </Pagination>
    <el-dialog title="編輯" v-model="dialog_visible" width="80%">
      <UGCPanelMonsterForm v-if="dialog_visible" :monster_id="dialog_monster_id" @save="$refs.monster_table.fetch()">
      </UGCPanelMonsterForm>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import Pagination from "@/components/Pagination";
  import UGCPanelMonsterForm from "./UGCPanelMonsterForm";

  export default {
    name: "UGCPanelMonsterTab",
    data() {
      return { dialog_visible: false, dialog_monster_id: null };
    },
    computed: { ...mapState("chara", ["chara_id"]) },
    methods: {
      ...mapActions("ugc", ["get_ugc_monsters", "delete_ugc_monster"]),
      open_dialog(monster_id) {
        this.dialog_visible = true;
        this.dialog_monster_id = monster_id;
      },
    },
    mounted() {},
    components: { Pagination, UGCPanelMonsterForm },
  };
</script>

<style lang="less" scoped></style>
