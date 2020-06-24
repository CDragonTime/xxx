<template>
  <div id="app">
    <div id="nav">
      <HelloWorld></HelloWorld>
      <Demo1></Demo1>
    </div>
    <router-view/>
  </div>
</template>
<script>
import HelloWorld from "./components/HelloWorld"
import Demo1 from "./components/Demo1"
export default {
  data(){
    return{

    }
  },
  methods:{

  },
  computed:{

  },
  components:{
    HelloWorld,
    Demo1
  }
}
</script>

<style>
</style>
