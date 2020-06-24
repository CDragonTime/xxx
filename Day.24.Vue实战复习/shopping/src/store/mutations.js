import { setStore, getStore,removeStore } from "../config/global"

import {
    ADD_GOODS,
    FIND_GOODS,
    INIT_SHOP_CART,
    REMOVE_GOODS,
    ADDNUM_GOODS,
    CHANGE_CHECK_GOODS,
    DELETE_GOODS,

    ADD_USER,
    GET_USER,
    DELETE_USER,
    UPDATE_USER,

    USER_INFO,
    INIT_USER_INFO,
    RESET_USER_INFO,
    CLEAR_CART
} from "./mutations-type"

export default {
    // 从其他页面添加商品
    [ADD_GOODS](state, { goodsId, goodsName, smallImage, goodsPrice }) {
        let shopCart = state.shopCart;
        if (shopCart[goodsId]) {
            // 存在
            shopCart[goodsId]['num']++;
        } else {
            shopCart[goodsId] = {
                'num': 1,
                'id': goodsId,
                'name': goodsName,
                'small_image': smallImage,
                'price': goodsPrice,
                'checked': true
            }
        }
        // 把数据同步到state中     
        state.shopCart = { ...state.shopCart }
        // 把vuex中的商品保存到localStorage中
        setStore("shopCart", state.shopCart)
    },
    [FIND_GOODS](state) {
        return getStore("shopCart")
    },
    // 初始化购物车
    [INIT_SHOP_CART](state) {
        let initCart = getStore("shopCart");
        if (initCart) {
            state.shopCart = JSON.parse(initCart)
        }
    },
    // 减少并删除相应的商品
    [REMOVE_GOODS](state, { goodsId }) {
        // alert("???????")
        let shopCart = state.shopCart;
        // console.log(shopCart[goodsId])
        let shop = shopCart[goodsId];
        if (shop) {
            if (shop.num > 1) {
                shop['num']--;
            } else {
                delete shopCart[goodsId]
            }
        }
        // 同步vuex购物车中的数据
        state.shopCart = { ...shopCart }
        // 把新的购物车持久化本地
        setStore("shopCart", state.shopCart)
    },
    // 直接在购物车中添加商品数量
    [ADDNUM_GOODS](state, { goodsId }) {
        // alert("???????")
        let shopCart = state.shopCart;
        // console.log(shopCart[goodsId])
        let shop = shopCart[goodsId];
        shop['num']++;
        state.shopCart = shopCart
        setStore("shopCart", state.shopCart)
    },
    // 单个商品的选择
    [CHANGE_CHECK_GOODS](state, goodsId) {
        let shopCart = state.shopCart;
        let shop = shopCart[goodsId];
        shop['checked'] = !shop['checked'];
        state.shopCart = { ...shopCart }
        setStore("shopCart", state.shopCart)
    },
    [DELETE_GOODS](state) {
        state.shopCart = {};
        state.shopCart = { ...state.shopCart }
        setStore("shopCart", state.shopCart)
    },

    // -----------------执行用订单联系人的地址操作
    // 添加联系人和地址,并一刀切默认选项
    [ADD_USER](state, user) {
        let userAdd = user;
        let list = state.userList.list;
        let id = 1;
        if (list) {
            list.forEach((item) => {
                id += item.id;
            })
            if (user.isDefault) {
                list.forEach((item) => {
                    item.isDefault = false;
                })
            }
        }
        userAdd.id = id;
        state.userList.list.unshift(userAdd)
        // console.log(state)
        setStore("userList", state.userList)
    },
    // 初始化
    [GET_USER](state) {
        let initList = getStore("userList");
        if (initList) {
            state.userList = JSON.parse(initList)
        }
    },
    // 删除
    [DELETE_USER](state, id) {
        let userList = state.userList.list;
        let screenArr = userList.filter((item) => {
            return !(item.id == id)
        });
        console.log(screenArr)
        state.userList.list = screenArr
        setStore("userList", state.userList)
    },
    [UPDATE_USER](state, user) {
        if (user.isDefault) {
            state.userList.list.forEach((item) => {
                item.isDefault = false;
            })
        }
        let list = []
        state.userList.list.forEach((item) => {
            if (item.id == user.id) {
                console.log(item.id)
                console.log(user.id)
                list.unshift(user);
            } else {
                list.unshift(item)
            }
        })
        state.userList.list = list
        console.log(state.userList.list)
        setStore("userList", state.userList)
    },

    // -----------------------------------用户的登录操作
    [USER_INFO](state, { userInfo }) {
        state.userInfo = userInfo;  // 把用户信息保存到vuex中
        setStore('userInfo', state.userInfo);  // 把用户信息同步到的本地
    },
    [INIT_USER_INFO](state) {
        // 8.1 获取用户信息
        let userInfo = getStore('userInfo');
        // 8.2 判断
        if (userInfo) {
            state.userInfo = JSON.parse(userInfo);
        }
    },
    // 退出登录时把vuex中的用户信息清除掉
    [RESET_USER_INFO](state) {
        state.userInfo = {};  // 清除vuex中的用户信息
        removeStore('userInfo'); // 清除本地localstrage中的信息
    },
    // 清空购物车
    [CLEAR_CART](state) {
        state.shopCart = {};
        state.shopCart = { ...state.shopCart }
        setStore("shopCart", state.shopCart)
    },
}