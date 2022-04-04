<template>
  <div>
    <Pagination :fetch-method="get_charas" :fixed_conditions="fixed_conditions" :page-size="20">
      <template v-slot:conditions="slot_props">
        <el-form inline :model="slot_props.conditions">
          <el-form-item>
            <el-select clearable v-model="slot_props.conditions.ordering" placeholder="排序">
              <el-option v-for="option in options" :label="option.name" :value="option.value" :key="option.name" />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:main="slot_props">
        <el-table :data="slot_props.records">
          <el-table-column label="角色名稱" align="center">
            <template v-slot="scope">
              <CharaLink :chara_name="scope.row.name" :chara_id="scope.row.id"></CharaLink>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </Pagination>
  </div>
</template>

<script setup>
  import CharaLink from "@/components/CharaLink";
  import Pagination from "@/components/Pagination";
  import { get_charas } from "@/api/chara";

  const fixed_conditions = { fields: "id,name" };
  const options = [
    { name: "PvP分數", value: "-pvp_points" },
    { name: "金錢", value: "-gold" },
    { name: "熟練", value: "-proficiency" },
    { name: "總戰數", value: "-record__total_battle" },
    { name: "HP最大值", value: "-hp_max" },
    { name: "MP最大值", value: "-mp_max" },
  ];
</script>

<style lang="less" scoped></style>
