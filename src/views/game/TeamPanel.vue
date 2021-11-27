<template>
  <div>
    <el-row type="flex" justify="space-around" style="width: 100%;" v-if="team_profile">
      <el-col :span="24">
        <el-card>
          <el-tabs value="first">
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
                <tr v-for="row in team_profile.dungeon_records" :key="row.id">
                  <td>{{ row.dungeon.name }}</td>
                  <td>{{ row.dungeon.description }}</td>
                  <td>
                    {{ row.dungeon.ticket_type ? row.dungeon.ticket_type.name + "*" + row.dungeon.ticket_cost : "" }}
                  </td>
                  <td>{{ row.passed_times }}</td>
                  <td>{{ row.current_floor }} / {{ row.dungeon.is_infinite ? "∞" : row.dungeon.max_floor }}</td>
                  <td>
                    <el-button
                      v-if="row.status === 'inactive' && !row.dungeon.is_infinite"
                      type="primary"
                      @click="change_dungeon_record_status({ record: row.id, new_status: 'active' })"
                    >
                      進入地城
                    </el-button>
                    <InputNumberWithButton
                      v-if="row.status === 'inactive' && row.dungeon.is_infinite"
                      type="primary"
                      text="進入地城(開始層數)"
                      size=""
                      @click="
                        change_dungeon_record_status({ record: row.id, new_status: 'active', start_floor: $event })
                      "
                    >
                    </InputNumberWithButton>
                    <el-button
                      v-else-if="row.status === 'active'"
                      type="success"
                      @click="dungeon_fight({ dungeon: row.dungeon.id })"
                    >
                      挑戰下一階
                    </el-button>
                    <el-button
                      v-else-if="row.status === 'ended'"
                      type="primary"
                      @click="change_dungeon_record_status({ record: row.id, new_status: 'inactive' })"
                    >
                      結算
                    </el-button>
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
                  <td>({{ row.location.x }},{{ row.location.y }})</td>
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
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import InputNumberWithButton from "@/components/InputNumberWithButton";
  import Pagination from "@/components/Pagination";

  export default {
    name: "TeamPanel",
    data() {
      return {};
    },
    computed: {
      ...mapState("chara", ["chara_team", "chara_is_leader", "chara_id", "chara_location"]),
      ...mapState("team", ["team_profile"]),
      ...mapState("battle", ["world_bosses"]),
    },
    methods: {
      ...mapActions("team", [
        "get_team_members",
        "leave_team",
        "dismiss_member",
        "disband_team",
        "change_dungeon_record_status",
        "change_leader",
      ]),
      ...mapActions("battle", ["dungeon_fight", "world_boss_fight"]),
      ...mapActions("map", ["move"]),
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "team,is_leader,location" }).then(() => {
        this.$store.dispatch("team/get_team_profile");
      });
      this.$store.dispatch("battle/get_world_bosses");
    },
    components: { InputNumberWithButton, Pagination },
  };
</script>

<style lang="less" scoped>
  .el-card {
    text-align: center;
  }
</style>
