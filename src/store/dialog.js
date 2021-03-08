import api from "@/api";
import { getField, updateField } from "vuex-map-fields";

export default {
  namespaced: true,
  state() {
    return {
      chara_profile_dialog_visible: false,
      chara_profile_dialog_data: null,
    };
  },
  getters: { getField },
  mutations: {
    updateField,
    set_chara_profile_dialog_visible(state, data) {
      state.chara_profile_dialog_visible = data;
    },
    set_chara_profile_dialog_data(state, data) {
      state.chara_profile_dialog_data = data;
    },
  },
  actions: {
    async open_chara_profile_dialog({ state, commit, dispatch, rootState }, chara_id) {
      let res = await api.get(`/charas/${chara_id}/profile/`);
      commit("set_chara_profile_dialog_data", res.data);
      commit("set_chara_profile_dialog_visible", true);
    },
  },
};
