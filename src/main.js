import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import vSelect from 'vue-select'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.component('v-select', vSelect);

new Vue({
  render: h => h(App),
}).$mount('#app');
