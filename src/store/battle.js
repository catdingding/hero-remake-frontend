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
      battle_loots_log_messages: [],
      world_bosses: [],
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
    set_world_bosses(state, data) {
      state.world_bosses = data;
    },
    append_loots_log(state, data) {
      if (data.loots.length !== 0) {
        state.battle_loots_log_messages.unshift({
          created_at: new Date(),
          content: "獲得了" + data.loots.map((x) => x.name + "×" + x.number).join("、"),
        });
        if (state.battle_loots_log_messages.length > 100) {
          state.battle_loots_log_messages.pop();
        }
      }
    },
  },
  actions: {
    async fight_battle_map({ state, commit, dispatch, rootState }) {
      let res = await api.post(`/battle/battle-maps/${state.battle_map_id}/fight/`);
      if (!state.battle_result_dialog_visible) {
        commit("set_battle_result", res.data);
      }
      commit("append_loots_log", res.data);
    },
    async get_pvp_opponents({ state, commit, dispatch, rootState }) {
      return api.get(`/charas/?fields=id,name,pvp_points&ordering=-pvp_points`).then((res) => {
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
    async dungeon_fight({ state, commit, dispatch, rootState }, data) {
      let res = await api.post(`/battle/dungeon-fight/`, data);
      dispatch("team/get_team_profile", {}, { root: true });
      commit("set_battle_result_dialog_visible", true);
      commit("set_battle_result", res.data);
    },
    async get_battle_result({ state, commit, dispatch, rootState }, id) {
      let res = await api.get(`/battle/battle-results/${id}`);
      commit("set_battle_result_dialog_visible", true);
      commit("set_battle_result", res.data.content);
    },
    async get_world_bosses({ state, commit, dispatch, rootState }) {
      let res = await api.get(`/world-bosses/`);
      commit("set_world_bosses", res.data);
    },
    async world_boss_fight({ state, commit, dispatch, rootState }, data) {
      let res = await api.post(`/battle/world-boss-fight/`, data);
      dispatch("get_world_bosses");
      commit("set_battle_result_dialog_visible", true);
      commit("set_battle_result", res.data);
    },
  },
};
