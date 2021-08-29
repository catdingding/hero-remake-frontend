<template>
  <div>
    <QuestProgressBlock
      title="世界討伐任務"
      :value="chara_record ? chara_record.world_monster_quest_counter : 0"
      :max-value="100"
      color="#67c23a"
      @submit="hand_in_quest('world_monster_quest')"
    ></QuestProgressBlock>
    <QuestProgressBlock
      v-show="chara_country && _.get(chara_country, 'id') === _.get(chara_location, 'country.id')"
      title="國家討伐任務"
      :value="chara_record ? chara_record.country_monster_quest_counter : 0"
      :max-value="400"
      color="#67c23a"
      @submit="hand_in_quest('country_monster_quest')"
    ></QuestProgressBlock>
    <el-row type="flex" justify="space-between" style="width: 100%;flex-wrap: wrap;">
      <el-col :span="7" :xs="24">
        <el-card class="profile-card">
          <div slot="header">地點狀態</div>
          <div class="profile" v-if="chara_location">
            <div class="attr">
              <div>座標</div>
              <div>({{ chara_location.x }},{{ chara_location.y }})</div>
            </div>
            <div class="attr">
              <div>國家</div>
              <div>{{ chara_location.country | country_name }}</div>
            </div>
            <div class="attr">
              <div>
                <el-tooltip effect="dark" content="若位於無城鎮地點，無法使用城鎮設施" placement="top">
                  <span>城鎮</span>
                </el-tooltip>
              </div>
              <div>{{ chara_location.town ? chara_location.town.name : "無城鎮" }}</div>
            </div>
            <div class="attr">
              <div>屬性</div>
              <div>{{ chara_location.element_type.name }}</div>
            </div>
            <div class="attr">
              <div>戰鬥地圖</div>
              <div>{{ chara_location.battle_map_name }}</div>
            </div>
            <el-divider />
            <div class="command">
              <router-link to="/game/map"><el-button size="medium" type="success">移動</el-button></router-link>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7" :xs="24">
        <el-card class="profile-card">
          <div slot="header">角色狀態</div>
          <div class="profile">
            <div class="attr">
              <div>名稱</div>
              <div>{{ chara_name }}</div>
            </div>
            <div class="attr">
              <div>國籍</div>
              <div>{{ chara_country | country_name }}</div>
            </div>
            <div class="attr">
              <div>隊伍</div>
              <div>{{ chara_team | team_name }}</div>
            </div>
            <div class="attr">
              <div>職業</div>
              <div v-if="chara_job">{{ chara_job.name }}</div>
            </div>
            <div class="attr">
              <div>
                <el-tooltip effect="dark" content="上限為100，滿級後可進行轉職" placement="top">
                  <span>等級</span>
                </el-tooltip>
              </div>
              <div>{{ chara_level }}</div>
            </div>
            <div class="attr">
              <div>經驗值</div>
              <div>{{ chara_exp }}</div>
            </div>
            <div class="attr">
              <div>屬性</div>
              <div v-if="chara_element_type">{{ chara_element_type.name }}</div>
            </div>
            <div class="attr">
              <div>金錢</div>
              <div>{{ chara_gold | currency }}</div>
            </div>
            <div class="attr">
              <div>熟練度</div>
              <div>{{ chara_proficiency | currency }}</div>
            </div>
            <div class="attr">
              <div>
                <el-tooltip effect="dark" content="影響休息恢復量，可於城鎮旅店恢復" placement="top">
                  <span>
                    健康度
                  </span>
                </el-tooltip>
              </div>
              <div>{{ chara_health }}</div>
            </div>
            <div class="attr">
              <div>HP</div>
              <div>
                <PercentageDisplay color="red" :value="chara_hp" :max-value="chara_hp_max" />
              </div>
            </div>
            <div class="attr">
              <div>MP</div>
              <div>
                <PercentageDisplay color="skyblue" :value="chara_mp" :max-value="chara_mp_max" />
              </div>
            </div>
            <el-collapse :simple="true">
              <el-collapse-item title="能力（上限值）">
                <div class="attr">
                  <div>HP</div>
                  <div>{{ chara_hp_max }}（{{ chara_hp_limit }}）</div>
                </div>
                <div class="attr">
                  <div>MP</div>
                  <div>{{ chara_mp_max }}（{{ chara_mp_limit }}）</div>
                </div>
                <div class="attr" v-for="attr in chara_attributes" :key="attr.id">
                  <div>{{ attr.type.name }}</div>
                  <div>{{ attr.value }}（{{ attr.limit }}）</div>
                </div>
              </el-collapse-item>
              <el-collapse-item title="職業熟練">
                <div class="attr" v-for="attr in chara_attributes" :key="attr.id">
                  <div>{{ attr.type.class_name }}</div>
                  <div>{{ attr.proficiency }}</div>
                </div>
              </el-collapse-item>
              <el-collapse-item title="其他數據">
                <div class="attr" v-if="chara_record">
                  <div>總戰數</div>
                  <div>{{ chara_record.total_battle }}</div>
                </div>
                <div class="attr" v-if="chara_record">
                  <div>今日戰數</div>
                  <div>{{ chara_record.today_battle }}</div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-card>
      </el-col>

      <el-col :span="7" :xs="24">
        <el-card class="command-card">
          <div slot="header">指令</div>
          <Avatar class="avatar" :chara_id="chara_id" :avatar_version="chara_avatar_version"></Avatar>
          <div class="command">
            <el-divider>行動冷卻</el-divider>
            <RelativeTime :time_string="chara_next_action_time" :period="100"></RelativeTime>
            <el-divider />
            <el-select style="margin-bottom:16px;" v-model="battle_map_id">
              <el-option
                v-if="chara_location"
                :value="chara_location.battle_map"
                :label="chara_location.battle_map_name"
              ></el-option>
              <el-option
                v-for="battle_map_ticket in chara_battle_map_tickets"
                v-show="battle_map_ticket.value"
                :value="battle_map_ticket.battle_map.id"
                :key="battle_map_ticket.battle_map.id"
                :label="battle_map_ticket.battle_map.name + '(' + battle_map_ticket.value + ')'"
              ></el-option>
            </el-select>
            <el-button size="medium" type="primary" @click="fight_battle_map">戰鬥</el-button>
            <el-switch v-model="auto_fight_enabled" active-text="自動戰鬥" inactive-text="手動戰鬥"></el-switch>
            <el-divider />
            <el-tooltip effect="dark" content="恢復HP與MP，恢復上限受健康度影響" placement="top">
              <el-button size="medium" type="success" @click="rest">休息</el-button>
            </el-tooltip>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-between" style="width: 100%;">
      <el-col :span="15">
        <LogMessageBlock title="最近事件" :messages="log_messages"></LogMessageBlock>
      </el-col>
      <el-col :span="8">
        <LogMessageBlock title="打寶記錄" :messages="battle_loots_log_messages"></LogMessageBlock>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-between" style="width: 100%;" class="chat">
      <el-col :span="24">
        <el-tabs value="all">
          <el-tab-pane
            v-for="channel in channels"
            :key="channel.name"
            :label="channel.display_name"
            :name="channel.name"
          >
            <ChatMessageBlock :channel="channel.name" :need_input="channel.need_input"></ChatMessageBlock>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-between" style="width: 100%;" class="chat">
      <el-col :span="24">
        <el-collapse>
          <el-collapse-item>
            <template slot="title"> 在線角色({{ online_charas.length }})</template>
            <div class="online-charas">
              <CharaLink v-for="chara in online_charas" :key="chara.id" :chara_name="chara.name" :chara_id="chara.id">
              </CharaLink>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from "vuex";
  import { mapFields } from "vuex-map-fields";
  import PercentageDisplay from "@/components/PercentageDisplay.vue";
  import ChatMessageBlock from "@/components/ChatMessageBlock";
  import LogMessageBlock from "@/components/LogMessageBlock";
  import QuestProgressBlock from "@/components/QuestProgressBlock";
  import Avatar from "@/components/Avatar";
  import CharaLink from "@/components/CharaLink";

  export default {
    name: "Index",
    data() {
      return {
        online_charas_interval_id: null,
      };
    },
    methods: {
      ...mapActions(["get_online_charas"]),
      ...mapActions("chara", ["rest", "hand_in_quest"]),
      fight_battle_map() {
        this.$store.dispatch("battle/fight_battle_map").then(() => this.$router.push("/game/battle-result"));
      },
    },
    computed: {
      ...mapState(["online_charas"]),
      ...mapState("ws", ["channels", "log_messages"]),
      ...mapState("chara", [
        "chara_id",
        "chara_avatar_version",
        "chara_location",
        "chara_battle_map_tickets",
        "chara_next_action_time",
        "chara_name",
        "chara_job",
        "chara_level",
        "chara_exp",
        "chara_element_type",
        "chara_gold",
        "chara_proficiency",
        "chara_health",
        "chara_hp",
        "chara_mp",
        "chara_hp_max",
        "chara_mp_max",
        "chara_hp_limit",
        "chara_mp_limit",
        "chara_attributes",
        "chara_country",
        "chara_team",
        "chara_record",
      ]),
      ...mapState("battle", ["battle_loots_log_messages"]),
      ...mapFields("battle", ["battle_map_id", "auto_fight_enabled"]),
    },
    components: { PercentageDisplay, LogMessageBlock, ChatMessageBlock, QuestProgressBlock, Avatar, CharaLink },
    mounted() {
      this.get_online_charas();
      this.online_charas_interval_id = setInterval(this.get_online_charas, 60000);
    },
    beforeDestroy() {
      clearInterval(this.online_charas_interval_id);
    },
    activated() {
      this.$store.dispatch("chara/get_chara_profile", {
        omit: "bag_items,slots,skill_settings,introduction,main_ability,job_ability,live_ability",
      });
    },
  };
</script>

<style lang="less" scoped>
  .el-col {
    margin-bottom: 20px;
  }
  .profile {
    .attr {
      margin: 5px 0 5px 0;
      width: 100%;
      display: flex;
      & > div {
        line-height: 24px;
      }
      & > div:nth-child(1) {
        width: 30%;
      }
      & > div:nth-child(2) {
        width: 70%;

        text-align: right;
      }
    }
  }
  .command {
    text-align: center;
  }
  .profile-card,
  .command-card {
    height: 100%;
  }
  .avatar {
    height: 120px;
  }
  .chat {
    flex-flow: row wrap;
  }
  .online-charas {
    font-size: 14px;
    span {
      display: inline-block;
      margin-right: 5px;
    }
  }
</style>
