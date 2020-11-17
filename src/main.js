import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import router from './router';
import Vuelidate from "vuelidate";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

Vue.config.productionTip = false;

Vue.use(Vuelidate); 

Vue.filter("currency", (value) => new Intl.NumberFormat("en-US",
 { style: "currency", currency: "USD" }).format(value));

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
