/*上传 */
<template>
    <div class="upload">
        <input v-if="!status||!is_pit" ref="el_file" class="upload_trigger" type="file" :name="file_key" @change="onChange">
        <slot>
            <div v-if="location" class="upload_preview">
                <img class="upload_preview_img" :src="location">
            </div>
            <div v-else-if="this.status" class="upload_progress">
                <p class="progress_value">{{progress_value.toFixed(2)}}%</p>
                <mt-progress :value="progress_value" :bar-height="6"></mt-progress>
            </div>
            <div v-else class="upload_guide">
                <p class="iconfont upload_def_icon">&#xe61a;</p>
                <p class="upload_guide_msg">单击上传</p>
            </div>
        </slot>
    </div>
</template>
<script>
import ajax from "libs/src/OSSAjax";
import file_to_base64 from "libs/src/fileToBase64";
// import axios from "lib/ajax";
import getSuffixName from "libs/src/getSuffixName";
import base64ToBlob from "libs/src/base64ToBlob";
import dealImage from "libs/src/dealImage";
import { Progress, Toast } from "mint-ui";
import * as xml2json from "libs/src/XMLToJson";
const IDLE = 0; //空闲状态
const START = 1; //开始瞬间（回调之后被修改）
const PROGRESS = 2; //上传中
const SUCCESS = 3; //成功瞬间（回调之后被修改）
const ERROR = 4; //失败瞬间（回调之后被修改）

export default {
  name: "Upload",
  props: {
    file_key: {
      type: String,
      default: "file"
    },
    action: {
      type: String,
      default: "//interactive-family.oss-cn-beijing.aliyuncs.com"
    },
    is_pit: {
      type: Boolean,
      default: true
    },
    suffix_names: {
      type: Array,
      default: function() {
        return ["jpg", "jpeg", "png"];
      }
    },
    max_size: {
      type: Number,
      default: 1024
    },
    successCallback: Function,
    errorCallback: Function,
    progressCallback: Function
  },
  data: function() {
    return {
      status: IDLE,
      formData: null,
      file_size: 0,
      progress_value: 0,
      oss_config: {},
      location: "",
      files: []
    };
  },
  methods: {
    get_oss_config: function(cb) {
      return new Promise(function(resolve, reject) {
        resolve({
          data: {
            // accessid: "gosMh90Xji8bufWm",
            // policy: "",
            // signature: "",
            dir: "upload-files/"
          }
        });
      });
      // return axios({
      //     method: 'get',
      //     url: '/api/config/oss_sign'
      // });
    },
    onChange: function(e) {
      let file = (e.target.files || e.dataTransfer.files)[0];
      this.file_size = file.size / 1024;
      let suffix_name = getSuffixName(file.name);
      // if (this.file_size > this.max_size) {
      //     Toast(`${this.$t("upload_failed_size",[this.max_size])}`)
      //     return
      // }
      if (this.suffix_names.indexOf(suffix_name) < 0) {
        Toast(`上传失败，请上传 ${this.suffix_names.join()} 格式的文件`);
        return;
      }
      this.status = START;
      this.get_oss_config().then(({ data }) => {
        // this.oss_config.OSSAccessKeyId = data.accessid;
        // this.oss_config.policy = data.policy;
        // this.oss_config.Signature = data.signature;
        // [文件目录]/上传时间戳_随机值.后缀
        this.oss_config.key = `${data.dir}${new Date().getTime()}_${~~(
          Math.random() * 99999
        )}.${getSuffixName(file.name)}`;
        this.atatus = PROGRESS;
        this.progress_value = 10;
        (() => {
          let file_item_data = {
            progress_value: 0,
            status: "progress"
          };
          this.files.push(file_item_data);
          typeof this.progressCallback === "function" &&
            this.progressCallback(null, this.files);
          file_to_base64(e.target, base_64 => {
            // console.warn(base_64);
            // console.warn(this.file_size);
            dealImage(base_64, 1024 / this.file_size, base_64 => {
              const block = base_64.split(";");
              const contentType = block[0].split(":")[1];
              const realData = block[1].split(",")[1];
              let blob = base64ToBlob(realData, contentType);
              ajax({
                data: this.oss_config,
                action: this.action,
                file: blob,
                filename: this.file_key,
                onSuccess: data => {
                  console.log(xml2json.Create(data));
                  
                  return
                  this.status = SUCCESS;
                  this.location = data.Location = data.Location.replace(
                    "http://",
                    "https://"
                  );
                  file_item_data.location = this.location;
                  file_item_data.status = "success";
                  file_item_data.key = data.Key;
                  typeof this.successCallback === "function" &&
                    this.successCallback(data, this.files);
                  this.status = IDLE;
                },
                onError: (error, data) => {
                  file_item_data.status = "error";
                  typeof this.errorCallback === "function" &&
                    this.errorCallback(data, this.files);
                  this.status = IDLE;
                },
                onProgress: e => {
                  file_item_data.status = "progress";
                  file_item_data.progress = e;
                  file_item_data.progress_value = e.percent;
                  this.progress_value = e.percent;
                  typeof this.progressCallback === "function" &&
                    this.progressCallback(e, this.files);
                }
              });
            });
          });

          if (!this.is_pit) {
            this.$refs.el_file.value = "";
          }
        })();
      });
    },
    remove_item: function(index) {
      this.files.splice(index, 1);
    }
  },
  components: {
    [Progress.name]: Progress
  }
};
</script>
<style lang="scss">
@import "../sass/mixin.scss";
.upload {
  display: block;
  position: relative;
  width: 1.4rem;
  height: 1.4rem;
  border: 1px solid $color-line;
  background: #fff;
  .upload_trigger {
    @include posabwh100;
    opacity: 0;
    z-index: 100;
  }
  .upload_preview {
    @include posabwh100;
    display: flex;
    justify-content: space-around;
    text-align: center;
    align-items: center;
    z-index: 10;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .upload_guide {
    @include posabwh100;
  }
  .upload_def_icon,
  .upload_guide_msg {
    display: block;
    line-height: 0.9rem;
    text-align: center;
    font-size: 0.6rem;
    color: #999;
  }
  .upload_guide_msg {
    font-size: 0.26rem;
    line-height: 0.4rem;
  }
  .upload_progress {
    @include posabwh100;
    .progress_value {
      font-size: 0.36rem;
      text-align: center;
      line-height: 0.6rem;
      height: 0.6rem;
      padding-top: 0.2rem;
      color: #999;
    }
  }
}
</style>