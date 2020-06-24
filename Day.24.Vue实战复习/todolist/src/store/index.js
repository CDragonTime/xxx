import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    visibility: "all",
    todo: [
      { text: "吃饭", done: false },
      { text: "吃饭", done: false },
      { text: "吃饭", done: true },
      { text: "吃饭", done: false },
      { text: "打游戏", done: true }
    ]
  },
  getters: {
    // 根据选定分类得到对应数据
    filterAllTodo(state) {
      if (state.visibility == "all") {
        return state.todo;
      } else if (state.visibility == "willDo") {
        return state.todo.filter(item => item.done == false)
      } else if (state.visibility == "done") {
        return state.todo.filter(item => item.done == true)
      }
    },
    // 得到未完成的任务总数
    unDoneNumber(state) {
      let count = 0;
      state.todo.forEach((item) => {
        if (item.done == false) {
          count++;
        }
      })
      return count;
    },
    // 得到是否全部完成
    isAllDone(state) {
      let rs = state.todo.every(item => item.done == true)
      return rs;
    }
  },
  mutations: {
    // 添加todo
    addTodo(state, txt) {
      state.todo.push({ text: txt, done: false })
      // console.log(this.state.todo)
    },
    // 改变对应的状态
    selectChange(state, change) {
      state.visibility = change;
    },
    // 删除已经做过的
    clearComplete(state) {
      // 不能加{}
      let rs = state.todo.filter(item => item.done == false)
      state.todo = rs;
    },
    // 改变状态
    ChangeAllStatus(state, flag) {
      // 不能加{}
      state.todo.forEach((item => {
        item.done = flag
      }))
    },
    deleteClearOne(state, todo) {
      let index = state.todo.findIndex(item => item === todo)
      if (index != -1) {
        state.todo.splice(index, 1)
      }
    },
    changeOne(state,todo){
      // alert(todo.done)
      // let index = state.todo.findIndex(item => item === todo)
      todo.done = !todo.done
    }
  },
  actions: {
  },
  modules: {
  }
})
