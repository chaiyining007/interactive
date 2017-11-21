<template>
  <div class="login" :style="style">
      <router-link to="/" class="logo iconfont">&#xe60a;</router-link>
      <form class="login_form">
        <mt-field class="form_row" label="账号"></mt-field>
        <mt-field class="form_row" label="密码" type="password"></mt-field>
      </form>
      <div class="btns">
        <a href="#" class="login_submit">登录</a>
        <router-link to="/" class="reset_password">找回密码</router-link>
        <router-link to="/reg" class="reg">注册</router-link>
      </div>
  </div>
</template>

<script>
import { Field, Cell } from "mint-ui";
export default {
  name: "login",
  components: { [Field.name]: Field },
  data() {
    this.$root.is_foundation = false;
    return {
      style: {
        height: `${document.documentElement.clientHeight}px`
      }
    };
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