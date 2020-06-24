import Vue from 'vue'

// 1. 底部的导航
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);

// 2. Loading
import { Loading } from 'vant';
Vue.use(Loading);

//3. 图片懒加载
import { Image } from 'vant';
Vue.use(Image);

//4. 字体图标
import { Icon  } from 'vant';
Vue.use(Icon );

//5. 弹出框
import { Dialog  } from 'vant';
Vue.use(Dialog );

// 6.图片控制
import { Image as VanImage } from 'vant';
Vue.use(VanImage);

// 7.引入地址列表
import { AddressList } from 'vant';
Vue.use(AddressList);

// 8.设置头部返回
import { NavBar } from 'vant';
Vue.use(NavBar);

// 9.地址编辑
import { AddressEdit } from 'vant';
Vue.use(AddressEdit);

// 10.空状态设置
import { Empty } from 'vant';
Vue.use(Empty);

// 11.单元格
import { Cell, CellGroup } from 'vant';
Vue.use(Cell);
Vue.use(CellGroup);

// 搜索框
import { Search } from 'vant';
Vue.use(Search);

// 订单提交
import { SubmitBar } from 'vant';
Vue.use(SubmitBar);

// 宫格
import { Grid, GridItem } from 'vant';
Vue.use(Grid);
Vue.use(GridItem);

// 卡片
import { Card } from 'vant';
Vue.use(Card);

import { ContactCard, ContactList, ContactEdit } from 'vant';
Vue.use(ContactCard);
Vue.use(ContactList);
Vue.use(ContactEdit);