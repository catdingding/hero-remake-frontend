<template>
  <div v-if="country_profile">
    <el-row type="flex" justify="space-around" style="width: 100%;">
      <el-col :span="7">
        <el-card>
          <template #header>
            <div>國家概況</div>
          </template>
          <table v-if="chara_country && country_profile">
            <tr>
              <td>國王</td>
              <td>{{ country_profile.king.name }}</td>
              <td>
                <el-button type="primary" @click="change_king_dialog_visiable = true" v-show="chara_is_king">
                  禪讓
                </el-button>
              </td>
            </tr>
            <tr>
              <td>國家資金</td>
              <td>{{ $filters.currency(country_profile.gold) }}</td>
              <td><el-button type="primary" @click="donate_dialog_visible = true">捐獻</el-button></td>
            </tr>
            <tr>
              <td>領土數量</td>
              <td>{{ country_profile.location_count }}</td>
              <td></td>
            </tr>
          </table>

          <el-button type="danger" @click="leave_country">
            下野
          </el-button>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card>
          <el-tabs model-value="first">
            <el-tab-pane label="國民名冊" name="first">
              <Pagination :fetch-method="get_country_citizens" ref="citizen_table">
                <template v-slot:main="slot_props">
                  <table>
                    <tr>
                      <th>角色名稱</th>
                      <th>官職</th>
                      <th>操作</th>
                    </tr>
                    <tr v-for="chara in slot_props.records" :key="chara.id">
                      <td>{{ chara.name }}</td>
                      <td>{{ chara.official ? chara.official.title : "無" }}</td>
                      <td>
                        <el-button
                          v-if="!chara.official"
                          v-show="chara_is_king"
                          type="primary"
                          @click="
                            create_official_form_data.chara = chara.id;
                            create_official_dialog_visiable = true;
                          "
                        >
                          授予官職
                        </el-button>
                        <el-button
                          v-else
                          v-show="chara_is_king"
                          type="primary"
                          @click="delete_country_official(chara.official.id).then(() => $refs.citizen_table.fetch())"
                        >
                          取消官職
                        </el-button>
                        <el-button
                          v-show="(!chara.official && chara_official) || chara_is_king"
                          type="danger"
                          @click="dismiss_citizen({ chara: chara.id }).then(() => $refs.citizen_table.fetch())"
                        >
                          驅逐
                        </el-button>
                      </td>
                    </tr>
                  </table>
                </template>
              </Pagination>
            </el-tab-pane>
            <el-tab-pane label="領土清單" name="second">
              <table>
                <tr v-for="location in country_profile.locations" :key="location.id">
                  <td>
                    ({{ location.x }},{{ location.y }})：{{ location.battle_map_name }}
                    <el-button
                      v-if="location.x === chara_location.x && location.y === chara_location.y"
                      type="info"
                      size="small"
                      disabled
                    >
                      當前位置
                    </el-button>
                    <el-button v-else type="success" size="small" @click="move(location)">前往</el-button>
                  </td>
                </tr>
              </table>
            </el-tab-pane>
            <el-tab-pane label="其他" name="third">
              <div v-show="chara_is_king">
                <el-divider>國家簡介</el-divider>
                <el-input type="textarea" :rows="10" v-model="country_profile.setting.introduction"></el-input>
                <el-divider>儲存</el-divider>
                <el-button type="primary" @click="set_country_setting(country_profile.setting)">儲存</el-button>
              </div>
              <div v-show="!chara_is_king">
                <el-divider>國家簡介</el-divider>
                {{ country_profile.setting.introduction }}
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
    <!-- 捐獻 -->
    <el-dialog title="捐獻" v-model="donate_dialog_visible">
      <el-form :model="donate_form_data" class="form">
        <el-form-item label="捐獻金額" prop="gold" required>
          <InputNumber
            :min="1"
            :max="chara_gold"
            v-model="donate_form_data.gold"
            size="large"
            width="180px"
          ></InputNumber>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="donate_dialog_visible = false">取消</el-button>
          <el-button
            type="primary"
            @click="
              donate_country(donate_form_data);
              donate_dialog_visible = false;
            "
            >確認
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 禪讓 -->
    <el-dialog title="禪讓王位" v-model="change_king_dialog_visiable">
      <el-form :model="change_king_form_data" class="form">
        <el-form-item label="禪讓對象" prop="chara" required>
          <CharaSelect
            v-if="chara_country"
            v-model="change_king_form_data.chara"
            :conditions="{ country: chara_country.id }"
          ></CharaSelect>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="change_king_dialog_visiable = false">取消</el-button>
          <el-button
            type="primary"
            @click="
              change_king(change_king_form_data);
              change_king_dialog_visiable = false;
            "
            >確認
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 授予官職 -->
    <el-dialog title="授予官職" v-model="create_official_dialog_visiable">
      <el-form :model="create_official_form_data" class="form">
        <el-form-item label="官職名稱" prop="title" required>
          <el-input v-model="create_official_form_data.title"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="create_official_dialog_visiable = false">取消</el-button>
          <el-button
            type="primary"
            @click="
              create_country_official(create_official_form_data).then(() => $refs.citizen_table.fetch());
              create_official_dialog_visiable = false;
            "
            >確認
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import CharaSelect from "@/components/CharaSelect.vue";
  import InputNumber from "@/components/InputNumber";
  import Pagination from "@/components/Pagination";

  export default {
    name: "CountryPanel",
    data() {
      return {
        donate_form_data: { gold: 1 },
        donate_dialog_visible: false,
        change_king_form_data: { chara: null },
        change_king_dialog_visiable: false,
        create_official_dialog_visiable: false,
        create_official_form_data: { chara: null, title: "" },
      };
    },
    computed: {
      ...mapState("chara", ["chara_gold", "chara_country", "chara_official", "chara_is_king", "chara_location"]),
      ...mapState("country", ["country_profile"]),
    },
    methods: {
      ...mapActions("country", [
        "get_country_citizens",
        "donate_country",
        "create_country_official",
        "delete_country_official",
        "change_king",
        "leave_country",
        "dismiss_citizen",
        "set_country_setting",
      ]),
      ...mapActions("map", ["move"]),
    },
    mounted() {
      this.$store.dispatch("chara/get_chara_profile", { fields: "country,gold,official,is_king,location" }).then(() => {
        this.$store.dispatch("country/get_country_profile");
      });
    },
    components: { CharaSelect, InputNumber, Pagination },
  };
</script>

<style lang="less" scoped>
  .attr {
    margin: 5px 0 5px 0;
    width: 100%;
    display: flex;

    span:nth-child(1) {
      width: 30%;
      display: inline-block;
    }
    span:nth-child(2) {
      width: 70%;
      text-align: right;
      display: inline-block;
    }
  }
  .el-card {
    text-align: center;
  }
</style>
