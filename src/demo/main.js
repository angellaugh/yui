import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/reset.css";

Vue.config.productionTip = false;

import ElementUI from "element-ui";
import "@/assets/scss/element.scss";

Vue.use(ElementUI);

import vueDesign from "../index";
Vue.use(vueDesign);

import Vuex from "vuex";
Vue.use(Vuex);
// 创建个空的sotre，挂载在vue实例中。
const store = new Vuex.Store({});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
