<template>
  <div class="reg" :style="style">
      <router-link to="/" class="logo iconfont">&#xe60a;</router-link>
      <form class="reg_form">
        <mt-field class="form_row" label="账号" v-model="postData.login"></mt-field>
        <mt-field class="form_row" type="password" label="密码" v-model="postData.password"></mt-field>
      </form>
      <div class="btns">
        <a href="#" class="reg_submit" @click.stop.prevent="reg">注册</a>
        <a href="#" class="create" @click.stop.prevent="create">快速创建</a>
        <router-link to="/login" class="to_login">返回登录</router-link>
      </div>
  </div>
</template>

<script>
import { Field, Toast } from "mint-ui";
import ajax from "@/public/src/ajax";
import login_data from "@/public/src/login_data";
if (login_data.is_login) {
  window.document.location.replace("/");
}
export default {
  name: "login",
  components: { [Field.name]: Field },
  data() {
    this.$root.is_foundation = false;
    if (login_data.is_login) {
      window.document.location.replace("/");
    }
    return {
      style: {
        height: `${document.documentElement.clientHeight}px`
      },
      postData: {
        login: "",
        password: ""
      }
    };
  },
  methods: {
    reg(data) {
      ajax({
        url: "/user",
        method: "post",
        data: this.postData
      }).then(
        data => {
          if (!data.biz_action) {
            Toast("注册成功");
            login_data.Auth_Token = data.data.authenticate_token;
            setTimeout(() => {
              window.document.location.replace("/login");
            }, 3000);
          } else {
            Toast(data.msg || "系统繁忙，请稍后再试！");
          }
        },
        e => {
          Toast("系统繁忙，请稍后再试！");
        }
      );
    },
    create() {
      this.postData.is_random = true;
      this.reg(postData);
    }
  }
};
</script>

<style lang="scss" scoped>
.reg {
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
  .reg_form {
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
    .reg_submit {
      display: block;
      background: #13d1be;
      padding: 0.2rem 0;
      color: #fff;
      text-align: center;
    }
    .to_login,
    .create {
      padding: 0.2rem 0;
      display: inline-block;
    }
    .to_login {
      float: right;
    }
  }
}
</style>