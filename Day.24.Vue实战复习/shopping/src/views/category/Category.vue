<template>
  <div id="category">
    <!-- 头部 -->
    <Header></Header>
    <!-- 分类内容 -->
    <div class="listWrapper" v-if="!showLoading">
      <!-- 左边的 -->
      <div class="leftWrapper">
        <ul class="wrapper">
          <!-- selected -->
          <li 
            v-for="(cate,index) in categoriesData" 
            :key="cate.id" 
            class="categoryItem"
            :class="{selected:currentIndex === index}"
            @click="clickLeftLi(index)"
            ref="menuList"
          >
            <span class="textWrapper">{{cate.name}}</span>
          </li>
        </ul>
      </div>
   /   <!-- 右边的 封装成一个组件 -->
      <ContentView :categoriesDetailData="categoriesDetailData"></ContentView>
    </div>
    <van-loading
      v-else
      type="spinner"
      color="#75a342"
      style="position: absolute;left:50%;top: 40%;transform: translate(-50%)"
    >正在拼命加载中…</van-loading>
  </div>
</template>

<script>
import Header from "./components/Header";
import ContentView from "./components/ContentView";
import BScroll from "better-scroll"
// 引入请求接口的方法
import {getCategories,getCategoriesdetail} from "../../service/api/index"
export default {
  name: "Category",
  data() {
    return {
      showLoading: true, // 控制loading效果
      categoriesData:[], // 左侧的数据
      categoriesDetailData:[], // 右侧的数据
      currentIndex: 0, // 当前点击的li
      leftScroll:null, // 左侧的滚动对象
    };
  },
  created(){
      this.initData();
  },
  methods:{
      async initData(){
        let leftRes = await getCategories()
        if(leftRes.success){
            this.categoriesData = leftRes.data.cate;
        }
        let rightRes = await getCategoriesdetail("/aa001")
        if(rightRes.success){
            this.categoriesDetailData = rightRes.data.cate;
        }
        // console.log(this.categoriesData)
        // console.log(this.categoriesDetailData)
        this.showLoading = false;  // 隐藏loading效果

        // 初始化滚动 
        // new BScroll(".leftWrapper");  // Can not resolve the wrapper DOM.
        // this.$nextTick  查询相关的资源  
        this.$nextTick(()=>{  // 在下一个事件环中初始化滚动
            this.leftScroll = new BScroll(".leftWrapper",{probeType:3});
        })
      },
      async clickLeftLi(index){
        this.currentIndex = index;  // 改变样式
        // 滚动到对应的位置
        let menuList = this.$refs.menuList;
        // console.log(menuList)
        let el = menuList[index]
        // console.log(el)
        // 滚动到指定的元素上
        this.leftScroll.scrollToElement(el,300)
          
        // 点击不同的li获取右侧的数据
        let rightRes = await getCategoriesdetail(`/aa00${index+1}`);
        if(rightRes.success){
            this.categoriesDetailData = rightRes.data.cate;
        }
      }
  },
  components: {
    Header,
    ContentView
  }
};
</script>
<style scoped>
    #category {
        width: 100%;
        height: 100%;
        background-color: #F5F5F5;
        overflow: hidden;
    }

    .listWrapper {
        display: flex;
        position: absolute;
        top: 2.75rem;
        bottom: 3rem;
        width: 100%;
        overflow: hidden;
    }

    .leftWrapper {
        background-color: #F4F4F4;
        width: 5.3125rem;
        flex: 0 0 5.3125rem;
    }

    .categoryItem {
        padding: 0.75rem 0;
        border-bottom: solid 1px #E8E9E8;
        position: relative;
    }

    .categoryItem .textWrapper {
        line-height: 1.25rem;
        border-left: solid 0.1875rem transparent;
        padding: 0.3125rem 0.6875rem;
        font-size: 0.8125rem;
        color: #666666;
    }

    .categoryItem.selected {
        background: #FFF;
    }

    .categoryItem.selected .textWrapper {
        border-left-color: #3cb963;
        font-weight: bold;
        font-size: 0.875rem;
        color: #333333;
    }

    @media (min-width: 960px) {
        .wrapper {
            border-right: 1px solid #E8E9E8;
        }

        .wrapper .categoryItem {
            background: #fff;
        }
    }
</style>