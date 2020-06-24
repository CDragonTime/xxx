<template>
  <div class="hello">
    <header class="header">
      <h1>todos</h1>
      <input
        type="text"
        v-model.lazy.trim="doing"
        placeholder="你想做什么?"
        class="new-todo"
        @keyup.enter="add"
      />
      <!-- 键盘的enter事件 -->
    </header>
  </div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
  name: "Header",
  data() {
    return {
      doing: ""
    };
  },
  methods: {
    ...mapMutations(["addTodo"]),
    add() {
      this.addTodo(this.doing);
      this.doing = "";
    }
  }
};
</script>
