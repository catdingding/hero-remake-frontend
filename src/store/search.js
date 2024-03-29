import api from "@/api";

function conditions_to_query_param(conditions) {
  var params = [];
  for (let key in conditions) {
    let value = conditions[key];
    if (Array.isArray(value)) {
      for (let v of value) {
        params.push(`${key}=${v}`);
      }
    } else {
      params.push(`${key}=${value}`);
    }
  }
  return params.join("&");
}

export default {
  namespaced: true,
  state() {
    return {
      search_result_charas: [],
      search_result_countries: [],
      search_result_teams: [],
      search_result_log_messages: [],
      search_result_battle_results: [],
      search_result_item_types: [],
      search_result_change_logs: [],
    };
  },
  mutations: {
    set_search_result_charas(state, data) {
      state.search_result_charas = data;
    },
    set_search_result_countries(state, data) {
      state.search_result_countries = data;
    },
    set_search_result_teams(state, data) {
      state.search_result_teams = data;
    },
    search_result_log_messages(state, data) {
      state.search_result_log_messages = data;
    },
    set_search_result_battle_results(state, data) {
      state.search_result_battle_results = data;
    },
    set_search_result_item_types(state, data) {
      state.search_result_item_types = data;
    },
    set_search_result_change_logs(state, data) {
      state.search_result_change_logs = data;
    },
  },
  actions: {
    async search_charas({ state, commit, dispatch, rootState }, conditions) {
      var param = conditions_to_query_param(conditions);
      api.get(`charas/?fields=id,name&${param}`).then((res) => {
        commit("set_search_result_charas", res.data.results);
      });
    },
    async search_countries({ state, commit, dispatch, rootState }, conditions) {
      var param = conditions_to_query_param(conditions);
      api.get(`countries/?${param}`).then((res) => {
        commit("set_search_result_countries", res.data);
      });
    },
    async search_teams({ state, commit, dispatch, rootState }, conditions) {
      var param = conditions_to_query_param(conditions);
      var res = await api.get(`teams/?${param}`);
      commit("set_search_result_teams", res.data);
    },
    async search_logs({ state, commit, dispatch, rootState }, conditions) {
      var param = conditions_to_query_param(conditions);
      api.get(`logs/?${param}`).then((res) => {
        commit("search_result_log_messages", res.data);
      });
    },
    async search_battle_results({ state, commit, dispatch, rootState }, conditions) {
      var param = conditions_to_query_param(conditions);
      api.get(`battle/battle-results/?${param}`).then((res) => {
        commit("set_search_result_battle_results", res.data);
      });
    },
    async search_item_types({ state, commit, dispatch, rootState }, conditions) {
      var param = conditions_to_query_param(conditions);
      api.get(`item/item-types/?${param}`).then((res) => {
        commit("set_search_result_item_types", res.data);
      });
    },
    async search_change_logs({ state, commit, dispatch, rootState }, conditions) {
      var param = conditions_to_query_param(conditions);
      var res = await api.get(`change-logs/?${param}`);
      commit("set_search_result_change_logs", res.data);
    },
  },
};
