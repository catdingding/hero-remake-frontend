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
  },
};
