<template>
  <div class="login" :style="style">
      <router-link to="/" class="logo iconfont">&#xe60a;</router-link>
      <form class="login_form">
        <mt-field class="form_row" label="账号" v-model="loginData.login"></mt-field>
        <mt-field class="form_row" label="密码" type="password" v-model="loginData.password"></mt-field>
      </form>
      <div class="btns">
        <a href="#" class="login_submit" @click.stop.prevent="login">登录</a>
        <router-link to="/" class="reset_password">找回密码</router-link>
        <router-link to="/reg" class="reg">注册</router-link>
      </div>
  </div>
</template>

<script>
import { Field, Toast } from "mint-ui";
import ajax from "@/public/src/ajax";
import validator from "async-validator";
export default {
  name: "login",
  components: { [Field.name]: Field },
  data() {
    this.$root.is_foundation = false;
    return {
      validator: new validator({
        login: {
          required: true,
          message: "账号不能为空！"
        },
        password: {
          required: true,
          message: "密码不能为空！"
        }
      }),
      style: {
        height: `${document.documentElement.clientHeight}px`
      },
      loginData: {
        login: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.validator.validate(this.loginData, { first: true }, errors => {
        if (errors) {
          Toast(errors[0].message);
          return;
        }
        this.login_submit();
      });
    },
    login_submit() {
      ajax({
        url: "/login",
        method: "post",
        data: this.loginData
      }).then(
        data => {
          if (!data.biz_action) {
            Toast("登录成功，跳转中...");
            login_data.Auth_Token = data.data.authenticate_token;
            // setTimeout(() => {
            //   window.document.location.replace("/login");
            // }, 3000);
          } else {
            Toast(data.msg || "系统繁忙，请稍后再试！");
          }
        },
        e => {
          Toast("系统繁忙，请稍后再试！");
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  background: #fff;
  .logo {
    display: block;
    max-width: 3rem;
    margin: 0 auto;
    padding: 1rem 0;
    font-size: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    color: #13d1be;
  }
  .login_form {
    width: 6rem;
    margin: 0 auto;
    overflow: hidden;
    .form_row {
      margin: -1px 0 0.2rem 0;
    }
    .mint-field .mint-cell-title {
      width: 1rem;
    }
  }
  .btns {
    width: 6rem;
    margin: 1rem auto 0 auto;
    .login_submit {
      display: block;
      background: #13d1be;
      padding: 0.2rem 0;
      color: #fff;
      text-align: center;
    }
    .reset_password,
    .reg {
      padding: 0.2rem 0;
      display: inline-block;
    }
    .reg {
      float: right;
    }
  }
}
</style>