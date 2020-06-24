import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
// 依赖的路径出现问题
import 'swiper/css/swiper.css';

// 1. 引入fastClick
import FastClick from 'fastclick'
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

// 2. 引入全局的样式
import './style/common.less'

// 3. 引入全局UI组件库-vant
import './plugins/vant'
// ---!!!!!!    使用vantUI需要在// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
/* module.exports = {
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}; */

// 4. 引入rem
import './config/rem'

// 5. 引入全局过滤器
import './config/filters'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
