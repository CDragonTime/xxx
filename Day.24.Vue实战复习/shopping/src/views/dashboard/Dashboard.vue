<template>
  <div id="dashboard">
    <router-view v-if="!$route.meta.needKeepAlive"></router-view>
    <keep-alive>
      <router-view v-if="$route.meta.needKeepAlive" />
    </keep-alive>
    <van-tabbar v-model="active" active-color="#75a342">
      <van-tabbar-item replace to="/dashboard/home">
        <span>首页</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? home_icon.active : home_icon.normal"
        />
      </van-tabbar-item>
      <van-tabbar-item replace to="/dashboard/category">
        <span>分类</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? category_icon.active : category_icon.normal"
        />
      </van-tabbar-item>

      <van-tabbar-item replace to="/dashboard/cart" :badge="cartCount">
        <span>购物车</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? cart_icon.active : cart_icon.normal"
        />
      </van-tabbar-item>
      <!-- <van-icon name="chat-o" badge="9" /> -->
      <van-tabbar-item replace to="/dashboard/mine">
        <span>我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? mine_icon.active : mine_icon.normal"
        />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// 初始化购物车
import { Toast } from "vant";
import { mapMutations, mapState, mapActions } from "vuex";
import { addGoodsToCart,getGoodsCart } from "../../service/api/index";
import { setStore } from "../../config/global";
export default {
  name: "DashBoard",
  data() {
    return {
      // 得到时间判断是否刷新
      getReflashOrCloseTime: null,
      active: 0,
      home_icon: {
        normal: require("@/images/tabbar/home_default.png"),
        active: require("@/images/tabbar/home_selected.png")
      },
      category_icon: {
        normal: require("@/images/tabbar/category_default.png"),
        active: require("@/images/tabbar/category_selected.png")
      },
      cart_icon: {
        normal: require("@/images/tabbar/shoppingcart_default.png"),
        active: require("@/images/tabbar/shoppingcart_selected.png")
      },
      mine_icon: {
        normal: require("@/images/tabbar/mine_default.png"),
        active: require("@/images/tabbar/mine_selected.png")
      }
    };
  },
  // 解决页面刷新的问题
  created() {
    // 自动登录，进行数据的保存
    this.reqUserInfo();
    // 没有显示的原因是因为存进localStorage中的数据都变成了字符串类型的数据
    this.active = Number.parseInt(localStorage.getItem("active"));
  },
  watch: {
    active() {
      localStorage.setItem("active", this.active);
    }
  },
  destroyed() {
    window.removeEventListener("beforeunload", e => this.getReflashOrClose());
    window.addEventListener("unload", e => this.set());
  },
  mounted() {
    // 通过监听事件使得下次浏览器读取页面数据的时候图标返回到首页
    window.addEventListener("beforeunload", e => this.getReflashOrClose());
    window.addEventListener("unload", e => this.set());
    this.initShopCart(); // 获取购物车中的数据
    // 在父中订阅   使用发布订阅 可以跨级进行数据通信
    PubSub.subscribe("addToCart", (msg, goods) => {
      // 订阅好了一个公众号
      if (this.userInfo.token) {
        this.dealGoods(goods);
      } else {
        this.$router.push("./login");
      }
    });
  },
  beforeDestroy() {
    PubSub.unsubscribe("addToCart"); // 取消订阅
  },
  methods: {
    ...mapMutations(["INIT_SHOP_CART", "ADD_GOODS"]),
    ...mapActions(["reqUserInfo"]),
    async initShopCart() {
      // 从服务器获取购物车的数据
      if (this.userInfo.token) {
        // 已登录
        let result = await getGoodsCart(this.userInfo.token);
        // console.log(result); // 得到服务器返回的当前用户的购物车数据
        if (result.success_code === 200) {
          // 服务器给我们返回的数据是  [{商品信息},{商品信息},{商品信息},{商品信息},{商品信息}]
          // 但是我们购物车的数据结构是  { "001":{商品信息}, "002":{商品信息} }
          // 后端给我们返回的数据结构有时候并不是我们需要的，这是开发中经常遇到问题
          // 解决：1）后端修改成前端需要的数据结构    2）把后端返回的数据结构转化成我们需要的数据结构
          // 把一种结构转化成另一种结构
          let cartArr = result.data;
          let shopCart = {};
          cartArr.forEach(item => {
            shopCart[item.goods_id] = {
              num: item.num,
              id: item.goods_id,
              name: item.goods_name,
              small_image: item.small_image,
              price: item.goods_price,
              checked: true
            };
          });
          // console.log(shopCart)
          // 把从服务器端获取的购物车数据存储在本地
          setStore("shopCart", shopCart);
          this.INIT_SHOP_CART();
        }
      }
    },
    // 退出的时候应该设置为0
    set() {
      this._gap_time = new Date().getTime() - this.getReflashOrCloseTime;
      if (this._gap_time <= 5) {
        //如果是登录状态，关闭窗口前，移除用户
        if (this.active !== "0") {
          localStorage.setItem("active", "0");
        }
      }
    },
    getReflashOrClose() {
      this.getReflashOrCloseTime = new Date().getTime();
    },
    async dealGoods(goods) {
      let result = await addGoodsToCart(
        this.userInfo.token,
        goods.id,
        goods.name,
        goods.price,
        goods.small_image
      );
      if (result.success_code === 200) {
        this.ADD_GOODS({
          goodsId: goods.id,
          goodsName: goods.name,
          smallImage: goods.small_image,
          goodsPrice: goods.price
        });
        Toast({
          message: "添加购物车成功了~",
          duration: 800
        });
      }
    }
  },
  computed: {
    // 注意vuex映射使用的格式([a,b,c,d])
    ...mapState(["shopCart", "userInfo"]),
    cartCount() {
      console.log(this.shopCart);
      let num = 0;
      if (this.shopCart !== {}) {
        Object.values(this.shopCart).forEach(item => {
          num += item.num;
        });
      }
      return num;
    }
  }
};
</script>

<style lang="less" scoped>
#dashboard {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
</style>