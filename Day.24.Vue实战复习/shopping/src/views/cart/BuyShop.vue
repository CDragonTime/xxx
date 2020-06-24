<template>
  <div>
    <van-nav-bar
      title="请选择地址"
      left-text="返回"
      right-text="删除"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-address-list
      v-model="chosenAddressId"
      :list="lists"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @click-item="selectAddress"
    />
  </div>
</template>
<script>
import { AddressList, Toast } from "vant";
import {mapState,mapMutations} from "vuex"
export default {
  data() {
    return {
      chosenAddressId: "1",
      lists: [
      ],
      disabledList: [
        {
          id: "0",
          name: "!!!",
          tel: "1320000000",
          address: "浙江省杭州市滨江区江南大道 15 号"
        }
      ]
    };
  },
  computed:{
    ...mapState(["userList"])
  },
  mounted(){
    this.GET_USER()
    this.lists = this.userList.list
    this.lists.forEach((item)=>{
      if(item.isDefault){
        this.chosenAddressId = item.id
      }
    })
    // console.log(this.userList.list)
  },
  methods: {
    ...mapMutations(["GET_USER","DELETE_USER"]),
    onAdd() {
      this.$router.push("/addAddress")
    },
    onEdit(item, index) {
      // console.dir(item)
      this.$router.push({name:"addAddress",params:{item:item}})
      // Toast("编辑地址:");
    },
    onClickLeft() {
      this.$router.push("/order");
    },
    onClickRight() {
      this.DELETE_USER(Number.parseInt(this.chosenAddressId))
      this.GET_USER();
      this.lists = this.userList.list
      Toast('删除成功');
    },
    selectAddress(item, index){
      this.$router.push({name:"order",params:{item:item}})
    }
  }
};
</script>
