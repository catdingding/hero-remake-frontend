import { createApp, h } from "vue";
import "element-plus/dist/index.css";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import "./style.less";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-tw";
import VueLodash from "vue-lodash";
import lodash from "lodash";
import filters from "./filters";
import VueVirtualScroller from "vue-virtual-scroller";

import RelativeTime from "./components/RelativeTime.vue";
import HintBlock from "./components/HintBlock.vue";
import './registerServiceWorker'

const app = createApp(App)
  .use(router)
  .use(store)
  .use(ElementPlus, { locale })
  .use(VueVirtualScroller)
  .component("RelativeTime", RelativeTime)
  .component("HintBlock", HintBlock);
app.config.globalProperties.$filters = filters;
app.mount("#app");
