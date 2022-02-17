<template>
  <el-table :data="settings" table-layout="auto">
    <el-table-column align="center" label="優先序">
      <template v-slot="scope">
        {{ scope.$index }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="技能">
      <template v-slot="scope">
        <el-select v-model="scope.row.skill" style="width:250px">
          <el-option
            v-for="(skill, index) in available_skills"
            :key="index"
            :value="skill.id"
            :label="skill.name + `(mp:${skill.mp_cost},威力:${skill.power},發動率:${skill.rate}%)`"
          ></el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column align="center" label="HP(%)<=">
      <template v-slot="scope">
        <el-input-number
          size="small"
          :min="0"
          :max="100"
          v-model="scope.row.hp_percentage"
          :formatter="(value) => `${value}%`"
          :parser="(value) => value.replace('%', '')"
        >
        </el-input-number>
      </template>
    </el-table-column>
    <el-table-column align="center" label="MP(%)<=">
      <template v-slot="scope">
        <el-input-number
          size="small"
          :min="0"
          :max="100"
          v-model="scope.row.mp_percentage"
          :formatter="(value) => `${value}%`"
          :parser="(value) => value.replace('%', '')"
        >
        </el-input-number>
      </template>
    </el-table-column>
    <el-table-column align="center" label="防禦方HP(%)<=">
      <template v-slot="scope">
        <el-input-number
          size="small"
          :min="0"
          :max="100"
          v-model="scope.row.defender_hp_percentage"
          :formatter="(value) => `${value}%`"
          :parser="(value) => value.replace('%', '')"
        >
        </el-input-number>
      </template>
    </el-table-column>
    <el-table-column align="center" label="防禦方MP(%)<=">
      <template v-slot="scope">
        <el-input-number
          size="small"
          :min="0"
          :max="100"
          v-model="scope.row.defender_mp_percentage"
          :formatter="(value) => `${value}%`"
          :parser="(value) => value.replace('%', '')"
        >
        </el-input-number>
      </template>
    </el-table-column>
    <el-table-column align="center" label="發動次數上限">
      <template #header>
        <el-tooltip placement="top">
          <template #content> 0視為不限制 </template>
          <span>技能發動次數上限</span>
        </el-tooltip>
      </template>
      <template v-slot="scope">
        <el-input-number size="small" :min="0" v-model="scope.row.times_limit"> </el-input-number>
      </template>
    </el-table-column>
    <el-table-column align="center" label="增加">
      <template v-slot="scope">
        <el-button type="success" @click="add_setting(scope.$index)">增加</el-button>
      </template>
    </el-table-column>
    <el-table-column align="center" label="刪除">
      <template v-slot="scope">
        <el-button type="danger" @click="remove_setting(scope.$index)">刪除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
  import { defineProps, defineEmits, computed, watch } from "vue";
  const props = defineProps({
    available_skills: { type: Array, default: () => [] },
    modelValue: { type: Array, default: () => [] },
  });
  const emit = defineEmits(["update:modelValue"]);

  const settings = computed({
    set(value) {
      emit("update:modelValue", value);
    },
    get() {
      return props.modelValue;
    },
  });

  const add_setting = (index) => {
    settings.value.splice(index + 1, 0, {
      skill: null,
      hp_percentage: 100,
      mp_percentage: 100,
      defender_hp_percentage: 100,
      defender_mp_percentage: 100,
      times_limit: 0,
    });
  };
  const remove_setting = (index) => {
    settings.value.splice(index, 1);
  };

  watch(
    settings,
    () => {
      if (settings.value.length === 0) {
        add_setting(-1);
      }
    },
    { deep: true }
  );
</script>

<style lang="less" scoped>
  .el-input-number {
    width: 100px;
  }
</style>
