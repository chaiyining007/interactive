<template>
  <div class="my-avatar">
      <RoundImage :url="url" :alt="avatar" />
  </div>
</template>
<script>
import RoundImage from '@/public/components/RoundImage.vue';
export default {
    name: 'MyAvatar',
    components: {RoundImage},
    data () {
        return {
            url: 'http://kalemao.yunwanse.com/kalemao_f2e/main/view/phone/user_center/img/us_default_photo2x.png'
        };
    }
}
</script>
<style lang="scss">
.my-avatar {
    text-align: center;
    height: 1.4rem;
}
</style>
