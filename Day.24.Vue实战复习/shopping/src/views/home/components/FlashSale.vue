<template>
  <div class="flashWrapper">
    <div class="titleWrapper">
      <div class="title">限时抢购</div>
      <span class="actionStateText">07:00场</span>
      <div class="actionStateTextEnd">已结束</div>
      <span class="more">更多</span>
    </div>
    <div class="itemsWrapper">
      <div
        class="wrapper"
        data-index="3"
        v-for="(item,index) in flash_sale_product_list"
        :key="item.id"
      >
        <div class="itemWrapper">
          <div class="imageWrapper">
            <img class="image" :src="item.small_image" alt="广告图片" />
          </div>
          <div>
            <div class="name">{{item.name}}</div>
            <div class="originPrice">￥{{item.origin_price}}</div>
            <div class="priceWrapper">
              <div class="price">
                ￥
                <span class="f28">{{item.price}}</span>
              </div>
              <div class="iconCartWrapper" @click="addCart(item)">
                <svg viewBox="0 0 52 52" class="icon icon-60">
                  <defs>
                    <radialGradient
                      cx="27.0288363%"
                      cy="10.3693483%"
                      fx="27.0288363%"
                      fy="10.3693483%"
                      r="93.8427229%"
                      id="radialGradient-1"
                    >
                      <stop stop-color="#4ECA75" offset="0%" />
                      <stop stop-color="#39B460" offset="100%" />
                    </radialGradient>
                  </defs>
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(-678.000000, -2742.000000)">
                      <g transform="translate(678.000000, 2742.000000)">
                        <rect
                          fill="url(#radialGradient-1)"
                          x="0"
                          y="0"
                          width="51.8699976"
                          height="51.8699976"
                          rx="25.9349988"
                        />
                        <path
                          fill="#FFFFFF"
                          d="M20.3666667,39 C19.1700497,39 18.2,38.0299503 18.2,36.8333333 C18.2,35.6367164 19.1700497,34.6666667 20.3666667,34.6666667 C21.5632836,34.6666667 22.5333333,35.6367164 22.5333333,36.8333333 C22.5333333,38.0299503 21.5632836,39 20.3666667,39 Z M33.3666667,38.1333333 C32.1700497,38.1333333 31.2,37.1632836 31.2,35.9666667 C31.2,34.7700497 32.1700497,33.8 33.3666667,33.8 C34.5632836,33.8 35.5333333,34.7700497 35.5333333,35.9666667 C35.5333333,37.1632836 34.5632836,38.1333333 33.3666667,38.1333333 Z"
                        />
                        <path
                          stroke="#FFFFFF"
                          stroke-width="2.6"
                          stroke-linecap="round"
                          d="M12.1333333,13.8666667 L13.6768756,13.8666667 C15.4621209,13.8666667 16.9554584,15.222463 17.1274221,16.9994069 L18.2224287,28.314386 C18.4068512,30.2200702 20.1012175,31.6154285 22.0069016,31.431006 C22.0111286,31.4305969 22.0153548,31.4301801 22.0195802,31.4297555 L33.2997819,30.296256 C34.7947282,30.1460352 36.0227397,29.0499108 36.3411182,27.581556 L37.8958814,20.4110205 C38.0987345,19.4754663 37.5047629,18.5526049 36.5692087,18.3497518 C36.3853963,18.3098964 36.1963225,18.3002236 36.0094025,18.3211126 L22.8968424,19.7864909"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pubsub from "pubsub-js"
export default {
  data() {
    return {};
  },
  props: {
    flash_sale_product_list: Array
  },
  methods: {
    // 添加购物车
    addCart(item) {
      // alert("???????");
      Pubsub.publish("addToCart", item);
    }
  }
};
</script>

<style scoped>
.flashWrapper {
  position: relative;
  margin-top: 0.625rem;
  padding: 1.25rem 0 0.9375rem 0;
  background: white;
}

.titleWrapper {
  position: relative;
  margin: 0 0.625rem 0.625rem 0.625rem;
  height: 1.5625rem;
}

.title {
  display: inline-block;
  border-left: 4px #3cb963 solid;
  padding-left: 0.3125rem;
  height: 1.3125rem;
  line-height: 1.3125rem;
  vertical-align: middle;
  font-size: 1.1875rem;
}

.actionStateText {
  display: inline-block;
  vertical-align: middle;
  line-height: 0.875rem;
  font-size: 0.875rem;
  border-radius: 3px;
  padding: 0.15625rem;
  /*border: 1px solid #FE3824;*/
  color: #fe3824;
  margin-left: 0.3125rem;
}

.actionStateTextEnd {
  display: inline-block;
  vertical-align: middle;
  line-height: 0.875rem;
  font-size: 0.875rem;
  border-radius: 3px;
  padding: 0.15625rem;
  border: 1px solid #999;
  color: #666;
  margin-left: 0.3125rem;
}

.more {
  position: absolute;
  top: 0;
  right: 0;
  height: 1.5625rem;
  line-height: 1.5625rem;
  font-size: 0.875rem;
  color: #2eb257;
}

.itemsWrapper {
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
  /* justify-content:center */
}

.itemsWrapper::-webkit-scrollbar {
  display: none;
}

.wrapper {
  display: inline-block;
  padding: 0 0.3125rem;
  margin: 0 0.5rem;
  white-space: normal;
  width: 28%;
}

@media screen and (min-width: 0px) and (max-width: 320px) {
  .itemWrapper {
    width: 33%;
  }
}

.imageWrapper {
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
  margin-bottom: 0.625rem;
  position: relative;
}
.image {
  width: 100%;
  height: auto;
  display: block;
}
.name {
  margin-bottom: 0.625rem;
  height: 2.5rem;
  line-height: 1.25rem;
  font-size: 0.8125rem;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.originPrice {
  margin-bottom: 0.3125rem;
  font-size: 0.6875rem;
  color: #999999;
  text-decoration: line-through;
}
.noticeSoldOut span {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  display: inline-block;
  width: 60%;
  text-align: center;
  color: #fff;
  font-size: 0.75rem;
  height: 1.25rem;
  line-height: 1.25rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 1.25rem;
}

.priceWrapper {
  position: relative;
}

.price {
  height: 1.875rem;
  line-height: 1.875rem;
  font-size: 0.6875rem;
  color: #fe6263;
}

.iconCartWrapper {
  position: absolute;
  top: 0;
  right: 0rem;
  width: 1.875rem;
}
</style>