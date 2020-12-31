import Vue from "vue";
import App from "./App.vue";

import normalize from "normalize.css";
Vue.use(normalize);

import { rtdbPlugin } from "vuefire";
Vue.use(rtdbPlugin);

new Vue({
  el: "#app",
  render: h => h(App)
});
