<template>
  <p class="round-image">
      <img :src="url" alt="" />
  </p>
</template>
<script>
    export default {
        name: 'RoundImage',
        props: ['url', "alt"],
        data () {
            return {};
        }
    }
</script>
<style lang="scss">
.round-image {
    display: inline-block;
    border-radius: 50%;
    height: 100%;
    img {
        width: auto;
        display: block;
        height: 100%;
    }
}
</style>