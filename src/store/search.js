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
      search_result_countries: []
    };
  },
  mutations: {
    set_search_result_charas(state, data) {
      state.search_result_charas = data;
    },
    set_search_result_countries(state, data) {
      state.search_result_countries = data;
    }
  },
  actions: {
    async search_charas({ state, commit, dispatch, rootState }, conditions) {
      var param = conditions_to_query_param(conditions);
      api.get(`charas/?${param}`).then(res => {
        commit("set_search_result_charas", res.data);
      });
    },
    async search_countries({ state, commit, dispatch, rootState }, conditions) {
      var param = conditions_to_query_param(conditions);
      api.get(`countries/?${param}`).then(res => {
        commit("set_search_result_countries", res.data);
      });
    }
  }
};
