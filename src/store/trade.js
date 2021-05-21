import api from "@/api";
import { Message } from "element-ui";

export default {
  namespaced: true,
  state() {
    return {
      store_options: [],
      exchange_options: [],
      active_auctions: [],
      todo_auctions: [],
      active_sales: [],
      todo_sales: [],
    };
  },
  mutations: {
    set_store_options(state, data) {
      state.store_options = data;
    },
    set_exchange_options(state, data) {
      state.exchange_options = data;
    },
    set_active_auctions(state, data) {
      state.active_auctions = data;
    },
    set_todo_auctions(state, data) {
      state.todo_auctions = data;
    },
    set_active_sales(state, data) {
      state.active_sales = data;
    },
    set_todo_sales(state, data) {
      state.todo_sales = data;
    },
  },
  actions: {
    // store
    async sell_item({ state, commit, dispatch, rootState }, data) {
      await api.post("chara/item/sell/", data).then((res) => {
        dispatch("chara/get_chara_profile", { fields: "bag_items,gold" }, { root: true });
      });
    },
    async get_store_options({ state, commit, dispatch, rootState }, { store_type }) {
      api.get(`trade/store-options/?store_type=${store_type}`).then((res) => {
        commit("set_store_options", res.data);
      });
    },
    async buy_store_option({ state, commit, dispatch, rootState }, { id, number }) {
      api.post(`trade/store-options/${id}/buy/`, { number }).then((res) => {
        dispatch("chara/get_chara_profile", { fields: "bag_items,gold" }, { root: true });
      });
    },
    // exchange
    async get_exchange_options({ state, commit, dispatch, rootState }) {
      api.get(`trade/exchange-options/`).then((res) => {
        commit("set_exchange_options", res.data);
      });
    },
    async buy_exchange_option({ state, commit, dispatch, rootState }, { id, number }) {
      api.post(`trade/exchange-options/${id}/exchange/`, { number }).then((res) => {
        dispatch("chara/get_chara_profile", { fields: "bag_items" }, { root: true });
      });
    },
    // auction
    async get_active_auctions({ state, commit, dispatch, rootState }) {
      api.get(`trade/auctions/active/`).then((res) => {
        commit("set_active_auctions", res.data);
      });
    },
    async get_todo_auctions({ state, commit, dispatch, rootState }) {
      api.get(`trade/auctions/todo/`).then((res) => {
        commit("set_todo_auctions", res.data);
      });
    },
    async create_auction({ state, commit, dispatch, rootState }, data) {
      api.post(`trade/auctions/`, data).then((res) => {
        dispatch("get_active_auctions");
      });
    },
    async bid_auction({ state, commit, dispatch, rootState }, { id, bid_price }) {
      api.post(`trade/auctions/${id}/bid/`, { bid_price }).then((res) => {
        dispatch("get_active_auctions");
      });
    },
    async receive_auction_item({ state, commit, dispatch, rootState }, id) {
      api.post(`trade/auctions/${id}/receive-item/`).then((res) => {
        dispatch("get_todo_auctions");
      });
    },
    async receive_auction_gold({ state, commit, dispatch, rootState }, id) {
      api.post(`trade/auctions/${id}/receive-gold/`).then((res) => {
        dispatch("get_todo_auctions");
      });
    },
    // sale
    async get_active_sales({ state, commit, dispatch, rootState }) {
      api.get(`trade/sales/active/`).then((res) => {
        commit("set_active_sales", res.data);
      });
    },
    async get_todo_sales({ state, commit, dispatch, rootState }) {
      api.get(`trade/sales/todo/`).then((res) => {
        commit("set_todo_sales", res.data);
      });
    },
    async create_sale({ state, commit, dispatch, rootState }, data) {
      api.post(`trade/sales/`, data).then((res) => {
        dispatch("get_active_sales");
      });
    },
    async buy_sale({ state, commit, dispatch, rootState }, id) {
      api.post(`trade/sales/${id}/buy/`).then((res) => {
        dispatch("get_active_sales");
      });
    },
    async receive_sale_item({ state, commit, dispatch, rootState }, id) {
      api.post(`trade/sales/${id}/receive-item/`).then((res) => {
        dispatch("get_todo_sales");
      });
    },
  },
};
