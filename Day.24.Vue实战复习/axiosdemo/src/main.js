import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import VueAxios from 'vue-axios'

// 第一种使用方式,挂载原型链
Vue.prototype.$axios= axios
// Vue.use(axios)
// Vue.use(VueAxios,axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
