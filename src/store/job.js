import api from "@/api";
import { Message } from "view-design";

export default {
  namespaced: true,
  state() {
    return {
      available_jobs: [],
      available_skills: []
    };
  },
  mutations: {
    set_available_jobs(state, data) {
      state.available_jobs = data;
    },
    set_available_skills(state, data) {
      state.available_skills = data;
    }
  },
  actions: {
    async get_available_jobs({ state, commit, dispatch, rootState }) {
      api.get(`chara/job/available/`).then(res => {
        commit("set_available_jobs", res.data);
      });
    },
    async change_job({ state, commit, dispatch, rootState }, data) {
      return api.post(`chara/job/change/`, data);
    },
    async get_available_skills({ state, commit, dispatch, rootState }) {
      api.get(`chara/skill/available/`).then(res => {
        commit("set_available_skills", res.data);
      });
    },
    async set_skill_settings({ state, commit, dispatch, rootState }, data) {
      for (let [index, row] of data.entries()) {
        data[index].order = index;
      }
      return api.post(`chara/skill/set/`, { settings: data });
    }
  }
};
