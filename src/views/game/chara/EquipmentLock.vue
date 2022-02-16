<template>
  <div>
    <SlotTable :slots="chara_slots">
      <template v-slot:extra-column>
        <el-table-column label="卸下" align="center">
          <template v-slot="scope">
            <el-button
              v-if="scope.row.item"
              :type="scope.row.item.equipment.is_locked ? 'danger' : 'success'"
              @click="toggle_equipment_lock(scope.row.type.id)"
            >
              {{ scope.row.item.equipment.is_locked ? "解綁" : "綁定" }}
            </el-button>
          </template>
        </el-table-column>
      </template>
    </SlotTable>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import SlotTable from "@/components/SlotTable.vue";

  export default {
    name: "EquipmentLock",
    data() {
      return {};
    },
    computed: {
      ...mapState("chara", ["chara_slots"]),
    },
    methods: {
      ...mapActions("item", ["toggle_equipment_lock"]),
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "slots" });
    },
    components: { SlotTable },
  };
</script>

<style lang="less" scoped></style>
