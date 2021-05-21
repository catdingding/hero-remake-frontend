<template>
  <div>
    <div class="slots">
      <CharaWallet></CharaWallet>
      <table>
        <tr>
          <th>名稱</th>
          <th>攻擊</th>
          <th>防禦</th>
          <th>重量</th>
          <th>奧義1</th>
          <th>奧義2</th>
          <th>強化</th>
        </tr>
        <tr class="item" v-for="(slot, index) in chara_slots" v-show="slot.type.id === 4" :key="index">
          <td>{{ slot.item ? slot.item.name : "" }}</td>
          <td>{{ slot.item ? slot.item.equipment.attack : "" }}</td>
          <td>{{ slot.item ? slot.item.equipment.defense : "" }}</td>
          <td>{{ slot.item ? slot.item.equipment.weight : "" }}</td>
          <td>
            <div v-if="slot.item">
              {{ slot.item && slot.item.equipment.ability_1 ? slot.item.equipment.ability_1.name : "無" }}
            </div>
          </td>
          <td>
            <div v-if="slot.item">
              {{ slot.item && slot.item.equipment.ability_2 ? slot.item.equipment.ability_2.name : "無" }}
            </div>
          </td>
          <td>
            <div v-if="slot.item">
              {{ slot.item.equipment.upgrade_times }}/{{ slot.item.equipment.upgrade_times_limit }}
              <br />
              <el-button type="primary" @click="pet_upgrade({ slot_type: slot.type.id, times: 1 })">強化</el-button>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import CharaWallet from "@/components/CharaWallet.vue";
  export default {
    name: "PetStore",
    data() {
      return {};
    },
    computed: { ...mapState("chara", ["chara_slots"]) },
    methods: {
      ...mapActions("item", ["pet_upgrade"]),
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", {
        fields: "slots,proficiency,gold",
      });
    },
    components: { CharaWallet },
  };
</script>

<style lang="less" scoped>
  .slots {
    width: 100%;
  }
</style>
