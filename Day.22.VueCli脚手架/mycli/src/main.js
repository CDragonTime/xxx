import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 模板通过#app找到根组件
new Vue({
  // 注册路由,通过路由找到index.js数据如下
  router,
  // 找到根组件的模板也就是App.vue
  render: h => h(App)
  // 指定根组件的引用，也就是在index.html中的<div id='app'></div>
}).$mount('#app')
