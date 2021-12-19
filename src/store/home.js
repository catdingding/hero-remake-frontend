import api from "@/api";

export default {
  namespaced: true,
  state() {
    return {};
  },
  mutations: {},
  actions: {
    // farm
    async expand_farm({ state, commit, dispatch, rootState }, data) {
      await api.post("chara/farm/expand/", data);
      await dispatch("chara/get_chara_profile", { fields: "farms" }, { root: true });
    },
    async place_item_to_farm({ state, commit, dispatch, rootState }, data) {
      await api.post("chara/farm/place-item/", data);
      await dispatch("chara/get_chara_profile", { fields: "farms" }, { root: true });
    },
    async harvest_farm({ state, commit, dispatch, rootState }, data) {
      await api.post("chara/farm/harvest/", data);
      await dispatch("chara/get_chara_profile", { fields: "farms" }, { root: true });
    },
  },
};
