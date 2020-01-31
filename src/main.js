import Vue from 'vue'
import App from './App.vue'

import router from './router';

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueAxios, axios)
Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
