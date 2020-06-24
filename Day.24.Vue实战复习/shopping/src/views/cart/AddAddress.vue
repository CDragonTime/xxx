<template>
  <div>
    <van-nav-bar title="地址编辑" left-text="返回" left-arrow @click-left="$router.go('-1')" />
    <van-address-edit
      :address-info="initAddress"
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapState, mapMutations } from "vuex";
// 需要导入文件
import { getLocation } from "../../assets/location";
import areaList from "../../assets/address";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      city: {},
      initAddress: {}
    };
  },
  created() {
    // 获取定位
    getLocation();
  },
  // content接受表单对象
  /*       addressDetail: "请问"
                areaCode: "110101"
                city: "北京市"
                country: ""
                county: "东城区"
                isDefault: false
                name: "擦"
                postalCode: "123432"
                province: "北京市"
                tel: "15384984564" */
  methods: {
    ...mapMutations(["ADD_USER","UPDATE_USER"]),
    onSave(content) {
      if (this.$route.params.item) {
        content.address =
          content.province +
          content.city +
          content.county +
          content.addressDetail;
        // console.log(content)
        let userAddress = content;
        this.UPDATE_USER(userAddress);
        Toast("编辑成功");
        this.$router.go(-1);
      } else {
        content.address =
          content.province +
          content.city +
          content.county +
          content.addressDetail;
        // console.log(content)
        let userAddress = content;
        this.ADD_USER(userAddress);
        Toast("保存成功");
        this.$router.go(-1);
      }
    },
    onDelete(content) {
      Toast("清空成功");
    },
    init() {
      // 初始化地址选择器
      this.areaList = areaList.areaList; // 初始化选择器数据
      // 初始化复选框
      this.allMajor = this.getMajor();
    },
    show() {
      this.flag = true;
    }
  },
  mounted() {
    if (this.$route.params.item) {
      // console.log(this.$route.params.item)
      // 通过$router进行组件跳转的传值
      this.initAddress = this.$route.params.item;
      // console.log(this.initAddress);
    }
  }
};
</script>