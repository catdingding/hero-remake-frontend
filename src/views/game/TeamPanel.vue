<template>
  <div>
    <el-row type="flex" justify="space-around" style="width: 100%;" v-if="team_profile">
      <el-col :span="7">
        <el-card>
          <div slot="header">隊伍概況</div>
          <table>
            <tr>
              <td>隊長</td>
              <td>{{ _.get(team_profile, "leader.name") }}</td>
            </tr>
          </table>

          <el-button type="danger" @click="leave_team">
            離隊
          </el-button>
          <br /><br />
          <el-button type="danger" @click="disband_team" v-show="chara_is_leader">
            解散
          </el-button>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card>
          <el-tabs value="first">
            <el-tab-pane label="隊伍成員" name="first">
              <table>
                <tr>
                  <th>角色名稱</th>
                  <th>操作</th>
                </tr>
                <tr v-for="chara in team_members" :key="chara.id">
                  <td>{{ chara.name }}</td>
                  <td>
                    <el-button v-show="chara_is_leader" type="danger" @click="dismiss_member({ chara: chara.id })">
                      驅逐
                    </el-button>
                  </td>
                </tr>
              </table>
            </el-tab-pane>

            <el-tab-pane label="地城挑戰" name="second">
              <table>
                <tr>
                  <th>地城名稱</th>
                  <th>通關次數</th>
                  <th>已完成進度</th>
                  <th>挑戰</th>
                </tr>
                <tr v-for="row in team_profile.dungeon_records" :key="row.id">
                  <td>{{ row.dungeon.name }}</td>
                  <td>{{ row.passed_times }}</td>
                  <td>{{ row.current_floor }} / {{ row.dungeon.max_floor }}</td>
                  <td>
                    <el-button
                      v-show="chara_is_leader"
                      type="success"
                      @click="dungeon_fight({ dungeon: row.dungeon.id })"
                    >
                      挑戰
                    </el-button>
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

  export default {
    name: "TeamPanel",
    data() {
      return {};
    },
    computed: {
      ...mapState("chara", ["chara_team", "chara_is_leader"]),
      ...mapState("team", ["team_profile", "team_members"]),
    },
    methods: {
      ...mapActions("team", ["leave_team", "dismiss_member", "disband_team"]),
      ...mapActions("battle", ["dungeon_fight"]),
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "team,is_leader" }).then(() => {
        this.$store.dispatch("team/get_team_profile");
        this.$store.dispatch("team/get_team_members");
      });
    },
    components: {},
  };
</script>

<style lang="less" scoped>
  .el-card {
    text-align: center;
  }
</style>
