import api from "@/api";
import { getField, updateField } from "vuex-map-fields";

export default {
  namespaced: true,
  state() {
    return {
      npcs: [],
      npc_profile: null,
      npc_profile_dialog_visible: false,
    };
  },
  getters: { getField },
  mutations: {
    updateField,
    set_npcs(state, data) {
      state.npcs = data;
    },
    set_npc_profile(state, data) {
      state.npc_profile = data;
    },
    set_npc_profile_dialog_visible(state, data) {
      state.npc_profile_dialog_visible = data;
    },
  },
  actions: {
    async get_npcs({ state, commit, dispatch, rootState }) {
      let res = await api.get(`/npc/npcs/`);
      commit("set_npcs", res.data);
    },
    async get_npc_profile({ state, commit, dispatch, rootState }, npc_id) {
      let res = await api.get(`/npc/npcs/${npc_id}/profile/`);
      commit("set_npc_profile", res.data);
    },
    async open_chara_profile_dialog({ state, commit, dispatch, rootState }, npc_id) {
      await dispatch("get_npc_profile", npc_id);
      commit("set_npc_profile_dialog_visible", true);
    },
    async submit_favorite({ state, commit, dispatch, rootState }, { favorite, number, npc_id }) {
      let res = await api.post(`/npc/submit-favorite/`, { favorite, number });
      dispatch("get_npc_profile", npc_id);
    },
    async exchange({ state, commit, dispatch, rootState }, { exchange_option, number, npc_id }) {
      let res = await api.post(`/npc/exchange/`, { exchange_option, number });
      dispatch("get_npc_profile", npc_id);
    },
  },
};
