<template>
  <div id="cart" v-if="userInfo.token">
    <!--头部区域-->
    <!-- <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />-->
    <van-nav-bar :title="getUsername">
      <template #right>
        <p style="color:red;line-height:20px" @click="clear()">清空</p>
        <van-icon name="clear" size="20" color="red" @click="clear()" />
      </template>
    </van-nav-bar>
    <div class="contentWrapper">
      <!--中间内容-->
      <main class="contentWrapperList">
        <section>
          <div class="shopCartListCon" v-for="(item,index) in shopCart" :key="index">
            <div class="left">
              <a
                href="javascript:;"
                class="cartCheckBox"
                :checked="item.checked"
                @click="CHANGE_CHECK_GOODS(item.id)"
              ></a>
            </div>
            <div class="center">
              <img :src="item.small_image" alt="???" />
            </div>
            <div class="right">
              <a href="#">{{item.name}}</a>
              <div class="bottomContent">
                <p class="shopPrice">${{item.price}}</p>
                <div class="shopDeal">
                  <span @click="reduceShop(item.id,item.num)">-</span>
                  <input disabled type="number" :value="item.num" />
                  <span @click="addShop(item.id)">+</span>
                </div>
              </div>
            </div>
          </div>
          <!--           <van-image
            width="21rem"
            height="28rem"
            fit="fill"
            src="../../images/tabbar/shop.png"
            v-if="shopCart=={}"
            style="backgroundColor:rgb(245,245,245)"
          />-->
        </section>
      </main>
      <!--底部通栏-->
      <div class="tabBar">
        <div class="tabBarLeft">
          <a href="javascript:;" class="cartCheckBox" @click="selectAll()" :checked="allSelect"></a>
          <span style="font-size: 16px;">全选</span>
          <div class="selectAll">
            合计：
            <span class="totalPrice">${{getAllMoney}}</span>
          </div>
        </div>
        <div class="tabBarRight">
          <!-- 可以尝试使用三元运算符 -->
          <a href="javascript:;" class="pay" @click="buyShop()">去结算({{getShopKind}})</a>
        </div>
      </div>
    </div>
    <!-- <van-icon name="shopping-cart" v-if="goodsData != {}"/> -->
  </div>
  <SelectLogin v-else />
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { Icon, Dialog, Image, Toast } from "vant";
import SelectLogin from "./../../views/login/SelectLogin";
import {
  changeCartNum,
  clearAllCart,
} from "../../service/api/index";
export default {
  name: "Cart",
  data() {
    return {
      username: "··"
    };
  },
  components: {
    SelectLogin
  },
  computed: {
    ...mapState(["shopCart", "userInfo"]),
    // 得到所有的钱
    getAllMoney() {
      let numAll = 0;
      // Object.values()返回的是对象中所有的值的数组
      Object.values(this.shopCart).forEach(item => {
        if (item.checked) {
          numAll += item.num * item.price;
        }
      });
      // 记得配置全局的过滤器
      return numAll.toFixed(2);
    },
    getShopKind() {
      let num = 0;
      Object.values(this.shopCart).forEach(item => {
        if (item.checked) {
          num++;
        }
      });
      return num;
    },
    allSelect() {
      let allSelect = true;
      Object.values(this.shopCart).forEach(item => {
        if (!item.checked) {
          allSelect = false;
          return allSelect;
        }
      });
      return allSelect;
    },
    getUsername() {
      return this.username + "的购物车";
    }
  },
  // 记得映射的方法加上双引号,直接使用中括号把所有有的都包起来
  methods: {
    ...mapMutations([
      "FIND_GOODS",
      "REMOVE_GOODS",
      "ADDNUM_GOODS",
      "CHANGE_CHECK_GOODS",
      "DELETE_GOODS"
    ]),
    async reduceShop(goodsId, num) {
      let this1 = this;
      if (num > 1) {
        let result = await changeCartNum(
          this1.userInfo.token,
          goodsId,
          "reduce"
        );
        if (result.success_code === 200) {
          this1.REMOVE_GOODS({ goodsId });
        } else {
          Toast({
            message: "出了点小问题，可能网络不给力~",
            duration: 500
          });
        }
      } else if (num === 1) {
        Dialog.confirm({
          title: "【温馨提示】",
          message: "您确定要移除对应的商品吗？"
        })
          .then(async () => {
            let result = await changeCartNum(
              this.userInfo.token,
              goodsId,
              "reduce"
            );
            if (result.success_code === 200) {
              this.REMOVE_GOODS({ goodsId });
            } else {
              // 表示服务器端购物车列表并没有成功减1
              Toast({
                message: "出了点小问题，可能网络不给力~",
                duration: 500
              });
            }
          })
          .catch(() => {});
      }
    },
    async addShop(goodsId) {
      let result = await changeCartNum(this.userInfo.token, goodsId, "add");
      if (result.success_code === 200) {
        this.ADDNUM_GOODS({ goodsId });
      } else {
        Toast({ message: "添加失败，请检查你的网络~", duration: 1200 });
      }
    },
    selectAll() {
      if (this.allSelect) {
        Object.values(this.shopCart).forEach(item => {
          item.checked = false;
        });
      } else {
        Object.values(this.shopCart).forEach(item => {
          item.checked = true;
        });
      }
    },
    clear() {
      let this1 = this;
      Dialog.confirm({
        title: "温馨提示",
        message: "您确定要清空购物车吗？"
      })
        .then(async () => {
          let result = await clearAllCart(this1.userInfo.token);
          if (result.success_code === 200) {
            this1.DELETE_GOODS();
          }else{
            Toast({
              message:"清空失败，可能长得丑",
              duration:1200
            })
          }
        })
    },
    buyShop() {
      if (this.getAllMoney != 0) {
        this.$router.push("/order");
      } else {
        Toast("请选择至少一样商品");
      }
    }
  }

  /*   mounted() {
    if (this.FIND_GOODS) {
      this.goodsData = this.FIND_GOODS;
      console.log(this.FIND_GOODS())
    }else{}
  } */
};
</script>

<style lang="less" scoped>
#cart {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.titleWrapper {
  width: 100%;
  height: 2rem;
  background: #fff;
  -webkit-background-size: 0.1rem 4.4rem;
  background-size: 0.1rem 4.4rem;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;

  display: flex;
  justify-content: center;
  align-items: center;
}

.contentWrapper {
  padding-top: 1rem;
}

/*列表内容*/
.contentWrapperList {
  padding-bottom: 6rem;
}

.contentWrapperList section {
  background-color: #fff;
}

.cartCheckBox {
  background: url("./images/shop-icon.png") no-repeat;
  -webkit-background-size: 2.5rem 5rem;
  background-size: 2.5rem 5rem;
  width: 1rem;
  height: 1rem;
}

.cartCheckBox[checked] {
  background-position: -1.2rem 0;
}

.shopCartListCon {
  display: flex;
  height: 6rem;
  border-bottom: 0.01rem solid #e0e0e0;
  margin-bottom: 0.7rem;
  padding: 0.5rem 0;
}

.shopCartListCon .left {
  /*background: purple;*/
  flex: 1;
  display: flex;
  /*justify-content: center;*/
}

.shopCartListCon .left a {
  display: inline-block;
  margin-top: 0.8rem;
  margin-left: 0.5rem;
}

.shopCartListCon .center {
  /*background: blue;*/
  flex: 3;
}

.shopCartListCon .center img {
  width: 100%;
  height: 100%;
}

.shopCartListCon .right {
  /*background: orangered;*/
  flex: 6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  position: relative;
}

.shopCartListCon .right a {
  height: 2.2rem;
  line-height: 1.2rem;
  overflow: hidden;
  margin-bottom: 0.3rem;
  font-size: 0.8rem;
  color: #000;
}

.shopCartListCon .bottomContent {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.shopCartListCon .bottomContent .shopPrice {
  font-size: 0.8rem;
}

.shopCartListCon .right .shopDeal span {
  display: inline-block;
  width: 1rem;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  float: left;
}

.shopCartListCon .right .shopDeal input {
  float: left;
  width: 2rem;
  height: 1.2rem;
  text-align: center;
  margin: 0 0.2rem;
  font-size: 0.8rem;
}

/*底部通栏*/
.tabBar {
  position: fixed;
  left: 0;
  bottom: 2.7rem;
  width: 100%;
  height: 2.5rem;
  background-color: #fff;

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 0.01rem solid #e0e0e0;
}

.tabBarLeft {
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
}

.tabBarLeft .selectAll {
  margin-left: 1rem;
  font-size: 1rem;
}

.totalPrice {
  color: #e9232c;
}

.tabBarRight .pay {
  width: 5rem;
  height: 2rem;
  background-color: #e9232c;
  border-radius: 1rem;
  margin-right: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: #fff;
}
</style>