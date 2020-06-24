<template>
  <div id="home">
    <div v-if="!showLoading">
      <HomeHeader></HomeHeader>
      <!--轮播图-->
      <Sowing :sowing_list="sowing_list" />
      <!--中部导航-->
      <Nav :nav_list="nav_list" />
      <!--秒杀-->
      <FlashSale :flash_sale_product_list="flash_sale_product_list" />
      <!--猜你喜欢-->
      <YouLike :you_like_product_list="you_like_product_list" />
      <!--返回顶部    传进一个方法，在子组件中触发-->
      <Mark v-if="showBackStatus" :scrollToTop="scrollToTop" />
    </div>
    <!-- 加载loading动画 -->
    <van-loading
      v-else
      type="circular"
      color="green"
      style="position: absolute;left:50%;top: 40%;transform: translate(-50%)"
    >正在拼命加载中…</van-loading>
  </div>
</template>
<script>
// 导入对应的get方法
import { getHomeData } from "../../service/api/index";
import HomeHeader from "./components/HomeHeader";
import FlashSale from "./components/FlashSale";
import Mark from "./components/Mark";
import Nav from "./components/Nav";
import YouLike from "./components/YouLike";
import Sowing from "./components/Sowing";
//引入处理返回顶部的函数
import { showBack, animate } from "@/config/global";

import { mapMutations } from "vuex"

import {Toast} from "vant"

// 引入发布订阅模块
import PubSub from "pubsub-js"; // publish（发布）  subscibe(订阅)

export default {
  data() {
    return {
      sowing_list: "",
      nav_list: "",
      flash_sale_product_list: "",
      you_like_product_list: "",
      showLoading: true,
      showBackStatus: false
    };
  },
  components: {
    HomeHeader,
    FlashSale,
    Mark,
    Nav,
    YouLike,
    Sowing
  },
  methods: {
    ...mapMutations(["ADD_GOODS"]),
    async getData() {
      let res = await getHomeData();
      if (res.success) {
        this.sowing_list = res.data.list[0].icon_list;
        this.nav_list = res.data.list[2].icon_list;
        this.flash_sale_product_list = res.data.list[3].product_list;
        this.you_like_product_list = res.data.list[12].product_list;
        // 隐藏加载动画
        this.showLoading = false;
        // 开始监听滚动, 到达一定位置就显示返回顶部按钮
        showBack(status => {
          // console.log(status);
          this.showBackStatus = status;
        });
      }
    },
    scrollToTop() {
      // 做缓动动画返回顶部
      let docB = document.documentElement || document.body;
      animate(docB, { scrollTop: "0" }, 400, "ease-out");
    }
  },

  created() {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
#home {
  width: 100%;
  height: 300rem;
  background-color: #f5f5f5;
}
</style>