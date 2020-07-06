import Vue from "vue";
import VueClipboards from 'vue-clipboard2';
import router from '@/router';
import store from '@/store';
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(VueClipboards);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
