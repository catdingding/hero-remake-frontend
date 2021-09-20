import api from "@/api";
import router from "@/router";
import { Message } from "element-ui";

export default {
  namespaced: true,
  state() {
    return {
      team_profile: null,
      team_join_requests: [],
      team_members: [],
    };
  },
  mutations: {
    set_team_profile(state, data) {
      state.team_profile = data;
    },
    set_team_join_requests(state, data) {
      state.team_join_requests = data;
    },
    set_team_members(state, data) {
      state.team_members = data;
    },
  },
  actions: {
    async get_team_profile({ state, commit, dispatch, rootState }) {
      var team = rootState.chara.chara_team.id;
      var res = await api.get(`teams/${team}/`);
      commit("set_team_profile", res.data);
    },
    async found_team({ state, commit, dispatch, rootState }, data) {
      await api.post(`team/found/`, data);
      dispatch("chara/get_chara_profile", { fields: "team" }, { root: true });
    },
    async get_team_members({ state, commit, dispatch, rootState }) {
      var team = rootState.chara.chara_team.id;
      var res = await api.get(`charas/?fields=id,name,official&team=${team}`);
      commit("set_team_members", res.data);
    },
    async leave_team({ state, commit, dispatch, rootState }) {
      await api.post(`team/leave/`);
      router.push("/game");
    },
    async dismiss_member({ state, commit, dispatch, rootState }, data) {
      await api.post(`team/dismiss-member/`, data);
      dispatch("get_team_members");
    },
    async create_team_join_request({ state, commit, dispatch, rootState }, data) {
      return api.post(`team/join-requests/`, data);
    },
    async get_team_join_requests({ state, commit, dispatch, rootState }) {
      var res = await api.get(`team/join-requests/`);
      commit("set_team_join_requests", res.data);
    },
    async review_team_join_request({ state, commit, dispatch, rootState }, { id, action }) {
      await api.post(`team/join-requests/${id}/review/`, { action });
      dispatch("get_team_join_requests");
    },
    async disband_team({ state, commit, dispatch, rootState }, data) {
      await api.post(`team/disband/`, data);
      router.push("/game");
    },
    async change_dungeon_record_status({ state, commit, dispatch, rootState }, data) {
      await api.post(`team/change-dungeon-record-status/`, data);
      dispatch("get_team_profile");
    },
  },
};
