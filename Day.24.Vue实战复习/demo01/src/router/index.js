import Vue from "vue"
import VueRouter from "vue-router"
import Index from "../components/Index.vue"

Vue.use(VueRouter)

let logined = false;

let router = new VueRouter({
    mode:'history', 
    routes:[
        {path:"/",component:Index,name:"Index"},
        {path:"/account",component:() => import('@/components/Account'),name:"account",meta:{needLogin:true}},
        {path:"/order",component:() => import('@/components/Order'),name:"order",meta:{needLogin:true}},
        {path:"/login",component:() => import('@/components/Login'),name:"login"},
        {path:"*",component:() => import('@/components/NotFound'),name:"notFound"},
    ]
})
router.beforeEach((to,from,next)=>{
    if(!logined && to.meta.needLogin){
        next("/login")
    }else{
        next()
    }
})
export default router;





























