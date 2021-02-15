import api from "@/api";
import { Message } from "element-ui";

export default {
  namespaced: true,
  state() {
    return {
      chara_id: null,
      chara_location: null,
      chara_country: null,
      chara_element_type: null,
      chara_job: null,
      chara_level: null,
      chara_main_ability: null,
      chara_job_ability: null,
      chara_live_ability: null,
      chara_slots: [],
      chara_bag_items: [],
      chara_skill_settings: [],
      chara_attributes: [],
      chara_battle_map_tickets: [],
      chara_name: null,
      chara_next_action_time: null,
      chara_exp: null,
      chara_proficiency: null,
      chara_gold: null,
      chara_health: null,
      chara_hp_max: null,
      chara_hp: null,
      chara_mp_max: null,
      chara_mp: null,
      chara_official: null,
      chara_is_king: false,
    };
  },
  mutations: {
    set_chara_profile(state, data) {
      for (let key in data) {
        state[`chara_${key}`] = data[key];
      }
    },
  },
  actions: {
    async get_chara_profile({ commit }, { omit = "bag_items,slots,skill_settings", fields = "" }) {
      var url = "/chara/profile/?";
      if (omit) {
        url += "omit=" + omit + "&";
      }
      if (fields) {
        url += "fields=" + fields;
      }
      return api.get(url).then((res) => {
        commit("set_chara_profile", res.data);
      });
    },
    async rest({ commit, dispatch }) {
      return api.post("/chara/rest/").then((res) => {
        Message.success("體力已恢復");
        dispatch("chara/get_chara_profile", { fields: "hp" }, { root: true });
      });
    },
  },
};
