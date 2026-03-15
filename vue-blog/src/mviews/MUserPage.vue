<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-12-06 16:54:06
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-12-06 18:14:06
 * @FilePath: \vue-blog\src\mviews\UserPage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="blogm-user">
    <van-uploader v-if="avatar"
                  v-model="upload"
                  :preview-image="false"
                  :after-read="afterRead"
                  preview-size="5rem">
      <van-image width="5rem"
                 height="5rem"
                 round
                 :src="avatar" />
    </van-uploader>
    <van-image v-else
               width="5rem"
               height="5rem"
               round
               :src="require('@/assets/img/logo.png')" />
    <div class="blogm-users--content">
      <h2 class="blogm-users--title">{{title}}</h2>
      <BaseFormVue :type="formType"/>
    </div>
    <div class="blogm-users--btns">
      <van-button type="info"
                  block>{{buttonName}}</van-button>
    </div>
  </div>
</template>

<script>
import MODAL_DATA from '@/config/modal.config'
import BaseFormVue from '@/components/mobile/BaseForm.vue';
import {mapGetters} from 'vuex'

const BTN_NAME = {
  'login':'登录',
  'register': '注册',
  'userInfo': '修改'
}
export default {
  name:'MUserPage',
  data() {
    return {
      type:'',
      upload:[],
      fileBase: ''
    };
  },
  props:{
    userFormType:{
      type: String,
      default: 'login'
    }
  },
  computed:{
    formType(){
      return this.nickname ? 'userInfo' : this.userFormType
    },
    title(){
      return MODAL_DATA[this.formType]?.title
    },
    buttonName(){
      return BTN_NAME[this.formType] || '提交'
    },
    avatar(){
      return this.fileBase || this.userInfo?.avatar
    },
    nickname(){
      return this.userInfo?.nickname
    },
    ...mapGetters(['userInfo'])
  },
  components:{
    BaseFormVue
  },
  mounted() {},
  created() {
    let isLogin = this.$store.state.token? true : false,
        nickname = this.userInfo.nickname
    if(isLogin && !nickname){
      this.$store.dispatch('getUserInfo')
    } 
  },
  methods: {
    afterRead(upload){
      console.log(upload)
    }
  },
};
</script>

<style lang="stylus">
.blogm-user
  display flex
  flex-direction column
  align-items center
  justify-content space-around
  padding 20px
  height 100%
  background-color #f9f9f9
.blogm-users--content
  width 100%
  padding 20px 0
  background-color #fff
.blogm-users--btns
  width 100%
.blogm-users--title
  font-size 22px
  font-weight 600
  text-align center
  line-height 1.8
</style>