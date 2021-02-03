import Vue from "vue";
import Vuex from "vuex";
import { Message } from "element-ui";
import api from "@/api";
import chara from "./chara";
import battle from "./battle";
import map from "./map";
import item from "./item";
import trade from "./trade";
import job from "./job";
import ability from "./ability";
import search from "./search";
import country from "./country";
import user from "./user";
import ws from "./ws";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { chara, battle, map, item, trade, job, ability, search, country, user, ws },
  state: {
    access_token: localStorage.getItem("access_token") || "",
    refresh_token: localStorage.getItem("refresh_token") || "",
    chara_id: localStorage.getItem("chara_id") || null,
    element_types: [],
    available_charas: []
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
      const chara_id = state.available_charas[0].id;
      state.chara_id = chara_id;
      api.defaults.headers.common["Chara-ID"] = chara_id;
      localStorage.setItem("chara_id", chara_id);
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
    async rest({ commit, dispatch }) {
      return api.post("/chara/rest/").then(res => {
        Message.success("體力已恢復");
        dispatch("chara/get_chara_profile", {});
      });
    }
  }
});
