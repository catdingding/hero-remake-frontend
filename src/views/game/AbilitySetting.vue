<template>
  <div style="display:block">
    <table>
      <tr>
        <th>欄位</th>
        <th>奧義</th>
      </tr>
      <tr>
        <td>主要奧義</td>
        <td>
          <el-select v-model="setting.main_ability">
            <el-tooltip
              v-for="(ability, index) in available_to_set_abilities"
              :key="index"
              effect="dark"
              :content="ability.description"
              placement="left"
            >
              <el-option :value="ability.id" :label="ability.name"> </el-option>
            </el-tooltip>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>職業奧義</td>
        <td>
          <el-select v-model="setting.job_ability">
            <el-tooltip
              v-for="(ability, index) in available_to_set_abilities.filter(
                (x) => x.attribute_type === chara_job.attribute_type.id
              )"
              :key="index"
              effect="dark"
              :content="ability.description"
              placement="left"
            >
              <el-option :value="ability.id" :label="ability.name"> </el-option>
            </el-tooltip>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>生活奧義</td>
        <td>
          <el-select v-model="setting.live_ability">
            <el-tooltip
              v-for="(ability, index) in available_to_set_abilities.filter((x) => x.is_live)"
              :key="index"
              effect="dark"
              :content="ability.description"
              placement="left"
            >
              <el-option :value="ability.id" :label="ability.name"> </el-option>
            </el-tooltip>
          </el-select>
        </td>
      </tr>
    </table>

    <div class="save-panel">
      <el-button type="success" size="medium" @click="set_abilitie_setting(setting)">儲存</el-button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "AbilityLearn",
    data() {
      return {
        setting: { main_ability: null, job_ability: null, live_ability: null },
      };
    },
    computed: {
      ...mapState("ability", ["available_to_set_abilities"]),
      ...mapState("chara", ["chara_job", "chara_main_ability", "chara_job_ability", "chara_live_ability"]),
    },
    methods: { ...mapActions("ability", ["set_abilitie_setting"]) },
    mounted() {
      this.$store.dispatch("ability/get_available_to_set_abilities");
      this.$store.dispatch("chara/get_chara_profile", {}).then(() => {
        this.setting = {
          main_ability: this.chara_main_ability ? this.chara_main_ability.id : null,
          job_ability: this.chara_job_ability ? this.chara_job_ability.id : null,
          live_ability: this.chara_live_ability ? this.chara_live_ability.id : null,
        };
      });
    },
  };
</script>

<style lang="less" scoped></style>
