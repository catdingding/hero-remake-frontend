import api from "@/api";

export default {
  namespaced: true,
  state() {
    return {};
  },
  mutations: {},
  actions: {
    async change_password({ state, commit, dispatch, rootState }, data) {
      api.post(`user/change-password/`, data);
    }
  }
};
