import api from "@/api";

export default {
  namespaced: true,
  state() {
    return {
      map: null,
    };
  },
  mutations: {},
  actions: {
    async sleep_inn({ state, commit, dispatch }, kind) {
      await api.post(`/town/inn/sleep/`, { kind });
    },
    async change_name({ state, commit, dispatch }, data) {
      await api.post(`/town/change-name/`, data);
    },
    async submit_altar({ state, commit, dispatch, rootState }, data) {
      await api.post(`/town/altar/submit/`, data);
      await dispatch("chara/get_chara_profile", { fields: "bag_items" }, { root: true });
    },
  },
};
