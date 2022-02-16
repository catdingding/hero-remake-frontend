<template>
  <div style="display:block">
    <SkillSettingTable v-model="settings" :available_skills="available_skills"></SkillSettingTable>
    <div class="save-panel">
      <el-button type="success" @click="set_skill_settings(settings)">儲存</el-button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import SkillSettingTable from "@/components/SkillSettingTable";

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
    },
    mounted() {
      this.$store.dispatch("job/get_available_skills", {});
      this.$store.dispatch("chara/get_chara_profile", { fields: "skill_settings" }).then(() => {
        this.settings = this.chara_skill_settings;
      });
    },
    components: { SkillSettingTable },
  };
</script>

<style lang="less" scoped></style>
