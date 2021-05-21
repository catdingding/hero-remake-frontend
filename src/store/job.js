import api from "@/api";
import { Message } from "element-ui";

export default {
  namespaced: true,
  state() {
    return {
      available_jobs: [],
      available_skills: [],
      exercise_rewards: [],
    };
  },
  mutations: {
    set_available_jobs(state, data) {
      state.available_jobs = data;
    },
    set_available_skills(state, data) {
      state.available_skills = data;
    },
    set_exercise_rewards(state, data) {
      state.exercise_rewards = data;
    },
  },
  actions: {
    async get_available_jobs({ state, commit, dispatch, rootState }) {
      api.get(`chara/job/available/`).then((res) => {
        commit("set_available_jobs", res.data);
      });
    },
    async get_exercise_rewards({ state, commit, dispatch, rootState }) {
      api.get(`exercise-rewards/`).then((res) => {
        commit("set_exercise_rewards", res.data);
      });
    },
    async exercise({ state, commit, dispatch, rootState }) {
      api.post(`chara/exercise/`).then((res) => {
        dispatch("chara/get_chara_profile", { fields: "proficiency,attributes" }, { root: true });
      });
    },
    async change_job({ state, commit, dispatch, rootState }, data) {
      return api.post(`chara/job/change/`, data);
    },
    async get_available_skills({ state, commit, dispatch, rootState }) {
      api.get(`chara/skill/available/`).then((res) => {
        commit("set_available_skills", res.data);
      });
    },
    async set_skill_settings({ state, commit, dispatch, rootState }, data) {
      for (let [index, row] of data.entries()) {
        data[index].order = index;
      }
      return api.post(`chara/skill/set/`, { settings: data });
    },
  },
};
