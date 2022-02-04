<template>
  <div>
    <div>
      佔領可獲得競技場點數*5，每佔領6分鐘可獲得競技場點數*1(被趕下臺時發放)<br />
      通用競技場獎勵翻倍<br />
      平手情況下，若挑戰者的血量剩餘比例較高也判為挑戰成功<br />
      每人同時只能佔領一座競技場<br />
      每佔領一小時，能力下降1%，至多下降90%
    </div>
    <div>
      <el-table :data="arenas">
        <el-table-column label="競技場名稱" prop="name" align="center"> </el-table-column>
        <el-table-column label="當前佔領者" align="center">
          <template slot-scope="scope">
            <CharaLink
              v-if="scope.row.occupier"
              :chara_name="scope.row.occupier.name"
              :chara_id="scope.row.occupier.id"
            />
          </template>
        </el-table-column>
        <el-table-column label="佔領時間" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.occupied_at | datetime_display }}</span>
            <span v-show="scope.row.occupied_at">({{ compute_hours_passed(scope.row.occupied_at) }}小時前)</span>
          </template>
        </el-table-column>
        <el-table-column label="挑戰" align="center">
          <template slot-scope="scope">
            <el-button type="primary" :disabled="chara_id === scope.row.id" @click="arena_fight(scope.row.id)">
              挑戰(競技場入場券*1)
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from "vuex";
  import CharaLink from "@/components/CharaLink";

  export default {
    name: "Arena",
    data() {
      return {};
    },
    computed: {
      ...mapGetters(["get_client_time"]),
      ...mapState("battle", ["arenas"]),
    },
    methods: {
      ...mapActions("battle", ["get_arenas", "arena_fight"]),
      compute_hours_passed(time) {
        var ms = this.get_client_time() - Date.parse(time);
        return Math.floor(ms / 1000 / 3600);
      },
    },
    mounted() {
      this.get_arenas();
    },
    components: { CharaLink },
  };
</script>

<style lang="less" scoped></style>
