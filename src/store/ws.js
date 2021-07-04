import { Notification } from "element-ui";

export default {
  namespaced: true,
  state() {
    return {
      ws: null,
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
      log_messages: [],
    };
  },
  mutations: {
    set_ws(state, ws) {
      if (state.ws) {
        state.ws.close();
      }
      state.ws = ws;

      for (let channel in state.messages_mapping) {
        state.messages_mapping[channel] = [];
      }
      state.log_messages = [];
    },
    receive_log_message(state, data) {
      state.log_messages.unshift(data);
      if (state.log_messages.length > 100) {
        state.log_messages.pop();
      }
    },
    receive_chat_message(state, data) {
      for (let channel of ["all", data.channel]) {
        let messages = state.messages_mapping[channel];
        messages.unshift(data);
        if (messages.length > 50) {
          messages.pop();
        }
      }

      if (data.channel === "private" && !data.is_init && data.sender.id != this.state.chara_id) {
        var duration = data.is_system_generated ? 0 : 60000;
        Notification({ title: data.sender.name, message: data.content, position: "top-left", duration: duration });
      }
    },
  },
  actions: {
    async start_ws({ state, commit, dispatch, rootState }) {
      var token = rootState.access_token;
      var chara_id = rootState.chara_id;

      var ws = new WebSocket(`ws://${process.env.VUE_APP_API_ROOT}/ws/chat/?token=${token}&chara=${chara_id}`);
      commit("set_ws", ws);
      ws.onmessage = function(e) {
        var data = JSON.parse(e.data);
        if (data.type === "chat_message") {
          commit("receive_chat_message", data);
        } else if (data.type === "log_message") {
          commit("receive_log_message", data);
        }
      };
      ws.onclose = function(e) {
        if (rootState.access_token) {
          setTimeout(() => {
            dispatch("start_ws");
          }, 5000);
        }
      };
      ws.onerror = function(err) {
        ws.close();
      };
    },
    async send_chat_message({ state, commit, dispatch, rootState }, data) {
      state.ws.send(JSON.stringify(data));
    },
  },
};
