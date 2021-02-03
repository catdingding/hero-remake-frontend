import api from "@/api";
import { Message } from "element-ui";

export default {
  namespaced: true,
  state() {
    return {
      store_options: []
    };
  },
  mutations: {
    set_store_options(state, data) {
      for (let item of data) {
        item.select_number = 1;
      }
      state.store_options = data;
    }
  },
  actions: {
    async sell_item({ state, commit, dispatch, rootState }, data) {
      await api.post("chara/item/sell/", data).then(res => {
        dispatch("chara/get_chara_profile", { omit: "", fields: "bag_items,gold" }, { root: true });
      });
    },
    async get_store_options({ state, commit, dispatch, rootState }, { store_type }) {
      api.get(`trade/store-options/?store_type=${store_type}`).then(res => {
        commit("set_store_options", res.data);
      });
    },
    async buy_store_option({ state, commit, dispatch, rootState }, { id, number }) {
      api.post(`trade/store-options/${id}/buy/`, { number }).then(res => {
        dispatch("chara/get_chara_profile", { omit: "", fields: "bag_items,gold" }, { root: true });
      });
    }
  }
};
