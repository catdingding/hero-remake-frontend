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
          <Select v-model="setting.skill">
            <Option v-for="(skill, index) in available_skills" :key="index" :value="skill.id">{{ skill.name }}</Option>
          </Select>
        </td>
        <td>
          <InputNumber
            :min="0"
            :max="100"
            v-model="setting.hp_percentage"
            :formatter="value => `${value}%`"
            :parser="value => value.replace('%', '')"
          >
          </InputNumber>
        </td>
        <td>
          <InputNumber
            :min="0"
            :max="100"
            v-model="setting.mp_percentage"
            :formatter="value => `${value}%`"
            :parser="value => value.replace('%', '')"
          >
          </InputNumber>
        </td>
        <td><Button type="success" @click="add_setting(index)">增加</Button></td>
        <td><Button type="error" @click="remove_setting(index)">刪除</Button></td>
      </tr>
    </table>

    <div class="save-panel">
      <Button type="success" size="large" @click="set_skill_settings(settings)">儲存</Button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "SkillSetting",
    data() {
      return {
        settings: []
      };
    },
    computed: { ...mapState("job", ["available_skills"]) },
    methods: {
      ...mapActions("job", ["set_skill_settings"]),
      add_setting(index) {
        this.settings.splice(index + 1, 0, { skill: null, hp_percentage: 0, mp_percentage: 0 });
      },
      remove_setting(index) {
        this.settings.splice(index, 1);
      }
    },
    mounted() {
      this.$store.dispatch("job/get_available_skills", {});
      this.$store.dispatch("get_chara_profile", { omit: "", fields: "skill_settings" }).then(() => {
        this.settings = this.$store.state.chara_profile.skill_settings;
        if (this.settings.length === 0) {
          this.add_setting(-1);
        }
      });
    }
  };
</script>

<style lang="less" scoped></style>
