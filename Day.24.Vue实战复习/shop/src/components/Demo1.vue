<template>
    <div>
        <!-- Demo12: 通过关键贞(自定义动画)实现动画 -->
        <button @click="flag = !flag">切换</button>
        <p></p>
        <transition name="xxx">
            <img :src="pic" v-if="flag" alt="">
        </transition>
    </div>
</template>
<script>
import pic from "@/assets/logo.png"
export default {
    name:"Demo01",
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
    .xxx-enter-active{
        animation: bounce .2s;
    }
    .xxx-leave-active{
        animation: bounce .2s reverse;
    }
    @keyframes bounce{
            0%{
                transform: scale(0);
            }
            25%{
                transform: scale(0.2);
            }
            50%{
                transform: scale(0.4);
            }
            75%{
                transform: scale(0.6);
            }
            100%{
                transform: scale(1);
            }
        }
</style>