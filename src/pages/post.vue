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
import { Field, Cell } from "mint-ui";
import ajax from "@/public/src/ajax";
import Upload from "@/public/components/Upload";
// Vue.component(Field.name, Field);
export default {
  name: "post",
  components: { [Field.name]: Field, [Cell.name]: Cell, Upload },
  data() {
    this.$root.is_foundation = false;
    return {
      postData: {
        name: "",
        details: "",
        imgs: []
      }
    };
  },
  methods: {
    uploadSuccess(data, files, index) {
      this.postData.imgs[index] = data.Location;
    },
    previous() {
      window.history.go(-1);
    },
    post() {
      ajax({
        url: "/task",
        method: "post"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.post {
  .upload_imgs {
    width: 5.4rem;
    padding: 0.2rem 0;
    .upload {
      display: inline-block;
    }
  }
  .btns {
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 1rem;
    line-height: 1rem;
    width: 100%;
    display: flex;
    justify-content: space-around;
    a {
      flex-grow: 1;
      text-align: center;
      font-size: 0.28rem;
      position: relative;
      &.submit {
        background: #13d1be;
        color: #fff;
      }
    }
  }
}
</style>
