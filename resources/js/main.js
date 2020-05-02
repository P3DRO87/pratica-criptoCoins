import Vue from "vue";
import Vueapp from "./Vueapp.vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { dollarFilter, percentFilter } from "./filter";
import { VueSpinners } from "@saeris/vue-spinners";
import Chart from "chart.js";
import Chartkick from "vue-chartkick";

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.filter("dollar", dollarFilter);
Vue.filter("percent", percentFilter);
Vue.use(VueSpinners);
Vue.use(Chartkick.use(Chart));

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const router = new VueRouter({
  routes,
});

new Vue({
  el: "#vueApp",
  render: (h) => h(Vueapp),
  store,
  router,
});
