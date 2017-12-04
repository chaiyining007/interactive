<template>
    <div class="task_detail">
        <p class="task_title">{{task_data.title}}<span class="task_status">{{task_data.status_cn}}</span></p>
        <p class="task_details" v-html="task_data.details"></p>
        <div class="task_imgs row">
            <p class="row_title">任务配图</p>
            <img v-for="url in task_data.imgs" :key="url" :src="url" alt="">
        </div>
        <div class="row post_user">
            <p class="row_title">发布人</p>
            <div class="row_main">
                <img class="user_avatar" :src="task_data.create_user_data.avatar" alt="">
                <div class="create_user_data">
                    <p>{{task_data.create_user_data.name}}</p>
                    <p class="user_task_count">任务数：{{task_data.create_user_data.task_count}}</p>
                </div>            
            </div>
        </div>
        <div class="row run_user" v-if="task_data.run_users&&task_data.run_users.length">
            <p class="row_title">相关人员</p>
             <div class="row_main">
                <span v-for="item in task_data.run_users" :key="item.id" class="run_user_item">
                    <img :src="item.avatar" alt="">
                    <span class="run_user_name">{{item.name}}</span>
                </span>
            </div> 
        </div>
        <div class="btns">
            <a href="#" v-if="!task_data.is_run" class="submit" @click.stop.prevent="receive">领取</a>
            <a href="#" v-if="task_data.is_run" class="submit" @click.stop.prevent="receive">完成</a>
            <a href="#" class="break" @click.stop.prevent="previous">返回</a>
        </div>
        <p class="loading" v-if="loading">加载中...</p>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import ajax from "@/public/src/ajax";
import invisible_ascii_to_html from "libs/src/invisibleAsciiToHtml";
export default {
  data: function() {
    document.title = "任务详情";
    return {
      id: this.$route.params.id,
      loading: true,
      task_data: {
        id: "",
        title: "",
        details: "",
        end_status: "",
        status: "",
        end_status_cn: "",
        status_cn: "",
        create_user_data: {},
        imgs: [],
        run_users: [],
        is_run:false
      }
    };
  },
  methods: {
    previous() {
      window.history.go(-1);
    },
    receive() {
      ajax({
        url: `/tasks/${this.id}/receive`,
        method: "get"
      }).then(
        data => {
          if (data.success) {
            Toast("领取成功！");
            setTimeout(() => {
              //   window.document.location.replace("/");
            }, 3000);
          } else {
            Toast(data.error || "系统繁忙，请稍后再试！");
          }
        },
        e => {
          Toast("系统繁忙，请稍后再试！");
        }
      );
    },
    get_data() {
      this.loading = true;
      ajax({
        url: `/tasks/${this.id}`,
        method: "get"
      }).then(
        ({ success, error, data }) => {
          this.loading = false;
          if (success) {
            data.details = invisible_ascii_to_html(data.details);
            document.title = `${data.create_user_data.name} -- ${data.title}`;
            this.$set(this, "task_data", data);
          } else {
            Toast(error || "系统繁忙，请稍后再试！");
            setTimeout(() => {
              window.history.go(-1);
            }, 2000);
          }
          console.log(data.rows);
        },
        e => {
          this.loading = false;
          Toast("系统繁忙，请稍后再试！");
        }
      );
    }
  },
  mounted: function() {
    this.get_data();
  }
};
</script>
<style lang="scss" scoped>
.task_detail {
  padding-bottom: 1rem;
  .loading,
  .no_data {
    text-align: center;
    font-size: 0.28rem;
    line-height: 0.28rem;
    color: #999;
    padding: 0.28rem 0;
  }
  .row {
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 0.2rem;
    background: #fff;
  }
  .row_title {
    padding: 0.2rem;
    margin-bottom: 0.2rem;
    border-bottom: 1px solid #e5e5e5;
  }
  .row_main {
    padding: 0.2rem;
  }
  .task_title,
  .task_details {
    display: block;
    padding: 0.2rem;
    position: relative;
    border-bottom: 1px solid #e5e5e5;
    background: #fff;
    line-height: 0.46rem;
  }
  .task_title {
    padding-right: 1.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .task_status {
      color: #999;
      position: absolute;
      right: 0.2rem;
    }
  }
  .task_details {
    margin-bottom: 0.2rem;
  }

  .task_imgs {
    background: #fff;
    padding: 0 0 0.2rem 0;
    img {
      width: 30%;
      display: inline-block;
      margin: 0 0.1rem;
    }
  }
  .post_user {
    background: #fff;
    img {
      width: 1rem;
    }
    .user_avatar {
      display: inline-block;
      vertical-align: top;
      width: 1rem;
      height: 1rem;
      margin-right: 0.2rem;
    }
    .create_user_data {
      display: inline-block;
      vertical-align: top;
      height: 1rem;
      .user_task_count {
        font-size: 0.24rem;
        color: #999;
        line-height: 0.48rem;
      }
    }
  }
  .run_user_item {
    display: inline-block;
    width: 1rem;
    margin-right: 0.28rem;
    .run_user_name {
      display: block;
      font-size: 0.24rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width:1rem ;
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
