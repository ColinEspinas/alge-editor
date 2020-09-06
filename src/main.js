import Vue from 'vue';
import App from './App.vue';
import './quasar';
import VueResizeObserver from "vue-resize-observer";

Vue.use(VueResizeObserver);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
