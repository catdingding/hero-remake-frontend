import api from "@/api";
import { getField, updateField } from "vuex-map-fields";
import { v4 as uuidv4 } from "uuid";
import { ElNotification } from "element-plus";

export default {
  namespaced: true,
  state() {
    return {
      battle_map_id: null,
      battle_result: null,
      auto_fight_enabled: false,
      waiting_battle_result: false,
      auto_fight_error_times: 0,
      battle_result_dialog_visible: false,
      battle_loots_log_messages: [],
      world_bosses: [],
      arenas: [],
    };
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,
    set_battle_result(state, data) {
      state.battle_result = data;
    },
    set_battle_result_dialog_visible(state, data) {
      state.battle_result_dialog_visible = data;
    },
    set_world_bosses(state, data) {
      state.world_bosses = data;
    },
    set_arenas(state, data) {
      state.arenas = data;
    },
    append_loots_log(state, data) {
      if (data.loots.length !== 0) {
        state.battle_loots_log_messages.unshift({
          uuid: uuidv4(),
          created_at: new Date(),
          content: "獲得了" + data.loots.map((x) => x.name + "×" + x.number).join("、"),
        });
        if (state.battle_loots_log_messages.length > 100) {
          state.battle_loots_log_messages.pop();
        }
      }
    },
  },
  actions: {
    async fight_battle_map({ state, commit, dispatch, rootState }) {
      let res = await api.post(`/battle/battle-maps/${state.battle_map_id}/fight/`);
      if (!state.battle_result_dialog_visible) {
        commit("set_battle_result", res.data);
      }
      commit("append_loots_log", res.data);
    },
    async get_pvp_opponents({ state, commit, dispatch, rootState }, { conditions }) {
      var res = await api.get(`/charas/?fields=id,name,pvp_points&ordering=-pvp_points`, { params: conditions });
      return res.data;
    },
    async pvp_fight({ state, commit, dispatch, rootState }, opponent) {
      let res = await api.post(`/battle/pvp-fight/`, { opponent });
      dispatch("chara/get_chara_profile", { fields: "pvp_point,next_action_time" }, { root: true });
      commit("set_battle_result_dialog_visible", true);
      commit("set_battle_result", res.data);
    },
    async mirror_fight({ state, commit, dispatch, rootState }) {
      let res = await api.post(`/battle/mirror-fight/`);
      dispatch("chara/get_chara_profile", { fields: "next_action_time" }, { root: true });
      commit("set_battle_result_dialog_visible", true);
      commit("set_battle_result", res.data);
    },
    async pvp_team_fight({ state, commit, dispatch, rootState }, opponent) {
      let res = await api.post(`/battle/pvp-team-fight/`, { opponent });
      dispatch("chara/get_chara_profile", { fields: "next_action_time" }, { root: true });
      commit("set_battle_result_dialog_visible", true);
      commit("set_battle_result", res.data);
    },
    async get_arenas({ state, commit, dispatch, rootState }) {
      var res = await api.get(`/battle/arenas/`);
      commit("set_arenas", res.data);
    },
    async arena_fight({ state, commit, dispatch, rootState }, arena) {
      return api.post(`/battle/arena-fight/`, { arena }).then((res) => {
        dispatch("get_arenas");
        if (res.data.logs) {
          commit("set_battle_result_dialog_visible", true);
          commit("set_battle_result", res.data);
        }
      });
    },
    async dungeon_fight({ state, commit, dispatch, rootState }, data) {
      let res = await api.post(`/battle/dungeon-fight/`, data);
      commit("set_battle_result_dialog_visible", true);
      commit("set_battle_result", res.data);
    },
    async get_battle_result({ state, commit, dispatch, rootState }, id) {
      let res = await api.get(`/battle/battle-results/${id}`);
      commit("set_battle_result_dialog_visible", true);
      commit("set_battle_result", res.data.content);
    },
    async get_world_bosses({ state, commit, dispatch, rootState }) {
      let res = await api.get(`/world-bosses/`);
      commit("set_world_bosses", res.data);
    },
    async world_boss_fight({ state, commit, dispatch, rootState }, data) {
      let res = await api.post(`/battle/world-boss-fight/`, data);
      dispatch("get_world_bosses");
      commit("set_battle_result_dialog_visible", true);
      commit("set_battle_result", res.data);
    },
    async open_battle_result_dialog({ commit }, data) {
      commit("set_battle_result_dialog_visible", true);
      commit("set_battle_result", data);
    },
    async try_auto_fight({ state, commit, dispatch, rootState, rootGetters }) {
      if (!state.auto_fight_enabled || state.waiting_battle_result || !rootGetters["chara/able_to_action"]()) {
        return;
      }
      if (rootState.chara.chara_hp <= 0) {
        ElNotification({
          type: "error",
          title: "提示",
          message: "HP不足，已停止自動戰鬥",
          duration: 0,
        });
        commit("updateField", { path: "auto_fight_enabled", value: false });
        return;
      }
      if (state.battle_map_id === null) {
        ElNotification({
          type: "error",
          title: "提示",
          message: "請選擇戰鬥地圖",
          duration: 0,
        });
        commit("updateField", { path: "auto_fight_enabled", value: false });
        return;
      }
      commit("updateField", { path: "waiting_battle_result", value: true });
      let has_error = false;
      try {
        await dispatch("fight_battle_map");
        if (rootState.chara.chara_record.total_battle % 10 === 1) {
          await dispatch(
            "chara/get_chara_profile",
            {
              omit: "bag_items,slots,skill_settings,introduction,main_ability,job_ability,live_ability,team,country,farms,title,titles,partner,partners",
            },
            { root: true }
          );
        } else {
          await dispatch(
            "chara/get_chara_profile",
            {
              fields:
                "battle_map_tickets,attributes,exp,gold,health,hp,hp_max,hp_limit,mp,mp_max,mp_limit,level,next_action_time,proficiency,record",
            },
            { root: true }
          );
        }
      } catch (e) {
        has_error = true;
        if (e.response && e.response.status >= 400 && e.response.status < 500) {
          commit("updateField", { path: "auto_fight_error_times", value: state.auto_fight_error_times + 1 });
          if (state.auto_fight_error_times > 10) {
            commit("updateField", { path: "auto_fight_error_times", value: 0 });
            commit("updateField", { path: "auto_fight_enabled", value: false });
            ElNotification({
              type: "error",
              title: "提示",
              message: "自動戰鬥失敗次數過多，請檢查背包空間或電腦時間設定",
              duration: 0,
            });
          }
        }
      }
      commit("updateField", { path: "waiting_battle_result", value: false });

      if (!has_error && rootGetters["chara/able_to_action"]()) {
        dispatch("try_auto_fight");
      }
    },
  },
};
