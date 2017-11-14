import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  data() {
    return {
      is_foundation: true
    };
  },
  template: '<App :is_foundation="is_foundation"/>',
  components: { App }
})
