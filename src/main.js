import Vue from "vue";
import "view-design/dist/styles/iview.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from "view-design";
import locale from "view-design/dist/locale/zh-TW";
import VueLodash from "vue-lodash";
import lodash from "lodash";
import "./filters";

Vue.use(ViewUI, { locale });
Vue.use(VueLodash, { lodash: lodash });
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    setInterval(() => this.$store.commit("trigger_auto_refresh"), 100);
  }
}).$mount("#app");
