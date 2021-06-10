import api from "@/api";
import router from "@/router";
import { Message } from "element-ui";

export default {
  namespaced: true,
  state() {
    return {
      country_profile: null,
      country_storage_items: [],
      country_join_requests: [],
      country_citizens: [],
    };
  },
  mutations: {
    set_country_profile(state, data) {
      state.country_profile = data;
    },
    set_country_storage_items(state, data) {
      state.country_storage_items = data;
    },
    set_country_join_requests(state, data) {
      state.country_join_requests = data;
    },
    set_country_citizens(state, data) {
      state.country_citizens = data;
    },
  },
  actions: {
    async get_country_profile({ state, commit, dispatch, rootState }) {
      var country = rootState.chara.chara_country.id;
      var res = await api.get(`countries/${country}/?expand=*`);
      commit("set_country_profile", res.data);
    },
    async found_country({ state, commit, dispatch, rootState }, data) {
      return api.post(`country/found/`, data).then((res) => {
        dispatch("chara/get_chara_profile", { fields: "country" }, { root: true });
      });
    },
    async occupy_location({ state, commit, dispatch, rootState }, data) {
      await api.post(`country/occupy-location/`);
      router.push("/game");
    },
    async build_town({ state, commit, dispatch, rootState }, data) {
      await api.post(`country/build-town/`, data);
      router.push("/game");
    },
    async abandon_location({ state, commit, dispatch, rootState }, data) {
      await api.post(`country/abandon-location/`);
      router.push("/game");
    },
    async upgrade_storage({ state, commit, dispatch, rootState }) {
      await api.post(`country/upgrade-storage/`);
      dispatch("get_country_profile");
    },
    async get_country_storage_items({ state, commit, dispatch, rootState }) {
      return api.get("country/storage/items/").then((res) => {
        commit("set_country_storage_items", res.data);
      });
    },
    async put_item_to_country_storage({ state, commit, dispatch, rootState }, data) {
      return api.post("country/storage/put/", data).then((res) => {
        dispatch("get_country_storage_items");
        dispatch("chara/get_chara_profile", { fields: "bag_items" }, { root: true });
      });
    },
    async take_item_from_country_storage({ state, commit, dispatch, rootState }, data) {
      return api.post("country/storage/take/", data).then((res) => {
        dispatch("get_country_storage_items");
        dispatch("chara/get_chara_profile", { fields: "bag_items" }, { root: true });
      });
    },
    async donate_country({ state, commit, dispatch, rootState }, data) {
      return api.post(`country/donate/`, data).then((res) => {
        dispatch("chara/get_chara_profile", { fields: "country,gold" }, { root: true });
      });
    },
    async get_country_citizens({ state, commit, dispatch, rootState }) {
      var country = rootState.chara.chara_country.id;
      return api.get(`charas/?fields=id,name,official&country=${country}`).then((res) => {
        commit("set_country_citizens", res.data);
      });
    },
    async create_country_official({ state, commit, dispatch, rootState }, data) {
      return api.post(`country/officials/`, data).then((res) => {
        dispatch("get_country_citizens");
      });
    },
    async delete_country_official({ state, commit, dispatch, rootState }, id) {
      return api.delete(`country/officials/${id}/`).then((res) => {
        dispatch("get_country_citizens");
      });
    },
    async change_king({ state, commit, dispatch, rootState }, data) {
      return api.post(`country/change-king/`, data).then((res) => {
        dispatch("chara/get_chara_profile", { fields: "country,is_king" }, { root: true });
      });
    },
    async leave_country({ state, commit, dispatch, rootState }) {
      return api.post(`country/leave/`).then((res) => {
        router.push("/game");
      });
    },
    async dismiss_citizen({ state, commit, dispatch, rootState }, data) {
      return api.post(`country/dismiss/`, data).then((res) => {
        dispatch("get_country_citizens");
      });
    },
    async create_country_join_request({ state, commit, dispatch, rootState }, data) {
      return api.post(`country/join-requests/`, data);
    },
    async get_country_join_requests({ state, commit, dispatch, rootState }) {
      return api.get(`country/join-requests/`).then((res) => {
        commit("set_country_join_requests", res.data);
      });
    },
    async approve_country_join_request({ state, commit, dispatch, rootState }, id) {
      api.post(`country/join-requests/${id}/approve/`).then((res) => {
        dispatch("get_country_join_requests");
      });
    },
  },
};
