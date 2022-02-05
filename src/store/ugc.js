import api from "@/api";

export default {
  namespaced: true,
  state() {
    return {};
  },
  getters: {},
  mutations: {},
  actions: {
    async get_ugc_dungeons({ state, commit, dispatch, rootState }, { conditions }) {
      let res = await api.get(`/ugc/dungeons/`, { params: conditions });
      return res.data;
    },
    async get_ugc_dungeon_by_id({ state, commit, dispatch, rootState }, id) {
      let res = await api.get(`/ugc/dungeons/${id}/`);
      return res.data;
    },
    async get_ugc_monsters({ state, commit, dispatch, rootState }, { conditions }) {
      let res = await api.get(`/ugc/monsters/`, { params: conditions });
      return res.data;
    },
    async get_ugc_monster_by_id({ state, commit, dispatch, rootState }, id) {
      let res = await api.get(`/ugc/monsters/${id}/`);
      return res.data;
    },
    async change_ugc_dungeon_record_status({ dispatch }, { dungeon, new_status }) {
      let res = await api.post(`/ugc/dungeons/${dungeon}/change-record-status/`, { new_status });
    },
    async ugc_dungeon_fight({ commit, dispatch }, { dungeon }) {
      let res = await api.post(`/ugc/dungeons/${dungeon}/fight/`);
      commit("battle/set_battle_result_dialog_visible", true, { root: true });
      commit("battle/set_battle_result", res.data, { root: true });
    },
    async create_ugc_dungeon({ state, commit, dispatch, rootState }, { data }) {
      let res = await api.post(`/ugc/dungeons/`, data);
    },
    async update_ugc_dungeon({ state, commit, dispatch, rootState }, { dungeon, data }) {
      let res = await api.put(`/ugc/dungeons/${dungeon}/`, data);
    },
    async delete_ugc_dungeon({ state, commit, dispatch, rootState }, { dungeon }) {
      let res = await api.delete(`/ugc/dungeons/${dungeon}/`);
    },
    async create_ugc_monster({ state, commit, dispatch, rootState }, { data }) {
      let res = await api.post(`/ugc/monsters/`, data);
    },
    async update_ugc_monster({ state, commit, dispatch, rootState }, { monster, data }) {
      let res = await api.put(`/ugc/monsters/${monster}/`, data);
    },
    async delete_ugc_monster({ state, commit, dispatch, rootState }, { monster }) {
      let res = await api.delete(`/ugc/monsters/${monster}/`);
    },
  },
};
