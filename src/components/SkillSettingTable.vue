<template>
  <table>
    <tr>
      <th>優先序</th>
      <th>技能</th>
      <th>HP(%)&lt;=</th>
      <th>MP(%)&lt;=</th>
      <th>防禦方HP(%)&lt;=</th>
      <th>防禦方MP(%)&lt;=</th>
      <th>增加</th>
      <th>刪除</th>
    </tr>
    <tr v-for="(setting, index) in settings" :key="index">
      <td>{{ index }}</td>
      <td>
        <el-select v-model="setting.skill" style="width:250px">
          <el-option
            v-for="(skill, index) in available_skills"
            :key="index"
            :value="skill.id"
            :label="skill.name + `(mp:${skill.mp_cost},威力:${skill.power},發動率:${skill.rate}%)`"
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

      <td>
        <el-input-number
          :min="0"
          :max="100"
          v-model="setting.defender_hp_percentage"
          :formatter="(value) => `${value}%`"
          :parser="(value) => value.replace('%', '')"
        >
        </el-input-number>
      </td>
      <td>
        <el-input-number
          :min="0"
          :max="100"
          v-model="setting.defender_mp_percentage"
          :formatter="(value) => `${value}%`"
          :parser="(value) => value.replace('%', '')"
        >
        </el-input-number>
      </td>
      <td><el-button type="success" @click="add_setting(index)">增加</el-button></td>
      <td><el-button type="danger" @click="remove_setting(index)">刪除</el-button></td>
    </tr>
  </table>
</template>

<script>
  export default {
    name: "SkillSettingTable",
    data() {
      return {};
    },
    props: { available_skills: { type: Array, default: () => [] }, value: { type: Array, default: () => [] } },
    computed: {
      settings: {
        set(value) {
          this.$emit("input", value);
        },
        get() {
          return this.value;
        },
      },
    },
    methods: {
      add_setting(index) {
        this.settings.splice(index + 1, 0, {
          skill: null,
          hp_percentage: 100,
          mp_percentage: 100,
          defender_hp_percentage: 100,
          defender_mp_percentage: 100,
        });
      },
      remove_setting(index) {
        this.settings.splice(index, 1);
      },
    },
    watch: {
      settings: {
        immediate: true,
        handler() {
          if (this.settings.length === 0) {
            this.add_setting(-1);
          }
        },
      },
    },
    mounted() {},
  };
</script>

<style lang="less" scoped></style>
