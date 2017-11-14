<template>
  <div id="app">
    <router-view/>
    <Foundation v-if="is_foundation" ref="foundation"></Foundation>
  </div>
</template>

<script>
import "@/public/src/base_font_size.js";
import Foundation from "./components/foundation";
export default {
  name: "app",
  props: {
    is_foundation: {
      type: Boolean,
      default: true
    }
  },
  components: { Foundation },
  methods: {}
};
</script>
<style>
@import "./public/sass/reset.scss";
@import "./public/iconfont/iconfont.css";
</style>
