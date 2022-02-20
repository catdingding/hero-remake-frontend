import router from "@/router";
import api from "@/api";

export default {
  namespaced: true,
  state() {
    return {};
  },
  mutations: {},
  actions: {
    async move({ state, commit, dispatch }, location) {
      await api.post(`/chara/move/`, { location: location.id });
      commit("battle/updateField", { path: "battle_map_id", value: null }, { root: true });
      router.push("/game");
    },
  },
};
