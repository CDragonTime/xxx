<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="axiosGet()">这是一个测试跨域按钮</button>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    axiosGet(){
      // alert("????")
      this.$axios.get("/api/test")
      .then((response)=>{
        console.log(response.data)
      })
      .catch(()=>{
        alert("请求错误")
      })
    }
  }
}
</script>