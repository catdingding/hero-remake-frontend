import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/dark-theme/index.css";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import "./style.less";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/zh-TW";
import VueLodash from "vue-lodash";
import lodash from "lodash";
import "./filters";
import VueVirtualScroller from "vue-virtual-scroller";

import RelativeTime from "./components/RelativeTime.vue";

Vue.use(ElementUI, { locale });
Vue.use(VueLodash, { lodash: lodash });
Vue.use(VueVirtualScroller);
Vue.config.productionTip = false;

Vue.component("RelativeTime", RelativeTime);

new Vue({
  router,
  store,
  render: (h) => h(App),
  mounted() {},
}).$mount("#app");
