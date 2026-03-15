<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-12-06 16:51:07
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-12-06 19:02:35
 * @FilePath: \vue-blog\src\components\mobile\BaseDialog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <van-dialog v-model="show"
              :title="title"
              show-cancel-button
              :beforeClose="beforeClose">
    <BaseForm ref="formWrap"
                class="blogm-dialog--form"
                :type="type"
                v-if="show" />
    <p class="blogm-dialog--route">
      <van-tag plain
               round
               type="primary"
               @click="goRegister">注册</van-tag>
    </p>
  </van-dialog>
</template>

<script>
import BaseForm from '@/components/mobile/BaseForm'
import MODAL_DATA from '@/config/modal.config'
export default {
  name:'BaseDialog',
  data() {
    return {
      show: false,  //默认不显示
      type: 'login' //根据type渲染form
    };
  },
  computed:{
    title () {
      return MODAL_DATA[this.type]?.title ?? '弹窗'
    },
    formType () {
      return MODAL_DATA[this.type]?.formType
    },
  },
  components:{
    BaseForm
  },
  mounted() {

  },
  created() {
    this.$EventBus.$on('dialog-show', this.showDialog)
  },
  beforeDestroy(){
    this.$EventBus.$off('dialog-show', this.showDialog)
  },
  methods: {
    goRegister () {
      this.show = false
      this.$router.push({
        name: 'mUser',
        query: { userFormType: "register" }
      })
    },
    showDialog(type){
      this.type = type
      this.show = true
    },
    beforeClose(action, done){
      if (action === 'confirm') {
        let formWrap = this.$refs.formWrap
        let formComponent = formWrap.$refs.form
        formComponent.validate().then(async () => {
          try {
            await this.$api({ type: this.formType, data: formWrap.form })
            done()         //关闭弹窗
          } catch (err) {
            //重置表单
            formComponent.resetValidation()
          }

        }).catch(err => {
          //阻止关闭弹窗
          done(false)
        })
        return
      }
      done()
    }
  },
};
</script>

<style lang="stylus">
.blogm-dialog--form
  padding 20px 10px
.blogm-dialog--route
  display flex
  justify-content flex-end
  align-items center
  padding 4px 2em
  font-size 12px
  &>a
    color #1989fa
</style>