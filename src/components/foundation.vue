<template>
  <div class="foundation">
    <router-link to="/">
        <span class="iconfont">&#xe601;</span>
        任务
    </router-link>
    <router-link to="/post" class="post">
        <span class="iconfont">&#xe604;</span>
        发布
    </router-link>
    <router-link to="/my">
        <span class="iconfont">&#xe64b;</span>
        我
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Foundation",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>
<style lang="scss" scoped>
.foundation {
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 1rem;
  line-height: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: #13d1be;
  a {
    flex-grow: 1;
    text-align: center;
    font-size: 0.28rem;
    color: #fff;
    position: relative;
    .iconfont {
      display: inline-block;
      vertical-align: bottom;
    }
    &.post {
      border-left: 1px solid #fff;
      border-right: 1px solid #fff;
      .iconfont {
        position: absolute;
        top: calc((50% - 0.15rem) * -1);
        width: 0.7rem;
        height: 0.7rem;
        font-size: 0.6rem;
        text-align: center;
        left: calc(50% - 0.35rem);
        line-height: 0.7rem;
        border-radius: 0.6rem;
        background: #13d1be;
      }
    }
  }
}
</style>
