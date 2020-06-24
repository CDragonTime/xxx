<template>
  <div class="hello">      
    <li class="todo" :class="{completed:todo.done}">
      <div class="view">
        <!-- 使用@change触发事件，@click没法触发 -->
        <input type="checkbox" @change="changeOne(todo)" :checked="todo.done"/>
        <label>{{todo.text}}</label>
        <button class="destroy" @click="deleteClearOne(todo)"></button>
      </div>
      <input type="text" class="edit" />
    </li>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    // 父组件对子组件传递参数使用props
    props:{
        todo:Object
    },
    methods:{
      ...mapMutations(["deleteClearOne","changeOne"])
    }
};
</script>
