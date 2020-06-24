<template>
  <div id="app">
    <section class="todoapp">
      <!-- 封装成一个组件 -->
      <Header></Header>
      <section class="main" style>
        <input type="checkbox" class="toggle-all" @click="ChangeAllStatus(!isAllDone)" :checked="isAllDone"/>
        <ul class="todo-list">
          <!-- 封装成一个组件 -->
          <ListTodo
            v-for="(item,index) in filterAllTodo"
            :todo="item"
            :key="index"
          ></ListTodo>
        </ul>
      </section>
      <!-- 封装成一个组件 -->
      <footer class="footer" style>
        <span class="todo-count">
          <strong>{{unDoneNumber}}</strong> 未完成事务
        </span>
        <ul class="filters">
          <li>
            <a href :class="{selected:visibility=='all'}" @click.prevent="selectChange('all')">所有</a>
          </li>
          <li>
            <a href :class="{selected:visibility=='willDo'}" @click.prevent="selectChange('willDo')">待完成</a>
          </li>
          <li>
            <a href :class="{selected:visibility=='done'}" @click.prevent="selectChange('done')">已完成</a>
          </li>
        </ul>
        <button class="clear-completed" @click="clearComplete()">删除已完成</button>
      </footer>
    </section>
  </div>
</template>

<script>
// 引入样式
import "@/assets/todo-mvc.css";
import Header from "../src/components/Header";
import ListTodo from "../src/components/ListTodo";
import { mapGetters, mapMutations,mapState} from "vuex";
export default {
  name: "App",
  components: {
    Header,
    ListTodo
  },
  computed: {
    ...mapState(["todo","visibility"]),
    ...mapGetters(["filterAllTodo","unDoneNumber","isAllDone"])
  },
  methods: {
    ...mapMutations(["selectChange","clearComplete","ChangeAllStatus"])
  }
};
</script>

<style>
</style>
