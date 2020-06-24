import Vue from 'vue' 
import App from './App.vue' 
import router from "./router"

Vue.config.productionTip = false

// 路由和vuex是vue的插件  只要是插件都是需要use
// vuecli  vue-loader 工具 

// vue-router仅仅是vue的一个插件

// vue中的路由有两种模式
// 1）hash模式   url后面有一个#  hash
// 2）history模块    h5 api

// vue做的是单页面应用  spa  页面中没有内容 靠打包生成的js中替换组件  非常不利于SEO
// 如果一个项目要考虑SEO，那么不能使用传统的vue，要使用SSR，服务端渲染（ejs）

// vue中的服务端渲染也有对应的框架  https://zh.nuxtjs.org/guide/installation/

// 基本路由 
// 嵌套路由  
// 动态路由 可通过地址栏传参 /me/001  $route.params.id  前提：path:/me/:id
// 编程式路由（通过写代码进行路由的跳转） 也可以传参
//    this.$router.push({path:"/me/001"})   入栈
//    this.$router.push({name:"Me",params:{id:"002"}})  入栈
//    this.$router.go(-1)
//    this.$router.replace({path:"/login"})  替换 
// 重定向 
//   临时重定向  永久重定向   {path:"/xxx",redirect:"/"},
// 组件的复用问题时它的传参问题
//   一个路由匹配一个组件   /a  Me   /b  Me
//   如果不同的路径  匹配的组件是一样的  此时会产生组件的复用问题
//   解决：1）通过watch监控$route  2）路由钩子 beforeRouteUpdate
// 配置404
//   如果路由都匹配不到 可以走404
//   {path:"*",component:() => import('@/components/NotFound'),name:"NotFound"},
// 全局导航守卫
//   把守卫写在路由的文件中，叫全局导航守卫  router.beforeEach()  不管你访问的是哪个路由都会走beforeEach
// 路由级别的导航守卫
//   当访问一个特定的路由时才会走守卫。 是用来守卫某个特定的路由  beforeEnter
// 组件的导航守卫
//   把守卫的代码写在组件中  

// 下午安排：有一个接口  把数据渲染到页面上  tabbar
//   技术点：
//       vant  移动端UI库  https://youzan.github.io/vant/#/zh-CN/
//       swiper 轮播图  vue版本swiper 叫vue-awesome-swiper
//       rem适配    rem 
//       svg  是一个图片  不是logo.png   一堆的代码代表一个图片  美工制作的
//       对axios进行封装   你现在也可以不封装  工作中都会进行封装  
//       less 创建项目时选择less css预处理器

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

