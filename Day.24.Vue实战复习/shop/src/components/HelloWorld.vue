<template>
    <div>
        <!-- Demo13: 使用animate.css -->
        <!-- animate.css 是css动画库  https://www.dowebok.com/demo/2014/98/ -->

        <!-- 
            在vue中使用animate.css  
                1）安装 npm i animate.css 
                2）导入  
        -->
        <button @click="flag = !flag">切换</button>
        <p></p>
        <transition
            enter-active-class="animated bounceIn"
            leave-active-class="animated bounceIn"
            :duration="{enter:1000,leave:500}"
        >
            <img :src="pic" v-if="flag" alt="">
        </transition>
    </div>
</template>
<script>
import pic from "@/assets/logo.png"
import animate from 'animate.css'
export default {
    name:"HelloWorld",
    data(){
        return{
          pic:pic,
          flag:true
        }
    },
    computed: {
    },
    methods: {
     
    }
}
</script>
<style scoped>
  
</style>