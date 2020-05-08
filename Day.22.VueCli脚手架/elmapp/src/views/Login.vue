<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/logo.jpg" alt />
    </div>
    <!-- 手机号 -->
    <InputGroup
      type="number"
      placehoder="手机号"
      v-model="phone"
      :btnTitle="btnTitle"
      :disabled="disabled"
      :error="errors.phone"
      @btnClick="getVerifyCode"
    ></InputGroup>

    <!-- 验证码 -->
    <InputGroup 
    type="number" 
    placehoder="验证码" 
    v-model="verifyCode" 
    :error="errors.code"
    ></InputGroup>

    <!-- 协议 -->
    <div class="login_des">
      <p>
        新用户登录即自动注册，表示已同意
        <span>《用户服务协议》</span>
      </p>
    </div>

    <!-- 登录按钮 -->
    <div class="login_btn">
      <button :disabled="isClick" @click="handleLogin">登录</button>
    </div>
  </div>
</template>
<script>
import InputGroup from "../components/InputGroup";
export default {
  name: "login",
  data() {
    return {
      phone: "",
      verifyCode: "",
      btnTitle: "获取验证码",
      disabled: false,
      errors: {}
    };
  },
  computed: {
    isClick() {
      if (!this.phone || !this.verifyCode) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch:{
    phone(){
      console.log(this.phone)
    },
    verifyCode(){
      console.log(this.verifyCode)
    }
  },
  methods: {
    // 验证手机号是否合法
    validatePhone() {
      if (!this.phone) {
        // 手机号是空
        this.errors = {
          phone: "手机号不能为空"
        };
        return false;
      } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
        // 手机号不合法
        this.errors = {
          phone: "手机号不合法"
        };
        return false;
      } else {
        this.errors = {};
        return true;
      }
    },
    // 获取验证码
    getVerifyCode() {
      if (this.validatePhone()) {
        // 开始倒计时
        this.validateBtn();
        // console.log("发出获取验证码的请求....")
        // 利用 axios 向后端发起一个请求  appkey...
        this.$axios
          .post("/api/posts/sms_send", {
            tpl_id: "213287",
            key: "7054228aa4b52bb537ab461e46a48769",
            phone: this.phone
          })
          .then(res => {
            console.log(res);
          });
      }
    },
    // 倒计时
    validateBtn() {
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.btnTitle = "获取验证码";
          this.disabled = false;
        } else {
          this.btnTitle = time + "秒后重试";
          this.disabled = true;
          time--;
        }
      }, 1000);
    },
    // 实现登录逻辑
    handleLogin() {
      const this1 = this;
      this.errors = {}; // 表示取消错误提醒
      this.$axios.post("/api/posts/sms_back", {
          phone: this.phone,
          code: this.verifyCode
        })
        .then(res => {
          // 表示你输入的验证码是OK的
          localStorage.setItem("ele_login", true); // 如果OK，存储登录成功标志
          console.log("???????")
          console.log(this1.$router)
          this1.$router.push("/")
          .catch(err=>{
            console.log(err)
          });
        })
        .catch(err => {
          this.errors = {
            code: err.response.data.msg
          };
          console.log(err);
        });
    }
  },
  components: {
    InputGroup
  }
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
}

.logo {
  text-align: center;
}
.logo img {
  width: 150px;
}
.text_group,
.login_des,
.login_btn {
  margin-top: 20px;
}
.login_des {
  color: #aaa;
  line-height: 22px;
}
.login_des span {
  color: #4d90fe;
}
.login_btn button {
  width: 100%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}
.login_btn button[disabled] {
  background-color: #8bda81;
}
</style>
