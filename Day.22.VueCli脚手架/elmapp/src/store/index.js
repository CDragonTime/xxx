import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 定义操作状态的类型
let types = {
  SET_LOCATION:"SET_LOCATION",
  SET_ADDRESS:"SET_ADDRESS"
}
let state = {
  location:{}, // num:0  +1  -1   this.$store.state.location   mapState
  address:""
}
let getters = {  // this.$store.getters.location  有人喜欢通过getters来获取状态  mapGetters
  // location(state){
  //   return state.location
  // }
  location:state=>state.location,
  address:state=>state.address,
}
let mutations = {
  [types.SET_LOCATION](state,location){  // add()
    if(location){
      state.location = location;
    }else{
      state.location = null;  // null表示把一个对象制为空
    }
  },
  [types.SET_ADDRESS](state,address){  
    if(address){
      state.address = address;
    }else{
      state.address = "";  
    }
  }
}
let actions = {   // setLcoation()
  setLocation({commit},location){
    commit(types.SET_LOCATION,location)
  },
  setAddress({commit},address){
    commit(types.SET_ADDRESS,address)
  }
}


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
