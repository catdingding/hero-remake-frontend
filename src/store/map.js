import api from "@/api";

export default {
  namespaced: true,
  state() {
    return {
      map: null,
    };
  },
  mutations: {
    set_map(state, data) {
      state.map = data;
    },
  },
  actions: {
    async get_map({ state, commit, dispatch, rootState }) {
      await dispatch("chara/get_chara_profile", { fields: "location" }, { root: true });
      var location = rootState.chara.chara_location;
      return api.get(`/map/?x=${location.x}&y=${location.y}&radius=3`).then((res) => {
        commit("set_map", res.data);
      });
    },
    async move({ state, commit, dispatch }, location) {
      await api.post(`/chara/move/`, { location: location.id });
      commit("battle/updateField", { path: "battle_map_id", value: null }, { root: true });
    },
  },
};
