import api from "@/api";

export default {
  namespaced: true,
  state() {
    return {
      store_options: [],
      exchange_options: [],
      todo_auctions: [],
      todo_sales: [],
      active_purchases: [],
      todo_purchases: [],
      lotteries: [],
      todo_parcels: [],
    };
  },
  mutations: {
    set_store_options(state, data) {
      state.store_options = data;
    },
    set_exchange_options(state, data) {
      state.exchange_options = data;
    },
    set_todo_auctions(state, data) {
      state.todo_auctions = data;
    },
    set_todo_sales(state, data) {
      state.todo_sales = data;
    },
    set_active_purchases(state, data) {
      state.active_purchases = data;
    },
    set_todo_purchases(state, data) {
      state.todo_purchases = data;
    },
    set_lotteries(state, data) {
      state.lotteries = data;
    },
    set_todo_parcels(state, data) {
      state.todo_parcels = data;
    },
  },
  actions: {
    // store
    async sell_item({ state, commit, dispatch, rootState }, data) {
      return api.post("chara/item/sell/", data).then((res) => {
        dispatch("chara/get_chara_profile", { fields: "gold" }, { root: true });
      });
    },
    async get_store_options({ state, commit, dispatch, rootState }, { store_type }) {
      api.get(`trade/store-options/?store_type=${store_type}`).then((res) => {
        commit("set_store_options", res.data);
      });
    },
    async buy_store_option({ state, commit, dispatch, rootState }, { id, number }) {
      return api.post(`trade/store-options/${id}/buy/`, { number }).then((res) => {
        dispatch("chara/get_chara_profile", { fields: "gold" }, { root: true });
      });
    },
    // exchange
    async get_exchange_options({ state, commit, dispatch, rootState }) {
      api.get(`trade/exchange-options/`).then((res) => {
        commit("set_exchange_options", res.data);
      });
    },
    async buy_exchange_option({ state, commit, dispatch, rootState }, { id, number }) {
      return api.post(`trade/exchange-options/${id}/exchange/`, { number });
    },
    // auction
    async get_active_auctions({ state, commit, dispatch, rootState }, { conditions }) {
      var res = await api.get(`trade/auctions/active/`, { params: conditions });
      return res.data;
    },
    async get_todo_auctions({ state, commit, dispatch, rootState }) {
      api.get(`trade/auctions/todo/`).then((res) => {
        commit("set_todo_auctions", res.data);
      });
    },
    async create_auction({ state, commit, dispatch, rootState }, data) {
      api.post(`trade/auctions/`, data);
    },
    async bid_auction({ state, commit, dispatch, rootState }, { id, bid_price }) {
      api.post(`trade/auctions/${id}/bid/`, { bid_price });
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
    async get_active_sales({ state, commit, dispatch, rootState }, { conditions }) {
      var res = await api.get(`trade/sales/active/`, { params: conditions });
      return res.data;
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
    // purchase
    async get_active_purchases({ state, commit, dispatch, rootState }) {
      api.get(`trade/purchases/active/`).then((res) => {
        commit("set_active_purchases", res.data);
      });
    },
    async get_todo_purchases({ state, commit, dispatch, rootState }) {
      api.get(`trade/purchases/todo/`).then((res) => {
        commit("set_todo_purchases", res.data);
      });
    },
    async create_purchase({ state, commit, dispatch, rootState }, data) {
      api.post(`trade/purchases/`, data).then((res) => {
        dispatch("get_active_purchases");
      });
    },
    async sell_purchase({ state, commit, dispatch, rootState }, id) {
      api.post(`trade/purchases/${id}/sell/`).then((res) => {
        dispatch("get_active_purchases");
      });
    },
    async receive_purchase({ state, commit, dispatch, rootState }, id) {
      api.post(`trade/purchases/${id}/receive/`).then((res) => {
        dispatch("get_todo_purchases");
      });
    },
    async buy_member_shop({ state, commit, dispatch, rootState }, { option, ...data }) {
      await api.post(`trade/member-shop/${option}/`, data);
      dispatch(
        "chara/get_chara_profile",
        { fields: "record,bag_item_limit,member_point,has_cold_down_bonus,has_quest_bonus,has_auto_heal_bonus" },
        { root: true }
      );
    },
    async get_lotteries({ state, commit, dispatch, rootState }) {
      var res = await api.get(`trade/lotteries/`);
      commit("set_lotteries", res.data);
    },
    async buy_lottery({ state, commit, dispatch, rootState }, data) {
      await api.post(`trade/lottery/buy/`, data);
      dispatch("get_lotteries");
    },
    //parcel
    async get_todo_parcels({ state, commit, dispatch, rootState }) {
      var res = await api.get(`trade/parcels/todo/`);
      commit("set_todo_parcels", res.data);
    },
    async create_parcel({ state, commit, dispatch, rootState }, data) {
      await api.post(`trade/parcels/`, data);
      await dispatch("get_todo_parcels");
    },
    async receive_parcel({ state, commit, dispatch, rootState }, id) {
      await api.post(`trade/parcels/${id}/receive/`);
      await dispatch("get_todo_parcels");
    },
    async cancel_parcel({ state, commit, dispatch, rootState }, id) {
      await api.post(`trade/parcels/${id}/cancel/`);
      await dispatch("get_todo_parcels");
    },
  },
};
