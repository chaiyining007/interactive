<template>
  <div class="post">
      <mt-field label="任务名" placeholder="任务的简单描述" v-model="postData.name"></mt-field>
      <mt-field label="任务描述" type="textarea" rows="4" v-model="postData.details"></mt-field>
      <Upload></Upload>
  </div>
</template>

<script>
import { Field } from "mint-ui";
import Upload from "@/public/components/Upload";
// Vue.component(Field.name, Field);
export default {
  name: "post",
  components: { [Field.name]: Field,Upload },
  data() {
    return {
      postData: {
        name: "",
        details: ""
      }
    };
  }
};
</script>
<style scoped>

</style>
