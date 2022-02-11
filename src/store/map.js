import router from "@/router";
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
    async get_map({ state, commit, dispatch, rootState }, { x, y }) {
      let res = await api.get(`/map/?x=${x}&y=${y}&radius=3`);
      commit("set_map", res.data);
    },
    async move({ state, commit, dispatch }, location) {
      await api.post(`/chara/move/`, { location: location.id });
      commit("battle/updateField", { path: "battle_map_id", value: null }, { root: true });
      router.push("/game");
    },
  },
};
