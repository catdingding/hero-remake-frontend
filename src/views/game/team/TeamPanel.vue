<template>
  <div>
    <el-row type="flex" justify="space-around" style="width: 100%" v-if="team_profile">
      <el-col :span="24">
        <el-card>
          <el-tabs model-value="first">
            <el-tab-pane label="隊伍成員" name="first">
              <Pagination :fetch-method="get_team_members" ref="member_table">
                <template v-slot:main="slot_props">
                  <table>
                    <tr>
                      <th>角色名稱</th>
                      <th>操作</th>
                    </tr>
                    <tr v-for="chara in slot_props.records" :key="chara.id">
                      <td>{{ chara.name }}</td>
                      <td>
                        <el-button
                          v-if="chara_is_leader && chara.id != chara_id"
                          type="danger"
                          @click="dismiss_member({ chara: chara.id }).then(() => $refs.member_table.fetch())"
                        >
                          驅逐
                        </el-button>
                        <el-button
                          v-if="chara_is_leader && chara.id != chara_id"
                          type="primary"
                          @click="change_leader({ chara: chara.id })"
                        >
                          指派為隊長
                        </el-button>
                        <el-button v-if="!chara_is_leader && chara.id == chara_id" type="danger" @click="leave_team">
                          離隊
                        </el-button>
                        <el-button type="danger" @click="disband_team" v-if="chara_is_leader && chara.id == chara_id">
                          解散隊伍
                        </el-button>
                      </td>
                    </tr>
                  </table>
                </template>
              </Pagination>
            </el-tab-pane>
            <el-tab-pane label="地城挑戰" name="second">
              <table>
                <tr>
                  <th>地城名稱</th>
                  <th>地城簡介</th>
                  <th>入場消耗</th>
                  <th>通關次數</th>
                  <th>已完成進度</th>
                  <th>行動</th>
                </tr>
                <tr v-for="row in team_dungeons" :key="row.id">
                  <td>{{ row.name }}</td>
                  <td>{{ row.description }}</td>
                  <td>
                    {{ row.ticket_type ? row.ticket_type.name + "*" + row.ticket_cost : "" }}
                  </td>
                  <td>{{ row.record?.passed_times }}</td>
                  <td>{{ row.record?.current_floor }} / {{ row.is_infinite ? "∞" : row.max_floor }}</td>
                  <td>
                    <span v-if="!chara_is_leader">需為隊長</span>
                    <el-button
                      v-else-if="row.record.status === 'inactive' && !row.is_infinite"
                      type="primary"
                      @click="start_team_dungeon(row.id, {}).then(fetch_team_dungeons)"
                    >
                      進入地城
                    </el-button>
                    <InputNumberWithButton
                      v-else-if="row.record.status === 'inactive' && row.is_infinite"
                      type="primary"
                      text="進入地城(開始層數)"
                      size=""
                      @click="start_team_dungeon(row.id, { start_floor: $event }).then(fetch_team_dungeons)"
                    >
                    </InputNumberWithButton>
                    <el-button
                      v-else-if="row.record.status === 'active'"
                      type="success"
                      @click="dungeon_fight({ dungeon: row.id }).then(fetch_team_dungeons)"
                    >
                      挑戰下一階
                    </el-button>
                    <template v-else-if="row.record.status === 'ended'">
                      <el-button type="primary" @click="terminate_team_dungeon(row.id).then(fetch_team_dungeons)">
                        結算
                      </el-button>
                      <el-button
                        type="danger"
                        v-if="row.record.current_floor < row.max_floor || row.is_infinite"
                        @click="recover_team_dungeon(row.id).then(fetch_team_dungeons)"
                      >
                        復活(25贊助點數)
                      </el-button>
                    </template>
                  </td>
                </tr>
              </table>
            </el-tab-pane>
            <el-tab-pane label="神獸" name="third">
              <table>
                <tr>
                  <th>神獸名稱</th>
                  <th>屬性</th>
                  <th>HP</th>
                  <th>MP</th>
                  <th>座標</th>
                  <th>行動</th>
                </tr>
                <tr v-for="row in world_bosses" :key="row.id">
                  <td>{{ row.name }}</td>
                  <td>{{ row.element_type.name }}</td>
                  <td>{{ row.hp }}/{{ row.hp_max }}</td>
                  <td>{{ row.mp }}/{{ row.mp_max }}</td>
                  <td>
                    <span>({{ row.location.x }},{{ row.location.y }})</span>
                    <span>{{ row.location.battle_map_name }}</span>
                  </td>
                  <td>
                    <el-button
                      v-if="row.location.x === chara_location.x && row.location.y === chara_location.y"
                      type="primary"
                      @click="world_boss_fight({ world_boss: row.id })"
                    >
                      挑戰(神獸線索*1)
                    </el-button>
                    <el-button v-else type="success" @click="move(row.location)">前往</el-button>
                  </td>
                </tr>
              </table>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
    <SceneDialog v-model="scene_dialog_visible" start-key="0" :contents="contents" />
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import { get_team_dungeons, start_team_dungeon, recover_team_dungeon, terminate_team_dungeon } from "@/api/team";
  import InputNumberWithButton from "@/components/InputNumberWithButton";
  import Pagination from "@/components/Pagination";
  import SceneDialog from "@/components/SceneDialog";

  export default {
    name: "TeamPanel",
    data() {
      return {
        scene_dialog_visible: false,
        contents: [],
        team_dungeons: [],
      };
    },
    computed: {
      ...mapState("chara", ["chara_team", "chara_is_leader", "chara_id", "chara_location"]),
      ...mapState("team", ["team_profile"]),
      ...mapState("battle", ["world_bosses"]),
    },
    methods: {
      ...mapActions("team", ["get_team_members", "leave_team", "dismiss_member", "disband_team", "change_leader"]),
      ...mapActions("battle", ["dungeon_fight", "world_boss_fight"]),
      ...mapActions("map", ["move"]),
      start_team_dungeon,
      recover_team_dungeon,
      async terminate_team_dungeon(dungeon) {
        let data = await terminate_team_dungeon(dungeon);
        this.contents = {
          0: {
            speaker: "系統醬",
            message: "對地城的探索結束了，來看看這次有什麼收穫吧",
            standing: { path: "/image/npc/system/standing/none.png" },
            next_key: "1",
          },
          1: {
            speaker: "系統醬",
            message: `你們的隊伍${data.display_message}`,
            standing: { path: "/image/npc/system/standing/smile.png" },
            next_key: "2",
          },
          2: {
            speaker: "系統醬",
            message: "對這次的收穫還滿意嗎？",
            standing: { path: "/image/npc/system/standing/smile.png" },
            next_key: null,
            options: [
              { text: "滿意", next_key: "2-A-1" },
              { text: "不滿意", next_key: "2-B-1" },
            ],
          },
          "2-A-1": {
            speaker: "系統醬",
            message: "滿意就好，以後要繼續探索地城喔~",
            standing: { path: "/image/npc/system/standing/smile.png" },
            next_key: null,
          },
          "2-B-1": {
            speaker: "系統醬",
            message: "不滿意呀……但為了平衡，我也不能給你額外的物品",
            standing: { path: "/image/npc/system/standing/bothered.png" },
            next_key: "2-B-2",
          },
          "2-B-2": {
            speaker: "系統醬",
            message: "準備好之後，再來挑戰一次吧",
            standing: { path: "/image/npc/system/standing/smile.png" },
            next_key: null,
          },
        };
        this.scene_dialog_visible = true;
      },
      async fetch_team_dungeons() {
        this.team_dungeons = await get_team_dungeons();
      },
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "team,is_leader,location" }).then(() => {
        this.$store.dispatch("team/get_team_profile");
      });
      this.$store.dispatch("battle/get_world_bosses");
      this.fetch_team_dungeons();
    },
    components: { InputNumberWithButton, Pagination, SceneDialog },
  };
</script>

<style lang="less" scoped>
  .el-card {
    text-align: center;
  }
</style>
