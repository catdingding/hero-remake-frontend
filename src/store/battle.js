import api from "@/api";

export default {
  namespaced: true,
  state() {
    return {
      battle_map_id: null,
      battle_result: null
    };
  },
  mutations: {
    set_battle_result(state, data) {
      state.battle_result = data;
    },
    set_battle_map_id(state, battle_map_id) {
      state.battle_map_id = battle_map_id;
    }
  },
  actions: {
    async fight_battle_map({ state, commit, dispatch }) {
      return api.post(`/battle/battle-maps/${state.battle_map_id}/fight/`).then(res => {
        commit("set_battle_result", res.data);
      });
    }
  }
};
