<template>
  <div class="home">
      <div class="task_main">
        <ul class="task_list">
          <li class="task_item" v-for="item in list" :key="item.id">
            <router-link class="task_link" :to="'/task/'+item.id">
              <span class="task_title">
                {{item.title}}
                <span class="task_status">{{item.status_cn}}</span>
              </span>
              <span class="task_details" v-html="item.details"></span>
            </router-link>
          </li>
        </ul>
        <p class="loading" v-if="loading">加载中...</p>
      </div>
      <Foundation></Foundation> 
  </div>
</template>

<script>
import Foundation from "@/components/foundation";
import { Toast } from "mint-ui";
import ajax from "@/public/src/ajax";
import invisible_ascii_to_html from "libs/src/invisibleAsciiToHtml";
export default {
  name: "home",
  components: { [Foundation.name]: Foundation },
  data() {
    this.$root.is_foundation = true;
    return {
      loading: true,
      list: [],
      page_data: {
        page: 1,
        per_page: 20
      }
    };
  },
  methods: {
    get_data() {
      this.loading = true;
      ajax({
        url: "/tasks",
        method: "get",
        params: this.page_data
      }).then(
        ({ success, error, data }) => {
          this.loading = false;
          if (success) {
            data.rows.forEach(data => {
              data.details = invisible_ascii_to_html(data.details);
            });
            this.$set(this, "list", this.list.concat(data.rows));
            this.list = this.list;
          } else {
            Toast(error || "系统繁忙，请稍后再试！");
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  .loading {
    text-align: center;
    font-size: 0.28rem;
    line-height: 0.28rem;
    color: #999;
    padding: 0.28rem 0;
  }
  .task_item {
    margin-bottom: 0.2rem;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    margin-top: -1px;

    .task_link {
      display: block;
      background: #fff;
      min-height: 2rem;
      .task_title,
      .task_details {
        display: block;
        padding: 0.2rem;
        position: relative;
      }
      .task_title {
        border-bottom: 1px solid #e5e5e5;
        padding-right: 1.4rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .task_details {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-height: 0.46rem;
        height: calc(0.46rem * 4);
        padding-bottom: 0;
      }
      .task_status {
        color: #999;
        position: absolute;
        right: 0.2rem;
      }
    }
  }
}
</style>
