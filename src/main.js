import Vue from 'vue'
import App from './App.vue'
import tui from '../src/components/index';
import '../src/assets/styles/tt-ui.css';
Vue.use(tui);
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
