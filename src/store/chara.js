import api from "@/api";
import { Message } from "element-ui";
import _ from "lodash";

export default {
  namespaced: true,
  state() {
    return {
      chara_id: null,
      chara_avatar_version: 0,
      chara_location: null,
      chara_country: null,
      chara_team: null,
      chara_element_type: null,
      chara_job: null,
      chara_level: null,
      chara_main_ability: null,
      chara_job_ability: null,
      chara_live_ability: null,
      chara_partner: null,
      chara_slots: [],
      chara_bag_items: [],
      chara_skill_settings: [],
      chara_attributes: [],
      chara_battle_map_tickets: [],
      chara_name: null,
      chara_next_action_time: null,
      chara_exp: null,
      chara_pvp_points: null,
      chara_proficiency: null,
      chara_gold: null,
      chara_health: null,
      chara_hp_max: null,
      chara_hp: null,
      chara_mp_max: null,
      chara_mp: null,
      chara_hp_limit: null,
      chara_mp_limit: null,
      chara_luck: null,
      chara_farms: [],
      chara_buffs: [],
      chara_partners: [],
      chara_official: null,
      chara_is_king: false,
      chara_is_leader: false,
      chara_introduction: null,
      chara_record: {},
      chara_bag_item_limit: null,
      chara_storage_item_limit: null,
      chara_member_point: null,
      chara_has_cold_down_bonus: null,
      chara_has_quest_bonus: null,
      chara_has_auto_heal: null,
    };
  },
  getters: {
    able_to_action: (state) => () => {
      return Date.parse(state.chara_next_action_time) - new Date() <= 0;
    },
  },
  mutations: {
    set_chara_profile(state, data) {
      for (let key in data) {
        state[`chara_${key}`] = data[key];
      }
    },
  },
  actions: {
    async get_chara_profile({ commit, state, rootState }, { omit = "", fields = "" }) {
      var url = "/chara/profile/?";
      if (omit) {
        url += "omit=" + omit + "&";
      }
      if (fields) {
        url += "fields=" + fields;
      }
      let chara_country = state.chara_country;
      let chara_team = state.chara_team;

      let res = await api.get(url);
      commit("set_chara_profile", res.data);

      let remain_tickets = state.chara_battle_map_tickets.reduce(
        (acc, current) => (current.battle_map.id === rootState.battle.battle_map_id ? acc + current.value : acc),
        0
      );
      if (remain_tickets === 0 && state.chara_location) {
        commit("battle/updateField", { path: "battle_map_id", value: state.chara_location.battle_map }, { root: true });
      }
      if (
        _.get(state.chara_country, "id") !== _.get(chara_country, "id") ||
        _.get(state.chara_team, "id") !== _.get(chara_team, "id")
      ) {
        commit("ws/close_ws", {}, { root: true });
      }
    },
    async rest({ commit, dispatch }) {
      return api.post("/chara/rest/").then((res) => {
        dispatch("chara/get_chara_profile", { fields: "hp,mp" }, { root: true });
      });
    },
    async assign_partner({ commit, dispatch }, data) {
      return api.post("/chara/partner/assign/", data);
    },
    async set_introduction({ commit, dispatch }, data) {
      return api.put("/chara/introduction/", data);
    },
    async increase_hp_mp_max({ commit, dispatch }) {
      await api.post("/chara/increase-hp-mp-max/");
      return dispatch("chara/get_chara_profile", { fields: "gold,hp_max,mp_max" }, { root: true });
    },
    async hand_in_quest({ commit, dispatch }, quest) {
      await api.post("/chara/quest/hand-in/", { quest });
      await dispatch("get_chara_profile", { fields: "gold,proficiency,record" });
    },
    async change_avatar({ commit, dispatch }, avatar) {
      var form_data = new FormData();
      form_data.append("avatar", avatar);

      await api.post("/chara/change-avatar/", form_data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  },
};
