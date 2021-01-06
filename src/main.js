import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/zh-TW";
import VueLodash from "vue-lodash";
import lodash from "lodash";
import "./filters";

Vue.use(ElementUI, { locale });
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
