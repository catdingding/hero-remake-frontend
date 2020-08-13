import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import ViewUI from "view-design";
import locale from "view-design/dist/locale/zh-TW";
import "view-design/dist/styles/iview.css";

Vue.use(VueAxios, axios);
Vue.use(ViewUI, { locale });
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
