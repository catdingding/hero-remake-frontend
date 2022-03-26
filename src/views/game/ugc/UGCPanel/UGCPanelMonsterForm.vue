<template>
  <div>
    技能設定上限10，奧義上限10
    <el-form :model="form_data" label-width="120px" label-position="left">
      <el-form-item label="名稱" required prop="name">
        <el-input v-model="form_data.name"></el-input>
      </el-form-item>
      <el-form-item label="HP" required prop="hp">
        <el-input-number v-model="form_data.hp" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="MP" required prop="mp">
        <el-input-number v-model="form_data.mp" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="屬性" required prop="element_type">
        <el-select v-model="form_data.element_type">
          <el-option v-for="item in element_types" :value="item.id" :key="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="能力" v-for="attribute in form_data.attributes" :key="attribute.id">
        <el-select v-model="attribute.type" disabled>
          <el-option v-for="item in attribute_types" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-input-number v-model="attribute.value" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="奧義">
        <el-select v-model="form_data.abilities" multiple :multiple-limit="10">
          <el-option v-for="item in abilities" :value="item.id" :key="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <SkillSettingTable v-model="form_data.skill_settings" :available_skills="skills"></SkillSettingTable>
    </el-form>
    <div style="text-align: center">
      <el-button type="success" @click="save">儲存</el-button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import SkillSettingTable from "@/components/SkillSettingTable";

  export default {
    name: "UGCPanelMonsterForm",
    data() {
      return { form_data: {} };
    },
    props: { monster_id: { type: Number, default: null } },
    computed: {
      ...mapState("chara", ["chara_id"]),
      ...mapState("ability", ["abilities"]),
      ...mapState("job", ["skills"]),
      ...mapState(["element_types", "attribute_types"]),
    },
    methods: {
      ...mapActions("ugc", ["create_ugc_monster", "update_ugc_monster", "get_ugc_monster_by_id"]),
      async save() {
        if (this.monster_id) {
          await this.update_ugc_monster({ monster: this.monster_id, data: this.form_data });
        } else {
          await this.create_ugc_monster({ data: this.form_data });
        }
        this.$emit("save");
      },
    },
    async mounted() {
      if (this.monster_id) {
        this.form_data = await this.get_ugc_monster_by_id(this.monster_id);
      } else {
        this.form_data = {
          name: "",
          hp: 1000,
          mp: 1000,
          attributes: this.attribute_types.map((x) => ({ type: x.id, value: 100 })),
          abilities: [],
          skill_settings: [],
        };
      }
      await this.$store.dispatch("ability/get_abilities");
      await this.$store.dispatch("job/get_skills");
    },
    components: { SkillSettingTable },
  };
</script>

<style lang="less" scoped></style>
