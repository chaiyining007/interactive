<template>
  <div class="my">
    <span id="edit-m" class="iconfont">&#xe64b;</span>
    <p id='my-avatar'>
      <MyAvatar />
    </p>
    <div id="login-or-regist">
      <Button size="small">登录 / 注册</Button>
    </div>
    <div class='banner'>
      <div class="half half-line half-font-center">
        <p>0</p>
        <span class="gray-f">心爱奖品</span>
      </div>
      <div class="half half-font-center">
        <p>0</p>
        <span class="gray-f">任务积分</span>
      </div>
    </div>
    <div id="my-tasks">
      <div class='banner banner-title'>
        <div class='half half-font-left'>
          我的任务
        </div>
        <div class="half gray-f half-font-right">
          查看全部任务 >
        </div>
      </div>
      <div class="banner banner-body">
        <div class="half half-font-center">
          <span class="iconfont">&#xe64b;</span>
          <br />
          待开始
        </div>
        <div class="half half-font-center">
          <span class="iconfont">&#xe64b;</span>
          <br />
          进行中
        </div>
        <div class="half half-font-center">
          <span class="iconfont">&#xe64b;</span>
          <br />
          待验收
        </div>
        <div class="half half-font-center">
          <span class="iconfont">&#xe64b;</span>
          <br />
          已完成
        </div>
      </div>
      <div id="my-setting" class="banner">
        <div class="half half-font-left">
          设置
        </div>
        <div class="half half-font-right gray-f">
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyAvatar from '@/components/myAvatar.vue';
import { Button } from 'mint-ui';
export default {
  name: 'post',
  components: { MyAvatar, Button },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style lang="scss">
#my-avatar {
  margin-top: .7rem;
}
#edit-m {
  position: absolute;
  top: 0.3rem;
  left: 0.3rem;
}
#login-or-regist {
  text-align: center;
  padding: .4rem 0;
  button {
    background-color: #13d1be;
    color: #fff;
  }
}
#my-tasks {
  margin-top: .4rem;
  .banner-title {
    padding: .1rem;
    div:first-child {
      padding-left: .2rem;
    }
    div:last-child {
      padding-right: .4rem;
    }
  }
  .banner-body .half {
    padding-top: .6rem;
    padding-bottom: .3rem;
  }
}
#my-setting {
  padding: .1rem;
  margin-top: .4rem;
  .banner {
    padding: .2rem;
  }
  div:first-child {
    padding-left: .2rem;
  }
  div:last-child {
    padding-right: .4rem;
  }
}
.banner-title {
  border-bottom: 1px solid #f0f0f0;
}
.banner {
  background-color: #fff;
  display: flex;
  .half {
    flex-grow: 1;
    font-size: 0.26rem;
    padding: .12rem 0;
  }
  .gray-f {
    color: #aeaeae;
  }
  .half-font-center {
    text-align: center;
  }
  .half-font-right {
    text-align: right;
  }
  .half-font-left {
    text-align: left;
  }
  .half-line {
    border-right: 1px solid #f0f0f0;
  }
}
.my {
  border-top: 1px solid #f0f0f0;
}
</style>
