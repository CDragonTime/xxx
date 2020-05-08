<template>
    <div id="text_group">
        <div class="input_group" :class="{'is-invalid':error}">
            <input 
                :type="type"
                :value="value"
                :placeholder="placeholder"
                @input="f1"
            >
            <button v-if="btnTitle" :disabled="disabled" @click="$emit('btnClick')">{{btnTitle}}</button>
        </div>
<!-- 错误提醒 -->
        <div class="invalid-feedback">{{error}}</div>
    </div>
</template>
<script>
export default {
    name:"inputGroup",
    props:{
        type:{type:String,default:"text"},
        value:String,
        placeholder:String,
        disabled:Boolean,
        error:String,
        btnTitle:String
    },
    methods:{
      // getCode(){
      //   // 触发父组件中的自定义事件
      //   this.$emit("btnClick")
      // }
      f1($event){
        // console.log($event.target.value)
        this.$emit('input',$event.target.value)
      }
    }
}
</script>

<style scoped>
.input_group {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
}
.input_group input {
  height: 100%;
  width: 60%;
  outline: none;
  border: 0;
}
.input_group button {
  border: none;
  outline: none;
  background: #fff;
}
.input_group button[disabled] {
  color: rgb(16, 115, 230);
}
.is-invalid {
  border: 1px solid red;
}
.invalid-feedback {
  color: red;
  padding-top: 5px;
}
</style>
