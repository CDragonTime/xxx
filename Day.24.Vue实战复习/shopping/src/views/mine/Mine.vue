<template>
  <div id="mine" v-if="userInfo.token">
    <div class="header">
      <h4>我的</h4>
      <div class="user" @click="$router.push('/dashboard/mine/userCenter')">
        <img :src=personalImage alt />
        <div class="name">
          <p>{{city}}-{{name}}</p>
          <p>手机号：{{phone}}</p>
        </div>
      </div>
    </div>
    <van-cell title="我的订单" icon="bag" is-link value="查看全部订单" />
    <van-grid>
      <van-grid-item icon="cart-circle-o" text="待支付" />
      <van-grid-item icon="point-gift-o" text="待收货" />
      <van-grid-item icon="thumb-circle-o" text="待评价" />
      <van-grid-item icon="cash-back-record" text="售后/退款" />
    </van-grid>
    <div class="height"></div>
    <van-cell title="卡包" icon="card" is-link />
    <van-cell title="通知" icon="volume" is-link />
    <van-cell title="帮助与反馈" icon="column" is-link />
    <van-cell title="关于" icon="more" is-link />
    <van-cell title="设置" icon="setting" is-link />
    <router-view></router-view>
  </div>
  <SelectLogin v-else />
</template>

<script>
import { Toast } from "vant";
import { mapState } from "vuex";
import SelectLogin from "./../../views/login/SelectLogin";
import {getLocation} from "../../assets/location"
export default {
  name: "Cart",
  data(){
    return{
      name:"",
      phone:"",
      personalImage:"",
      city:"【-正在定位】-"
    }
  },
  mounted(){
    this.personalImage = this.userInfo.icon_url;
    this.phone = this.userInfo.phone;
    this.name = this.userInfo.real_name;
  },
  // 需要优化，应该刚加载手页面的时候，就确定个人的定位，然后存到vuex中便于使用
  created(){
    let that = this
    getLocation()
    .then((data)=>{
      console.dir(data)
      that.city = data.regeocode.addressComponent.province+data.regeocode.addressComponent.city
    });
  },
  methods:{

  },
  computed: {
    ...mapState(["userInfo"]),
  },
  components: {
    SelectLogin
  }
};
</script>

<style lang="less" scoped>
.height {
  height: 1rem;
}
.header {
  background-color: rgb(59, 186, 99);
  height: 8rem;
  position: relative;
}
.header h4 {
  padding-top: 0.5rem;
  text-align: center;
  color: white;
}
.header .user {
  height: 5rem;
}
.header img {
  width: 4rem;
  height: 4rem;
  margin-left: 0.5rem;
  border-radius: 2rem;
  margin-top: 1rem;
}
.header .name {
  margin-left: 1rem;
  line-height: 2rem;
  margin-top: -1rem;
  display: inline-block;
  font-size: 0.9rem;
  color: white;
}
</style>