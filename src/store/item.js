import api from "@/api";
import { Message } from "element-ui";

export default {
  namespaced: true,
  state() {
    return {
      storage_items: [],
      pet_types: [],
    };
  },
  mutations: {
    set_storage_items(state, data) {
      state.storage_items = data;
    },
    set_pet_types(state, data) {
      state.pet_types = data;
    },
  },
  actions: {
    async use_item({ state, commit, dispatch, rootState }, data) {
      await api.post("chara/item/use/", data);
      dispatch("chara/get_chara_profile", { fields: "slots,bag_items,bag_item_limit" }, { root: true });
    },
    async equip_item({ state, commit, dispatch, rootState }, data) {
      await api.post("chara/slot/equip/", data);
      dispatch("chara/get_chara_profile", { fields: "slots,bag_items" }, { root: true });
    },
    async divest_slot({ state, commit, dispatch, rootState }, data) {
      await api.post("chara/slot/divest/", data);
      dispatch("chara/get_chara_profile", { fields: "slots,bag_items" }, { root: true });
    },
    async get_storage_items({ state, commit, dispatch, rootState }) {
      api.get("chara/storage/items/").then((res) => {
        commit("set_storage_items", res.data);
      });
    },
    async put_item_to_storage({ state, commit, dispatch, rootState }, data) {
      api.post("chara/storage/put/", data).then((res) => {
        dispatch("get_storage_items");
        dispatch("chara/get_chara_profile", { fields: "bag_items" }, { root: true });
      });
    },
    async take_item_from_storage({ state, commit, dispatch, rootState }, data) {
      api.post("chara/storage/take/", data).then((res) => {
        dispatch("get_storage_items");
        dispatch("chara/get_chara_profile", { fields: "bag_items" }, { root: true });
      });
    },
    async send_item({ state, commit, dispatch, rootState }, data) {
      api.post("chara/item/send/", data).then((res) => {
        dispatch("chara/get_chara_profile", { fields: "bag_items,gold" }, { root: true });
      });
    },
    async send_gold({ state, commit, dispatch, rootState }, data) {
      api.post("chara/send-gold/", data).then((res) => {
        dispatch("chara/get_chara_profile", { fields: "bag_items,gold" }, { root: true });
      });
    },
    async smith_upgrade({ state, commit, dispatch, rootState }, data) {
      api.post("smith/upgrade/", data).then((res) => {
        dispatch("chara/get_chara_profile", { fields: "slots,bag_items,proficiency,gold" }, { root: true });
      });
    },
    async smith_replace_ability({ state, commit, dispatch, rootState }, data) {
      api.post("smith/replace-ability/", data).then((res) => {
        dispatch("chara/get_chara_profile", { fields: "slots,bag_items,proficiency,gold" }, { root: true });
      });
    },
    async pet_upgrade({ state, commit, dispatch, rootState }, data) {
      api.post("pet/upgrade/", data).then((res) => {
        dispatch("chara/get_chara_profile", { fields: "slots,proficiency,gold" }, { root: true });
      });
    },
    async smith_replace_element_type({ state, commit, dispatch, rootState }, data) {
      await api.post("smith/replace-element-type/", data);
      await dispatch("chara/get_chara_profile", { fields: "slots" }, { root: true });
    },
    async battle_map_ticket_to_item({ state, commit, dispatch, rootState }, data) {
      await api.post("chara/battle-map-ticket-to-item/", data);
      await dispatch("chara/get_chara_profile", { fields: "battle_map_tickets" }, { root: true });
    },
    async toggle_equipment_lock({ state, commit, dispatch, rootState }, slot_type) {
      await api.post("chara/item/toggle-equipment-lock/", { slot_type });
      await dispatch("chara/get_chara_profile", { fields: "slots" }, { root: true });
    },
    async get_pet_types({ state, commit, dispatch, rootState }) {
      var res = await api.get("item/pet-types/");
      commit("set_pet_types", res.data);
    },
  },
};
