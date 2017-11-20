<template>
  <div class="post">
      <mt-field label="任务名" placeholder="任务的简单描述" v-model="postData.name"></mt-field>
      <mt-field label="任务描述" type="textarea" rows="4" v-model="postData.details"></mt-field>
      <mt-cell title="配图">
        <div class="upload_imgs">
          <Upload :other_data="0" :successCallback="uploadSuccess" :default_url="postData.imgs[0]"></Upload>&nbsp;&nbsp;&nbsp;&nbsp;
          <Upload :other_data="1" :successCallback="uploadSuccess" :default_url="postData.imgs[1]"></Upload>&nbsp;&nbsp;&nbsp;&nbsp;
          <Upload :other_data="2" :successCallback="uploadSuccess" :default_url="postData.imgs[2]"></Upload>
        </div>
      </mt-cell>
      <div class="btns">
        <a href="#" class="submit" @click.stop.prevent="post">提交</a>
        <a href="#" class="break" @click.stop.prevent="previous">返回</a>
      </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
</style>