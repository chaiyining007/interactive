<template>
  <div class="reg" :style="style">
      <router-link to="/" class="logo iconfont">&#xe60a;</router-link>
      <form class="reg_form">
        <mt-field class="form_row" label="账号：" v-model="postData.login"></mt-field>
        <mt-field class="form_row" type="password" label="密码：" v-model="postData.password"></mt-field>
        <mt-field class="form_row" label="邀请码：" v-model="postData.invitation_code"></mt-field>
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
import validator from "async-validator";
import { encode, decode } from "libs/src/base64";
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
      postData: {
        login: "",
        password: "",
        is_random: false,
        invitation_code: ""
      }
    };
  },
  methods: {
    reg(data) {
      this.validator.validate(this.postData, { first: true }, errors => {
        if (errors) {
          Toast(errors[0].message);
          return;
        }
        this.reg_submit();
      });
    },
    reg_submit() {
      ajax({
        url: "/user",
        method: "post",
        data: this.postData
      }).then(
        data => {
          if (data.success) {
            Toast("注册成功，自动登录中...");
            login_data.Auth_Token = data.data.authenticate_token;
            setTimeout(() => {
              if (
                this.$route.query.error_code == 401 &&
                this.$route.query.success_callback_url
              ) {
                window.document.location.replace(
                  `${decode(this.$route.query.success_callback_url)}`
                );
              }
              window.document.location.replace("/");
            }, 3000);
          } else {
            Toast(data.error || "系统繁忙，请稍后再试！");
          }
        },
        e => {
          Toast("系统繁忙，请稍后再试！");
        }
      );
    },
    create() {
      this.postData.is_random = true;
      this.reg_submit(this.postData);
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