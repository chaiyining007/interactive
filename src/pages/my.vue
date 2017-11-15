<template>
  <div class="my">
      <p id='my-avatar'>
        <MyAvatar />
      </p>
  </div>
</template>

<script>
import MyAvatar from '@/components/myAvatar.vue';
export default {
  name: 'post',
  components: { MyAvatar },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style lang="scss">
#my-avatar {
  margin-top: .5rem;
}
</style>
