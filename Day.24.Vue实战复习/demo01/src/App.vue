<template>
    <div id="app">
        <router-link to="/">主页面</router-link> <span> </span>
        <router-link to="/account">我的账户</router-link>  <span> </span>
        <router-link to="/order">我的订单</router-link>  <span> </span>
        <router-link to="/login">登录</router-link>  <span> </span>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        methods:{
          
        },
        components: {
        }
    }
</script>

<style>

</style>
