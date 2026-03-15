<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-09-26 15:48:53
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-10-09 16:34:11
 * @FilePath: \vue-blog\src\components\base\BaseForm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-form :model="form" ref="elForm">
      <el-form-item
        v-for="item in formData"
        :key="item['query']"
        :label="item.label"
        label-width="100px"
        :rules="validateData[item['query']]"
        :prop="item['query']"
      >
        <el-upload
          v-if="item.type === 'avatar'"
          class="avatar-uploader"
          ref="upload"
          :headers="{
            Authorization: `Bearer ${$store.state.token}`,
          }"
          :data="{ uid: $store.state.uid }"
          :action="userFileAction"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
        >
          <el-image
            style="width: 100px; height: 100px"
            v-if="form[item['query']]"
            :src="form[item['query']]"
            class="avatar"
            fit="fit"
          ></el-image>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-input
          v-if="['text', 'password'].includes(item.type)"
          v-model="form[item['query']]"
          :type="item.type"
          :disabled="item.readonly"
          :placeholder="item.placeholder"
          :name="item['query']"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import FORM_DATA from "@/config/form.config";
import VALIDATE_DATA from "@/config/validate.config";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default {
  name: "BaseForm",
  data() {
    return {
      form: {},
    };
  },
  props: {    //父组件来决定form的类型
    type: {
      type: String,
    },
  },
  created(){
    if (this.type === 'userInfo') {   
      this.form = Object.fromEntries(Object.entries(this.$store.getters.userInfo).filter(([key]) => {
        return FORM_DATA['userInfo'].find(item => {
          return key === item['query']
        })
      }))
      // this.form = this.$store.getters.userInfo
    }
  },
  mounted() {},
  methods: {
    initForm() {
      this.form = {};
      this.resetForm();
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
    handleAvatarSuccess(res) {
      console.log(`图片修改成功,新的图片链接是fileURL`)
      this.form.avatar = res.data.fileURL;
      NProgress.done();
    },
    handleAvatarError(err) {
      this.$notify.error({
        title: "上传失败",
        message: JSON.parse(err.message)?.message,
      });
    },
    beforeAvatarUpload(file) {
      let { size, type } = file;
      let sizePass = true, typePass = true;
      sizePass = /image/g.test(type); //测试文件类型
      typePass = size < 5 * 1024 * 1024; //测试文件大小
      if (!sizePass ) {
        this.$notify.error({
          title: "上传错误",
          message: "文件不得大于5M",
        });
        this.$refs.upload[0].abort(file);
        return false;
      }
      if (!typePass) {
        this.$notify.error({
          title: "上传错误",
          message:  "请选择图片文件",
        });
        this.$refs.upload[0].abort(file);
        return false;
      }
      NProgress.start();
    },
  },
  computed: {
    formData() {
      return FORM_DATA[this.type];
    },
    validateData() {
      return VALIDATE_DATA;
    },
    formValue: {
      get() {
        return this.form;
      },
      set(value) {
        this.$emit("update:form", value);
      },
    },
    userFileAction () {
      return process.env.VUE_APP_USER_UPLOAD_PATH
    }
  },
  watch: {
    type() {
      this.initForm(); //modal类型改变时重置一切
    },
  },
};
</script>

<style lang="stylus">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>