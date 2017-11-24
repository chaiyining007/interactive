<template>
  <div class="post">
      <mt-field label="任务名" placeholder="任务的简单描述" v-model="postData.title"></mt-field>
      <mt-field label="任务描述" type="textarea" rows="4" v-model="postData.details"></mt-field>
      <mt-cell title="配图">
        <div class="upload_imgs">
          <Upload :other_data="0" :successCallback="uploadSuccess" :default_url="postData.imgs[0]"></Upload>&nbsp;&nbsp;&nbsp;&nbsp;
          <Upload :other_data="1" :successCallback="uploadSuccess" :default_url="postData.imgs[1]"></Upload>&nbsp;&nbsp;&nbsp;&nbsp;
          <Upload :other_data="2" :successCallback="uploadSuccess" :default_url="postData.imgs[2]"></Upload>
        </div>
      </mt-cell>
      <div class="btns">
        <a href="#" class="submit" @click.stop.prevent="submit">提交</a>
        <a href="#" class="break" @click.stop.prevent="previous">返回</a>
      </div>
  </div>
</template>

<script>
import { Field, Cell, Toast } from "mint-ui";
import ajax from "@/public/src/ajax";
import Upload from "@/public/components/Upload";
import validator from "async-validator";
export default {
  name: "post",
  components: { [Field.name]: Field, [Cell.name]: Cell, Upload },
  data() {
    return {
      validator: new validator({
        title: {
          required: true,
          message: "任务名不能为空！"
        },
        details: {
          required: true,
          message: "任务描述不能为空！"
        }
      }),
      postData: {
        title: "",
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
    submit() {
      this.validator.validate(this.postData, { first: true }, errors => {
        if (errors) {
          Toast(errors[0].message);
          return;
        }
        this.postData.imgs = JSON.stringify(this.postData.imgs);
        ajax({
          url: "/task",
          method: "post",
          data: this.postData
        }).then(
          data => {
            if (data.success) {
              Toast("发布成功！");
              setTimeout(() => {
                window.document.location.replace("/");
              }, 3000);
            } else {
              Toast(data.error || "系统繁忙，请稍后再试！");
            }
          },
          e => {
            Toast("系统繁忙，请稍后再试！");
          }
        );
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
