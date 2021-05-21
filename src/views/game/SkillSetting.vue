<template>
  <div style="display:block">
    <table>
      <tr>
        <th>優先序</th>
        <th>技能</th>
        <th>HP&lt;=</th>
        <th>MP&lt;=</th>
        <th>增加</th>
        <th>刪除</th>
      </tr>
      <tr v-for="(setting, index) in settings" :key="index">
        <td>{{ index }}</td>
        <td>
          <el-select v-model="setting.skill">
            <el-option
              v-for="(skill, index) in available_skills"
              :key="index"
              :value="skill.id"
              :label="skill.name"
            ></el-option>
          </el-select>
        </td>
        <td>
          <el-input-number
            :min="0"
            :max="100"
            v-model="setting.hp_percentage"
            :formatter="(value) => `${value}%`"
            :parser="(value) => value.replace('%', '')"
          >
          </el-input-number>
        </td>
        <td>
          <el-input-number
            :min="0"
            :max="100"
            v-model="setting.mp_percentage"
            :formatter="(value) => `${value}%`"
            :parser="(value) => value.replace('%', '')"
          >
          </el-input-number>
        </td>
        <td><el-button type="success" @click="add_setting(index)">增加</el-button></td>
        <td><el-button type="danger" @click="remove_setting(index)">刪除</el-button></td>
      </tr>
    </table>

    <div class="save-panel">
      <el-button type="success" size="medium" @click="set_skill_settings(settings)">儲存</el-button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "SkillSetting",
    data() {
      return {
        settings: [],
      };
    },
    computed: { ...mapState("job", ["available_skills"]), ...mapState("chara", ["chara_skill_settings"]) },
    methods: {
      ...mapActions("job", ["set_skill_settings"]),
      add_setting(index) {
        this.settings.splice(index + 1, 0, { skill: null, hp_percentage: 0, mp_percentage: 0 });
      },
      remove_setting(index) {
        this.settings.splice(index, 1);
      },
    },
    mounted() {
      this.$store.dispatch("job/get_available_skills", {});
      this.$store.dispatch("chara/get_chara_profile", { fields: "skill_settings" }).then(() => {
        this.settings = this.chara_skill_settings;
        if (this.settings.length === 0) {
          this.add_setting(-1);
        }
      });
    },
  };
</script>

<style lang="less" scoped></style>
