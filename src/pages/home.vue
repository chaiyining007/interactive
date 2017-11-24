<template>
  <div class="home">
      <Foundation></Foundation> 
  </div>
</template>

<script>
import Foundation from "@/components/foundation";
export default {
  name: 'HelloWorld',
  components:{[Foundation.name]:Foundation},
  data () {
    this.$root.is_foundation = true;
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
