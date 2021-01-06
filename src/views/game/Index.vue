<template>
  <div>
    <Row type="flex" justify="space-around" style="width: 100%;">
      <Col span="7">
        <Card class="profile-card">
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
            <Divider />
            <div class="command">
              <Button size="large" type="success" to="/game/map">移動</Button>
            </div>
          </div>
        </Card>
      </Col>
      <Col span="7">
        <Card class="profile-card">
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
            <Collapse :simple="true">
              <Panel>
                能力（上限值）
                <div slot="content">
                  <div class="attr" v-for="attr in chara_profile.attributes" :key="attr.id">
                    <span>{{ attr.type.name }}</span>
                    <span>{{ attr.value }}/{{ attr.limit }}</span>
                  </div>
                </div>
              </Panel>
              <Panel>
                職業熟練
                <div slot="content">
                  <div class="attr" v-for="attr in chara_profile.attributes" :key="attr.id">
                    <span>{{ attr.type.class_name }}</span>
                    <span>{{ attr.proficiency }}</span>
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>
        </Card>
      </Col>

      <Col span="7">
        <Card class="command-card">
          <p slot="title">指令</p>
          <div class="command" v-if="chara_profile">
            <Divider>行動冷卻</Divider>
            <span :key="auto_refresh">{{ chara_profile.next_action_time | cd }}</span>
            <Divider />
            <Select style="margin-bottom:16px;" v-model="battle_map_id">
              <Option :value="chara_profile.location.battle_map">{{ chara_profile.location.battle_map_name }}</Option>
              <Option
                v-for="battle_map_ticket in chara_profile.battle_map_tickets"
                v-show="battle_map_ticket.value"
                :value="battle_map_ticket.battle_map.id"
                :key="battle_map_ticket.battle_map.id"
                >{{ battle_map_ticket.battle_map.name }}({{ battle_map_ticket.value }})</Option
              >
            </Select>
            <Button size="large" type="error" @click="fight_battle_map">戰鬥</Button>
            <Divider />
            <Button size="large" type="success" @click="$store.dispatch('rest')">休息</Button>
          </div>
        </Card>
      </Col>
    </Row>
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
