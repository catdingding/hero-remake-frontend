import api from "@/api";
import { Message } from "element-ui";

export default {
  namespaced: true,
  state() {
    return {
      available_to_set_abilities: [],
      available_to_learn_abilities: [],
      alchemy_options: []
    };
  },
  mutations: {
    set_available_to_set_abilities(state, data) {
      state.available_to_set_abilities = data;
    },
    set_available_to_learn_abilities(state, data) {
      state.available_to_learn_abilities = data;
    },
    set_alchemy_options(state, data) {
      state.alchemy_options = data;
    }
  },
  actions: {
    async get_available_to_set_abilities({ state, commit, dispatch, rootState }) {
      api.get(`chara/ability/available-to-set/`).then(res => {
        commit("set_available_to_set_abilities", res.data);
      });
    },
    async get_available_to_learn_abilities({ state, commit, dispatch, rootState }) {
      api.get(`chara/ability/available-to-learn/`).then(res => {
        commit("set_available_to_learn_abilities", res.data);
      });
    },
    async set_abilitie_setting({ state, commit, dispatch, rootState }, data) {
      return api.post(`chara/ability/set/`, data);
    },
    async learn_ability({ state, commit, dispatch, rootState }, data) {
      api.post(`chara/ability/learn/`, data).then(() => {
        dispatch("get_available_to_learn_abilities");
      });
    },
    async get_alchemy_options({ state, commit, dispatch, rootState }) {
      api.get(`ability/alchemy-options/`).then(res => {
        commit("set_alchemy_options", res.data);
      });
    },
    async make_alchemy_option({ state, commit, dispatch, rootState }, { id, number }) {
      api.post(`ability/alchemy-options/${id}/make/`, { number }).then(() => {
        dispatch("chara/get_chara_profile", { fields: "bag_items,proficiency" });
      });
    }
  }
};
