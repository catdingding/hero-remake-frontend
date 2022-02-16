Farm<template>
  <div>
    <CharaWallet></CharaWallet>
    <div style="width: 100%;text-align: center">
      <el-button type="success" @click="expand_farm">
        擴充農場(1億)
      </el-button>
    </div>
    <div>請自行斟酌什麼物品適合放置</div>
    <table>
      <tr>
        <th style="width:60%">物品</th>
        <th style="width:40%">收穫</th>
      </tr>
      <tr v-for="farm in chara_farms" :key="farm.id">
        <td>
          <span v-if="farm.item">{{ farm.item.name }}</span>
          <div v-else>
            <el-select v-model="farm.selected_item">
              <el-option
                v-for="item in chara_bag_items"
                :key="item.id"
                :label="$filters.item_string(item)"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-button type="primary" @click="place_item_to_farm({ farm: farm.id, item: farm.selected_item })">
              放置
            </el-button>
          </div>
        </td>
        <td>
          <div v-show="farm.item">
            <el-button type="primary" @click="harvest_farm({ farm: farm.id })">
              收穫(尚餘<RelativeTime :time_string="farm.due_time" :period="1000"></RelativeTime>)
            </el-button>
            <el-button type="danger" @click="remove_item_from_farm({ farm: farm.id })">
              移除
            </el-button>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import CharaWallet from "@/components/CharaWallet.vue";
  export default {
    name: "Farm",
    data() {
      return {};
    },
    computed: {
      ...mapState("chara", ["chara_farms", "chara_bag_items"]),
    },
    methods: {
      ...mapActions("home", ["expand_farm", "place_item_to_farm", "remove_item_from_farm", "harvest_farm"]),
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "farms,bag_items,gold" });
    },
    components: { CharaWallet },
  };
</script>

<style lang="less" scoped></style>
