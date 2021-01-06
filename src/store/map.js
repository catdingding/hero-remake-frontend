import api from "@/api";

export default {
  namespaced: true,
  state() {
    return {
      map: null
    };
  },
  mutations: {
    set_map(state, data) {
      state.map = data;
    }
  },
  actions: {
    async get_map({ state, commit, dispatch, rootState }) {
      await dispatch("get_chara_profile", {}, { root: true });
      var location = rootState.chara_profile.location;
      return api.get(`/map/?x=${location.x}&y=${location.y}&radius=3`).then(res => {
        commit("set_map", res.data);
      });
    },
    async move({ state, commit, dispatch }, location) {
      return api.post(`/chara/move/`, { location: location.id });
    }
  }
};
