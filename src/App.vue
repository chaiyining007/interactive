<template>
  <div id="app">
    <router-view/>
    <Foundation></Foundation>
  </div>
</template>

<script>
import '@/public/src/base_font_size.js';
import Foundation from './components/foundation'
export default {
  name: "app",
  components:{Foundation}
};
</script>
<style>
@import "./public/sass/reset.scss";
@import "./public/iconfont/iconfont.css";
</style>
