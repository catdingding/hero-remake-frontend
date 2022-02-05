<template>
  <div>
    樓層上限10層，每層上限3隻怪物
    <el-form :model="form_data" label-width="120px" label-position="left">
      <el-form-item label="名稱" required>
        <el-input v-model="form_data.name"></el-input>
      </el-form-item>
      <el-form-item label="簡介" required>
        <el-input type="textarea" v-model="form_data.description"></el-input>
      </el-form-item>
      <div class="floor" v-for="(floor, index) in form_data.floors" :key="index">
        <div>
          {{ index + 1 }}層
          <el-button type="primary" @click="form_data.floors.splice(index + 1, 0, { monsters: [{ monster: null }] })">
            新增樓層
          </el-button>
          <el-button type="danger" @click="form_data.floors.splice(index, 1)">刪除樓層</el-button>
        </div>
        <div class="monster" v-for="(monster, idx) in floor.monsters" :key="idx">
          <el-select v-model="monster.monster">
            <el-option
              v-for="option in monster_options"
              :key="option.id"
              :label="option.name"
              :value="option.id"
            ></el-option>
          </el-select>
          <el-button type="primary" @click="floor.monsters.splice(idx + 1, 0, { monster: null })">新增怪物</el-button>
          <el-button type="danger" @click="floor.monsters.splice(idx, 1)">刪除怪物</el-button>
        </div>
      </div>
    </el-form>
    <div style="text-align:center">
      <el-button type="success" @click="save">儲存</el-button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";

  export default {
    name: "UGCPanelDungeonForm",
    data() {
      return { form_data: {}, monster_options: [] };
    },
    props: { dungeon_id: { type: Number, default: null } },
    computed: { ...mapState("chara", ["chara_id"]) },
    methods: {
      ...mapActions("ugc", ["create_ugc_dungeon", "update_ugc_dungeon", "get_ugc_dungeon_by_id", "get_ugc_monsters"]),
      async save() {
        if (this.dungeon_id) {
          await this.update_ugc_dungeon({ dungeon: this.dungeon_id, data: this.form_data });
        } else {
          await this.create_ugc_dungeon({ data: this.form_data });
        }
        this.$emit("save");
      },
    },

    async mounted() {
      if (this.dungeon_id) {
        this.form_data = await this.get_ugc_dungeon_by_id(this.dungeon_id);
      } else {
        this.form_data = {
          name: "",
          description: "",
          floors: [{ monsters: [{ monster: null }] }],
        };
      }
      this.monster_options = (await this.get_ugc_monsters({ conditions: { chara: this.chara_id } }))["results"];
    },
    components: {},
  };
</script>

<style lang="less" scoped>
  .floor,
  .monster {
    padding: 5px;
  }
</style>
