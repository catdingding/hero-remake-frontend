import Vue from "vue";
import Vuex from "vuex";
import { Message } from "element-ui";
import router from "@/router";
import { getField, updateField } from "vuex-map-fields";

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
import team from "./team";
import town from "./town";
import user from "./user";
import dialog from "./dialog";
import ws from "./ws";
import home from "./home";
import npc from "./npc";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { chara, battle, map, item, trade, job, ability, search, country, team, town, user, dialog, ws, home, npc },
  state: {
    access_token: localStorage.getItem("access_token") || "",
    refresh_token: localStorage.getItem("refresh_token") || "",
    chara_id: localStorage.getItem("chara_id") || null,
    element_types: [
      { id: 1, name: "無" },
      { id: 2, name: "火" },
      { id: 3, name: "水" },
      { id: 4, name: "風" },
      { id: 5, name: "星" },
      { id: 6, name: "雷" },
      { id: 7, name: "光" },
      { id: 8, name: "暗" },
    ],
    slot_types: [
      { id: 1, name: "武器" },
      { id: 2, name: "防具" },
      { id: 3, name: "飾品" },
      { id: 4, name: "寵物" },
    ],
    item_categories: [
      { id: 1, name: "裝備" },
      { id: 2, name: "道具" },
      { id: 3, name: "奧義石" },
      { id: 4, name: "原料" },
    ],
    available_charas: [],
    online_charas: [],
    client_offset: 0,
    action_offset_enabled: false,
  },
  getters: {
    getField,
    is_loggedin(state) {
      return !!state.access_token;
    },
    get_client_time: (state) => () => {
      return new Date() - (state.action_offset_enabled ? state.client_offset : 0);
    },
  },
  mutations: {
    updateField,
    set_access_token(state, token) {
      state.access_token = token;
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("access_token", token);
    },
    set_refresh_token(state, token) {
      state.refresh_token = token;
      localStorage.setItem("refresh_token", token);
    },
    clear_token(state) {
      state.access_token = "";
      state.refresh_token = "";
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
    set_available_charas(state, data) {
      state.available_charas = data;
    },
    set_chara(state) {
      const chara_id = state.available_charas[0].id;
      state.chara_id = chara_id;
      api.defaults.headers.common["Chara-ID"] = chara_id;
      localStorage.setItem("chara_id", chara_id);
    },
    set_online_charas(state, data) {
      state.online_charas = data;
    },
    set_client_offset(state, res) {
      state.client_offset = new Date() - new Date(res.headers.date);
    },
  },
  actions: {
    async login({ commit, dispatch }, data) {
      var res = await api.post("/token/", data);
      commit("set_access_token", res.data.access);
      commit("set_refresh_token", res.data.refresh);
      Message.success("登入成功");

      // 自動選擇角色
      await dispatch("get_available_charas");
      commit("set_chara");
      router.push("game/");
    },
    async logout({ commit, dispatch }) {
      commit("clear_token");
      Message.success("登出成功");
      router.push("/");
    },
    async register({ commit, dispatch }, data) {
      data = Object.assign({}, data);
      var chara_avatar = data.chara_avatar;
      delete data.chara_avatar;

      var form_data = new FormData();
      form_data.append("json_data", JSON.stringify(data));
      form_data.append("chara_avatar", chara_avatar);

      var res = await api.post("/user/registration/", form_data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      commit("set_access_token", res.data.access);
      commit("set_refresh_token", res.data.refresh);
      Message.success("註冊成功");

      // 自動選擇角色
      await dispatch("get_available_charas");
      commit("set_chara");
      router.push("game/");
    },
    async get_available_charas({ commit }) {
      return api.get("/user/charas/").then((res) => {
        commit("set_available_charas", res.data);
      });
    },
    async get_online_charas({ commit }) {
      var res = await api.get("/charas/online/?fields=id,name");
      commit("set_online_charas", res.data);
    },
  },
});
