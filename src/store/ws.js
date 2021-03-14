export default {
  namespaced: true,
  state() {
    return {
      chat_ws: null,
      channels: [
        { name: "all", display_name: "全體", need_input: true },
        { name: "public", display_name: "公開", need_input: true },
        { name: "country", display_name: "國家", need_input: true },
        { name: "private", display_name: "私訊", need_input: true },
      ],
      messages_mapping: {
        all: [],
        public: [],
        country: [],
        private: [],
      },
    };
  },
  mutations: {
    set_chat_ws(state, ws) {
      if (state.chat_ws) {
        state.chat_ws.close();
      }
      state.chat_ws = ws;

      for (let channel in state.messages_mapping) {
        state.messages_mapping[channel] = [];
      }
    },
    receive_chat_message(state, e) {
      var data = JSON.parse(e.data);
      for (let channel of ["all", data.channel]) {
        let messages = state.messages_mapping[channel];
        messages.unshift(data);
        if (messages.length > 50) {
          messages.pop();
        }
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
