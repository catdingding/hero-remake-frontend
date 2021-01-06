<template>
  <div>
    <el-row type="flex" justify="space-around" style="width: 100%;">
      <el-col :span="7">
        <el-card class="profile-card">
          <p slot="title">地點狀態</p>
          <div class="profile" v-if="chara_profile">
            <div class="attr">
              <span>座標</span>
              <span>({{ chara_profile.location.x }},{{ chara_profile.location.y }})</span>
            </div>
            <div class="attr">
              <span>城鎮</span>
              <span>{{ chara_profile.location.town_name || "無" }}</span>
            </div>
            <div class="attr">
              <span>屬性</span>
              <span>{{ chara_profile.location.element_type.name }}</span>
            </div>
            <div class="attr">
              <span>戰鬥地圖</span>
              <span>{{ chara_profile.location.battle_map_name }}</span>
            </div>
            <el-divider />
            <div class="command">
              <el-button size="medium" type="success" to="/game/map">移動</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="profile-card">
          <p slot="title">角色狀態</p>
          <div class="profile" v-if="chara_profile">
            <div class="attr">
              <span>名稱</span>
              <span>{{ chara_profile.name }}</span>
            </div>
            <div class="attr">
              <span>職業</span>
              <span>{{ chara_profile.job.name }}</span>
            </div>
            <div class="attr">
              <span>等級</span>
              <span>{{ chara_profile.level }}</span>
            </div>
            <div class="attr">
              <span>屬性</span>
              <span>{{ chara_profile.element_type.name }}</span>
            </div>
            <div class="attr">
              <span>金錢</span>
              <span>{{ chara_profile.gold | currency }}</span>
            </div>
            <div class="attr">
              <span>熟練度</span>
              <span>{{ chara_profile.proficiency | currency }}</span>
            </div>
            <div class="attr">
              <span>健康度</span>
              <span>{{ chara_profile.health }}</span>
            </div>
            <div class="attr">
              <span>HP</span>
              <span>
                <PercentageDisplay color="red" :value="chara_profile.hp" :max-value="chara_profile.hp_max" />
              </span>
            </div>
            <div class="attr">
              <span>MP</span>
              <span>
                <PercentageDisplay color="skyblue" :value="chara_profile.mp" :max-value="chara_profile.mp_max" />
              </span>
            </div>
            <el-collapse :simple="true">
              <el-collapse-item title="能力（上限值）">
                <div class="attr" v-for="attr in chara_profile.attributes" :key="attr.id">
                  <span>{{ attr.type.name }}</span>
                  <span>{{ attr.value }}/{{ attr.limit }}</span>
                </div>
              </el-collapse-item>
              <el-collapse-item title="職業熟練">
                <div class="attr" v-for="attr in chara_profile.attributes" :key="attr.id">
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
          <p slot="title">指令</p>
          <div class="command" v-if="chara_profile">
            <el-divider>行動冷卻</el-divider>
            <span :key="auto_refresh">{{ chara_profile.next_action_time | cd }}</span>
            <el-divider />
            <el-select style="margin-bottom:16px;" v-model="battle_map_id">
              <el-option
                :value="chara_profile.location.battle_map"
                :label="chara_profile.location.battle_map_name"
              ></el-option>
              <el-option
                v-for="battle_map_ticket in chara_profile.battle_map_tickets"
                v-show="battle_map_ticket.value"
                :value="battle_map_ticket.battle_map.id"
                :key="battle_map_ticket.battle_map.id"
                >{{ battle_map_ticket.battle_map.name }}({{ battle_map_ticket.value }})</el-option
              >
            </el-select>
            <el-button size="medium" type="primary" @click="fight_battle_map">戰鬥</el-button>
            <el-divider />
            <el-button size="medium" type="success" @click="$store.dispatch('rest')">休息</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapState, mapGetters } from "vuex";
  import PercentageDisplay from "@/components/PercentageDisplay.vue";

  export default {
    data() {
      return {};
    },
    methods: {
      fight_battle_map() {
        this.$store.dispatch("battle/fight_battle_map").then(() => this.$router.push("/game/battle-result"));
      }
    },
    computed: {
      ...mapState(["chara_profile", "auto_refresh"]),
      battle_map_id: {
        get() {
          return this.$store.state.battle.battle_map_id;
        },
        set(value) {
          this.$store.commit("battle/set_battle_map_id", value);
        }
      }
    },
    components: { PercentageDisplay },
    mounted() {
      this.$store.dispatch("get_chara_profile", {});
    }
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
</style>
