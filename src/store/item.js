import api from "@/api";
import { Message } from "element-ui";

export default {
  namespaced: true,
  state() {
    return {
      storage_items: []
    };
  },
  mutations: {
    set_storage_items(state, data) {
      for (let item of data) {
        item.select_number = 1;
      }
      state.storage_items = data;
    }
  },
  actions: {
    async use_item({ state, commit, dispatch, rootState }, data) {
      await api.post("chara/item/use/", data).then(res => {
        Message.success(res.data.detail);
      });
      dispatch("get_chara_profile", { omit: "" }, { root: true });
    },
    async equip_item({ state, commit, dispatch, rootState }, data) {
      await api.post("chara/slot/equip/", data);
      dispatch("get_chara_profile", { omit: "" }, { root: true });
    },
    async divest_slot({ state, commit, dispatch, rootState }, data) {
      await api.post("chara/slot/divest/", data);
      dispatch("get_chara_profile", { omit: "" }, { root: true });
    },
    async get_storage_items({ state, commit, dispatch, rootState }) {
      api.get("chara/storage/items/").then(res => {
        commit("set_storage_items", res.data);
      });
    },
    async put_item_to_storage({ state, commit, dispatch, rootState }, data) {
      api.post("chara/storage/put/", data).then(res => {
        dispatch("get_storage_items");
        dispatch("get_chara_profile", { omit: "", fields: "bag_items" }, { root: true });
      });
    },
    async take_item_from_storage({ state, commit, dispatch, rootState }, data) {
      api.post("chara/storage/take/", data).then(res => {
        dispatch("get_storage_items");
        dispatch("get_chara_profile", { omit: "", fields: "bag_items" }, { root: true });
      });
    }
  }
};
