import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import dashboard from "../views/dashboard/Dashboard.vue"
import home from "../views/home/Home.vue"
import BuyShop from "../views/cart/BuyShop.vue"
import AddAddress from "../views/cart/AddAddress.vue"
import Order from "../views/cart/Order.vue"
import UserCenter from "../views/mine/user/UserCenter.vue"
import Mine from "../views/mine/Mine.vue"
import Login from "../views/login/Login.vue"
import GoodsDetail from "../views/cart/GoodsDetail.vue"

// ES中的懒加载不起作用
// const HelloWorld = ()=>import("@/components/HelloWorld")
// const Cart= ()=>import("../views/cart/Cart.vue")
// const Category= ()=>import("../views/category/Category.vue")
// const Mine= ()=>import("../views/mine/Mine.vue")
// const Home= ()=>import("../views/home/Home.vue")
// ES中提出的的懒加载
// const HelloWorld = ()=>import("@/components/HelloWorld")
// 组件中的懒加载
// component: resolve=>(require(["@/components/HelloWorld"],resolve))

const routes = [
  {
    path: '/',
    redirect: "/dashboard"
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
    children: [
      { path: "/", redirect: "/dashboard/home" },
      { path: "home", name: "home", component: home, meta: { "needKeepAlive": true } },
      { path: "cart", name: "cart", component: resolve => (require(["../views/cart/Cart.vue"], resolve)) },
      { path: "category", name: "category", component: resolve => (require(["../views/category/Category.vue"], resolve)), meta: { "needKeepAlive": true } },
      {
        path: "mine", name: "mine", component: Mine, 
        children: [
          { path: "userCenter",component:UserCenter}]}
    ]
  },
  {
    path: '/buyShop',
    name: 'buyShop',
    component: BuyShop
  },
  {
    path: '/addAddress',
    name: 'addAddress',
    component: AddAddress
  },
  {
    path: '/order',
    name: 'order',
    component: Order
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/goodsDetail',
    name: 'goodsDetail',
    component: GoodsDetail
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
