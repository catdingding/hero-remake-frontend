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
            <el-option v-for="(ability, index) in available_to_set_abilities" :key="index" :value="ability.id">
              {{ ability.name }}
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>職業奧義</td>
        <td>
          <el-select v-model="setting.job_ability">
            <el-option
              v-for="(ability, index) in available_to_set_abilities.filter(
                x => x.attribute_type === chara_profile.job.attribute_type.id
              )"
              :key="index"
              :value="ability.id"
            >
              {{ ability.name }}
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>生活奧義</td>
        <td>
          <el-select v-model="setting.live_ability">
            <el-option
              v-for="(ability, index) in available_to_set_abilities.filter(x => x.is_live)"
              :key="index"
              :value="ability.id"
            >
              {{ ability.name }}
            </el-option>
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
        setting: { main_ability: null, job_ability: null, live_ability: null }
      };
    },
    computed: { ...mapState("ability", ["available_to_set_abilities"]), ...mapState(["chara_profile"]) },
    methods: { ...mapActions("ability", ["set_abilitie_setting"]) },
    mounted() {
      this.$store.dispatch("ability/get_available_to_set_abilities");
      this.$store.dispatch("get_chara_profile", {}).then(() => {
        let setting = this._.pick(this.chara_profile, ["main_ability", "job_ability", "live_ability"]);
        this.setting = this._.mapValues(setting, x => (x ? x.id : null));
      });
    }
  };
</script>

<style lang="less" scoped></style>
