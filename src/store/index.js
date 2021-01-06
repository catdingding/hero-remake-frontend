import Vue from "vue";
import Vuex from "vuex";
import { Message } from "element-ui";
import api from "@/api";
import battle from "./battle";
import map from "./map";
import item from "./item";
import trade from "./trade";
import job from "./job";
import ability from "./ability";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { battle, map, item, trade, job, ability },
  state: {
    auto_refresh: 0,
    access_token: localStorage.getItem("access_token") || "",
    refresh_token: localStorage.getItem("refresh_token") || "",
    chara: localStorage.getItem("chara") || null,
    element_types: [],
    available_charas: [],
    chara_profile: null
  },
  getters: {},
  mutations: {
    set_access_token(state, token) {
      state.access_token = token;
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("access_token", token);
    },
    set_refresh_token(state, token) {
      state.refresh_token = token;
      localStorage.setItem("refresh_token", token);
    },
    set_element_types(state, data) {
      state.element_types = data;
    },
    set_available_charas(state, data) {
      state.available_charas = data;
    },
    set_chara(state) {
      const chara = state.available_charas[0].id;
      state.chara = chara;
      api.defaults.headers.common["Chara-ID"] = chara;
      localStorage.setItem("chara", chara);
    },
    set_chara_profile(state, data) {
      if (data.bag_items) {
        for (let item of data.bag_items) {
          item.select_number = 1;
        }
      }
      state.chara_profile = data;
    },
    trigger_auto_refresh(state) {
      state.auto_refresh += 1;
    }
  },
  actions: {
    async login({ commit }, data) {
      return api
        .post("/token/", data)
        .then(res => {
          commit("set_access_token", res.data.access);
          commit("set_refresh_token", res.data.refresh);
        })
        .catch(err => {
          throw err;
        });
    },
    async register({ commit }, data) {
      return api
        .post("/user/registration/", data)
        .then(res => {
          commit("set_access_token", res.data.access);
          commit("set_refresh_token", res.data.refresh);
        })
        .catch(err => {
          throw err;
        });
    },
    async refresh_element_types({ commit }) {
      return api.get("/world/element-types/").then(res => {
        commit("set_element_types", res.data);
      });
    },
    async get_available_charas({ commit }) {
      return api.get("/user/charas/").then(res => {
        commit("set_available_charas", res.data);
      });
    },
    async get_chara_profile({ commit }, { omit = "bag_items,slots,skill_settings", fields = "" }) {
      var url = "/chara/profile/?";
      if (omit) {
        url += "omit=" + omit + "&";
      }
      if (fields) {
        url += "fields=" + fields;
      }
      return api.get(url).then(res => {
        commit("set_chara_profile", res.data);
      });
    },
    async rest({ commit, dispatch }) {
      return api.post("/chara/rest/").then(res => {
        Message.success("體力已恢復");
        dispatch("get_chara_profile", {});
      });
    }
  }
});
