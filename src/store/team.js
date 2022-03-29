import api from "@/api";
import router from "@/router";

export default {
  namespaced: true,
  state() {
    return {
      team_profile: null,
    };
  },
  mutations: {
    set_team_profile(state, data) {
      state.team_profile = data;
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
    async get_team_members({ state, commit, dispatch, rootState }, { conditions }) {
      var team = rootState.chara.chara_team.id;
      var res = await api.get(`charas/?fields=id,name,official&team=${team}`, { params: conditions });
      return res.data;
    },
    async leave_team({ state, commit, dispatch, rootState }) {
      await api.post(`team/leave/`);
      router.push("/game");
    },
    async dismiss_member({ state, commit, dispatch, rootState }, data) {
      return api.post(`team/dismiss-member/`, data);
    },
    async create_team_join_request({ state, commit, dispatch, rootState }, data) {
      return api.post(`team/join-requests/`, data);
    },
    async disband_team({ state, commit, dispatch, rootState }, data) {
      await api.post(`team/disband/`, data);
      router.push("/game");
    },
    async change_leader({ state, commit, dispatch, rootState }, data) {
      await api.post(`team/change-leader/`, data);
      dispatch("chara/get_chara_profile", { fields: "is_leader" }, { root: true });
    },
  },
};
