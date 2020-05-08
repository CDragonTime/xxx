import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'index',
    component:()=>import('../views/Index.vue')
    // children:[
    //   {path:'/home',component:HomeVue}
    // ]
  },
  {
    path: '/login',
    name: 'index',
    component: ()=>import('../views/Login.vue')
  },
  {
    path:'*',
    name:'404',
    component:()=>import('../views/404.vue')

  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  let isLogin = localStorage.ele_login ? true :false;
  if(to.path == "/login"){
    next()
  }else{
    // alert("???????")
    // isLogin ? next() : next("/login")将登录验证注释掉
    next();
  }
})
export default router
