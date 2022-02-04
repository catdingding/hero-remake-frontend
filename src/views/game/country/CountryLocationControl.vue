<template>
  <div style="text-align: center">
    <div v-if="_.get(chara_country, 'id') !== _.get(chara_location, 'country.id')">
      <div style="width: 100%;">
        佔領領土需消耗{{ (10 ** 9 * 2 ** _.get(country_profile, "location_count")) | currency }}金錢、
        {{ 50 * 2 ** _.get(country_profile, "location_count") }}建國之石
      </div>
      <el-button type="success" @click="occupy_location">佔領領土</el-button>
    </div>
    <div v-if="_.get(chara_country, 'id') === _.get(chara_location, 'country.id')" style="width: 100%;">
      <el-button type="danger" @click="abandon_location">放棄領土</el-button>
      <div v-if="chara_location.town">
        <el-divider>重新命名城鎮</el-divider>
        <el-input v-model="town_name" style="width: 200px" maxlength="10" show-word-limit></el-input>
        <el-button type="primary" @click="rename_town({ name: town_name })">重新命名(5億)</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";

  export default {
    name: "CountryLocationControl",
    data() {
      return { town_name: "" };
    },
    computed: {
      ...mapState("chara", ["chara_country", "chara_location"]),
      ...mapState("country", ["country_profile"]),
    },
    methods: {
      ...mapActions("country", ["occupy_location", "abandon_location", "rename_town"]),
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "location,country" }).then(() => {
        this.$store.dispatch("country/get_country_profile");
      });
    },
    components: {},
  };
</script>

<style lang="less" scoped>
  .storage {
    width: 48%;
  }
  .bag {
    width: 48%;
  }
</style>
