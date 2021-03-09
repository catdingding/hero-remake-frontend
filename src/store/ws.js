export default {
  namespaced: true,
  state() {
    return {
      chat_ws: null,
      public_messages: [],
      country_messages: [],
      private_messages: [],
    };
  },
  mutations: {
    set_chat_ws(state, data) {
      if (state.chat_ws) {
        state.chat_ws.close();
      }
      state.public_messages = [];
      state.country_messages = [];
      state.private_messages = [];
      state.chat_ws = data;
    },
    receive_chat_message(state, e) {
      var data = JSON.parse(e.data);
      let messages = state[`${data.channel}_messages`];
      messages.push(data);
      if (messages.length > 10) {
        messages.shift();
      }
    },
  },
  actions: {
    async start_chat({ state, commit, dispatch, rootState }) {
      var token = rootState.access_token;
      var chara_id = rootState.chara_id;

      var ws = new WebSocket(`ws://${process.env.VUE_APP_API_ROOT}/ws/chat/?token=${token}&chara=${chara_id}`);
      commit("set_chat_ws", ws);
      ws.onmessage = function(e) {
        commit("receive_chat_message", e);
      };
      ws.onclose = function(e) {
        setTimeout(() => {
          dispatch("start_chat");
        }, 5000);
      };
      ws.onerror = function(err) {
        ws.close();
      };
    },
    async send_chat_message({ state, commit, dispatch, rootState }, data) {
      state.chat_ws.send(JSON.stringify(data));
    },
  },
};
