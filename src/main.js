import Vue from 'vue'
import router from "./router";
import App from './App.vue';
import store from "./store";
import i18n from "./i18n";



Vue.config.productionTip = false;



new Vue({
  router,
  store,
  i18n,

  render: (h) => h(App),
}).$mount("#app");


