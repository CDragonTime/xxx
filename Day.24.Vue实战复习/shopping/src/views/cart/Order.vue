<template>
  <div>
    <van-nav-bar title="填写订单" left-arrow @click-left="$router.push('/dashboard/cart')" />
    <div @click="$router.push('/buyShop')">
      <van-contact-card :type="type" :editable="false" :name="name" :tel="tel" is-link />
    </div>
    <van-cell-group title=" ">
      <van-cell title="预计送达时间" :value="getNowFormatDate" />
      <van-cell
        @click="$router.push('/goodsDetail')"
        :value="`共${goodsCount}件`"
        is-link
        :center="true"
      >
        <template slot="title">
          <img
            v-for="(goods,index) in imgArr"
            :key="index"
            :src="goods.small_image"
            alt
            style="width: 2rem;"
          />
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group title=" ">
      <van-cell title="支付方式" value="微信" is-link />
    </van-cell-group>
    <van-cell-group title=" ">
      <van-cell title="备注" value="备注您的要求" />
    </van-cell-group>
    <van-cell-group title=" ">
      <van-cell title="商品总金额" :value="'￥'+getAllMoney" />
    </van-cell-group>
    <van-cell-group title>
      <van-cell title="配送费" :value="'￥'+sendMoney" />
    </van-cell-group>
    <van-submit-bar :price="(sendMoney+getAllMoney)*100" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>
<script>
// import {Toast} from "vant"
import { mapMutations, mapState } from "vuex";
import { Icon, Dialog, Image, Toast } from "vant";
export default {
  name: "Cart",
  data() {
    return {
      sendMoney: 1,
      imgArr: [],
      type: "add",
      name: "添加联系人",
      tel: "",
      goodsCount: null
    };
  },
  computed: {
    ...mapState(["shopCart"]),
    // 得到所有的钱
    getAllMoney() {
      let numAll = 0;
      // Object.values()返回的是对象中所有的值的数组
      Object.values(this.shopCart).forEach(item => {
        if (item.checked) {
          numAll += item.num * item.price;
        }
      });
      // 配置全局的过滤器, 通过parseFloat得到保留两位小数后的数字字符串
      return Number.parseFloat(numAll.toFixed(2));
    },
    // 调用方法并传入一个预估时间的参数
    getNowFormatDate() {
      return this.getDateStr(7);
    }
  },
  methods: {
    ...mapMutations(["INIT_SHOP_CART"]),
    getAllShop() {
      Object.values(this.shopCart).forEach(item => {
        if (item.checked) {
          this.goodsCount += 1;
          if(this.imgArr.length < 3)this.imgArr.push(item);
        }
      });
      console.log(this.imgArr);
    },
    //获取AddDayCount天后的日期
    getDateStr(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount);
      var y = dd.getFullYear();
      var m =
        dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1; //获取当前月份的日期，不足10补0
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
      console.log(y + "-" + m + "-" + d);
      return y + "-" + m + "-" + d;
    },
    onSubmit() {
      Toast("提交成功");
    }
  },
  mounted() {
    this.getAllShop(), this.INIT_SHOP_CART();
    if (this.$route.params.item) {
      let conUser = this.$route.params.item;
      this.tel = conUser.tel;
      this.name = conUser.name;
      this.type = "edit";
      console.log(this.$route.params.item);
    }
  }
};
</script>