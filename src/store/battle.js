import api from "@/api";
import { getField, updateField } from "vuex-map-fields";

export default {
  namespaced: true,
  state() {
    return {
      battle_map_id: null,
      battle_result: null,
      auto_fight_enabled: false,
      pvp_opponents: [],
      battle_result_dialog_visible: false,
    };
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,
    set_battle_result(state, data) {
      state.battle_result = data;
    },
    set_pvp_opponents(state, data) {
      state.pvp_opponents = data;
    },
    set_battle_result_dialog_visible(state, data) {
      state.battle_result_dialog_visible = data;
    },
  },
  actions: {
    async fight_battle_map({ state, commit, dispatch, rootState }) {
      let res = await api.post(`/battle/battle-maps/${state.battle_map_id}/fight/`);
      commit("set_battle_result", res.data);
    },
    async get_pvp_opponents({ state, commit, dispatch, rootState }) {
      return api.get(`/charas/?ordering=-pvp_points`).then((res) => {
        commit("set_pvp_opponents", res.data);
      });
    },
    async pvp_fight({ state, commit, dispatch, rootState }, opponent) {
      let res = await api.post(`/battle/pvp-fight/`, { opponent });
      dispatch("chara/get_chara_profile", { fields: "pvp_point,next_action_time" }, { root: true });
      dispatch("get_pvp_opponents");
      commit("set_battle_result_dialog_visible", true);
      commit("set_battle_result", res.data);
    },
  },
};
