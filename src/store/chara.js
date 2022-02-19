import api from "@/api";
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
      chara_title: null,
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
      chara_titles: [],
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
    able_to_action: (state, getters, rootState, rootGetters) => () => {
      return Date.parse(state.chara_next_action_time) - rootGetters.get_client_time() <= 0;
    },
  },
  mutations: {
    set_chara_profile(state, data) {
      for (let key in data) {
        state[`chara_${key}`] = data[key];
      }
    },
    apply_config(state, data) {
      if (data.background) {
        document.body.style["background-color"] = null;
        document.body.style["background"] = data.background;
      } else {
        document.body.style["background-color"] = "var(--color-white)";
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
      commit("set_client_offset", res, { root: true });
      commit("set_chara_profile", res.data);
      if ("config" in res.data) {
        commit("apply_config", res.data.config);
      }

      let remain_tickets = state.chara_battle_map_tickets.reduce(
        (acc, current) => (current.battle_map.id === rootState.battle.battle_map_id ? acc + current.value : acc),
        0
      );
      if (remain_tickets === 0 && state.chara_location) {
        commit("battle/updateField", { path: "battle_map_id", value: state.chara_location.battle_map }, { root: true });
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
    async set_title({ commit, dispatch }, data) {
      return api.post("/chara/title/set/", data);
    },
    async increase_hp_mp_max({ commit, dispatch }) {
      await api.post("/chara/increase-hp-mp-max/");
      return dispatch("chara/get_chara_profile", { fields: "gold,hp_max,mp_max" }, { root: true });
    },
    async hand_in_quest({ commit, dispatch }, quest) {
      await api.post("/chara/quest/hand-in/", { quest });
      await dispatch("get_chara_profile", { fields: "gold,proficiency,record" });
    },
    async get_chara_achievement_types({ state, commit, dispatch, rootState }, { conditions }) {
      var res = await api.get("chara/achievement-types/", { params: conditions });
      return res.data;
    },
  },
};
