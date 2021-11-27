import api from "@/api";
import { Message } from "element-ui";

export default {
  namespaced: true,
  state() {
    return {
      pet_types: [],
    };
  },
  mutations: {
    set_pet_types(state, data) {
      state.pet_types = data;
    },
  },
  actions: {
    async use_item({ state, commit, dispatch, rootState }, data) {
      return api.post("chara/item/use/", data);
    },
    async equip_item({ state, commit, dispatch, rootState }, data) {
      return api.post("chara/slot/equip/", data);
    },
    async divest_slot({ state, commit, dispatch, rootState }, data) {
      return api.post("chara/slot/divest/", data);
    },
    async get_storage_items({ state, commit, dispatch, rootState }, { conditions }) {
      var res = await api.get("chara/storage/items/", { params: conditions });
      return res.data;
    },
    async get_bag_items({ state, commit, dispatch, rootState }, { conditions }) {
      var res = await api.get("chara/bag/items/", { params: conditions });
      return res.data;
    },
    async put_item_to_storage({ state, commit, dispatch, rootState }, data) {
      return api.post("chara/storage/put/", data);
    },
    async take_item_from_storage({ state, commit, dispatch, rootState }, data) {
      return api.post("chara/storage/take/", data);
    },
    async send_item({ state, commit, dispatch, rootState }, data) {
      return api.post("chara/item/send/", data);
    },
    async send_gold({ state, commit, dispatch, rootState }, data) {
      api.post("chara/send-gold/", data).then((res) => {
        dispatch("chara/get_chara_profile", { fields: "gold" }, { root: true });
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
    async transform_quipment({ state, commit, dispatch, rootState }, data) {
      await api.post("smith/transform-quipment/", data);
      dispatch("chara/get_chara_profile", { fields: "bag_items" }, { root: true });
    },
  },
};
