<template>
  <div>
    <el-row type="flex" justify="space-between" style="width: 100%;">
      <el-col :span="7">
        <el-card class="profile-card">
          <div slot="header">地點狀態</div>
          <div class="profile" v-if="chara_location">
            <div class="attr">
              <span>座標</span>
              <span>({{ chara_location.x }},{{ chara_location.y }})</span>
            </div>
            <div class="attr">
              <span>城鎮</span>
              <span>{{ chara_location.town_name || "無" }}</span>
            </div>
            <div class="attr">
              <span>屬性</span>
              <span>{{ chara_location.element_type.name }}</span>
            </div>
            <div class="attr">
              <span>戰鬥地圖</span>
              <span>{{ chara_location.battle_map_name }}</span>
            </div>
            <el-divider />
            <div class="command">
              <router-link to="/game/map"><el-button size="medium" type="success">移動</el-button></router-link>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="profile-card">
          <div slot="header">角色狀態</div>
          <div class="profile">
            <div class="attr">
              <span>名稱</span>
              <span>{{ chara_name }}</span>
            </div>
            <div class="attr">
              <span>國籍</span>
              <span>{{ chara_country === null ? "無所屬" : chara_country.name }}</span>
            </div>
            <div class="attr">
              <span>職業</span>
              <span v-if="chara_job">{{ chara_job.name }}</span>
            </div>
            <div class="attr">
              <span>等級</span>
              <span>{{ chara_level }}</span>
            </div>
            <div class="attr">
              <span>屬性</span>
              <span v-if="chara_element_type">{{ chara_element_type.name }}</span>
            </div>
            <div class="attr">
              <span>金錢</span>
              <span>{{ chara_gold | currency }}</span>
            </div>
            <div class="attr">
              <span>熟練度</span>
              <span>{{ chara_proficiency | currency }}</span>
            </div>
            <div class="attr">
              <span>健康度</span>
              <span>{{ chara_health }}</span>
            </div>
            <div class="attr">
              <span>HP</span>
              <span>
                <PercentageDisplay color="red" :value="chara_hp" :max-value="chara_hp_max" />
              </span>
            </div>
            <div class="attr">
              <span>MP</span>
              <span>
                <PercentageDisplay color="skyblue" :value="chara_mp" :max-value="chara_mp_max" />
              </span>
            </div>
            <el-collapse :simple="true">
              <el-collapse-item title="能力（上限值）">
                <div class="attr" v-for="attr in chara_attributes" :key="attr.id">
                  <span>{{ attr.type.name }}</span>
                  <span>{{ attr.value }}（{{ attr.limit }}）</span>
                </div>
              </el-collapse-item>
              <el-collapse-item title="職業熟練">
                <div class="attr" v-for="attr in chara_attributes" :key="attr.id">
                  <span>{{ attr.type.class_name }}</span>
                  <span>{{ attr.proficiency }}</span>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-card>
      </el-col>

      <el-col :span="7">
        <el-card class="command-card">
          <div slot="header">指令</div>
          <Avatar class="avatar" :chara_id="chara_id"></Avatar>
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
            <el-button size="medium" type="success" @click="rest">休息</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-between" style="width: 100%;" class="chat">
      <el-col :span="11">
        <ChatMessageBlock title="公開頻道" channel="public" :messages="public_messages"></ChatMessageBlock>
      </el-col>
      <el-col :span="11">
        <ChatMessageBlock title="國家頻道" channel="country" :messages="country_messages"></ChatMessageBlock>
      </el-col>
      <el-col :span="11">
        <ChatMessageBlock
          title="私訊頻道"
          channel="private"
          :messages="private_messages"
          need-receiver
        ></ChatMessageBlock>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from "vuex";
  import { mapFields } from "vuex-map-fields";
  import PercentageDisplay from "@/components/PercentageDisplay.vue";
  import ChatMessageBlock from "@/components/ChatMessageBlock";
  import Avatar from "@/components/Avatar";

  export default {
    data() {
      return {};
    },
    methods: {
      ...mapActions("chara", ["rest"]),
      fight_battle_map() {
        this.$store.dispatch("battle/fight_battle_map").then(() => this.$router.push("/game/battle-result"));
      },
    },
    computed: {
      ...mapState("ws", ["public_messages", "country_messages", "private_messages"]),
      ...mapState("chara", [
        "chara_id",
        "chara_location",
        "chara_battle_map_tickets",
        "chara_next_action_time",
        "chara_name",
        "chara_job",
        "chara_level",
        "chara_element_type",
        "chara_gold",
        "chara_proficiency",
        "chara_health",
        "chara_hp",
        "chara_mp",
        "chara_hp_max",
        "chara_mp_max",
        "chara_attributes",
        "chara_country",
      ]),
      ...mapFields("battle", ["battle_map_id", "auto_fight_enabled"]),
    },
    components: { PercentageDisplay, ChatMessageBlock, Avatar },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", {});
    },
  };
</script>

<style lang="less" scoped>
  .profile {
    .attr {
      margin: 5px 0 5px 0;
      width: 100%;
      display: flex;

      span:nth-child(1) {
        width: 30%;
        display: inline-block;
      }
      span:nth-child(2) {
        width: 70%;
        text-align: right;
        display: inline-block;
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
</style>
