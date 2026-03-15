<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-09-23 16:17:39
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-10-07 15:54:04
 * @FilePath: \vue-blog\src\components\base\BaseModal.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-dialog :title="title"
               :visible.sync="isShow"
               :width="width"
               :before-close="close">
      <BaseFormVue  ref="form"
                    :type="type"
                    v-if="formType" />
      <div slot="footer"
           class="dialog-footer">
        <el-button v-for="btn in btns"
                   :key="btn.targetName"
                   @click="btnHandler(btn.targetName,btn.isSubmit)">{{btn.name}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MODAL_DATA from '@/config/modal.config'
import { createNamespacedHelpers } from 'vuex'
import BaseFormVue from './BaseForm.vue'
const { mapState, mapActions } = createNamespacedHelpers('modal')

export default {
  name: 'BaseModal',
  components: {
    BaseFormVue
  },
  data () {
    return {

    };
  },
  computed: {
    ...mapState(['isShow', 'type']),
    title () {
      return MODAL_DATA[this.type]?.title ?? '默认标题'
    },
    width () {
      return MODAL_DATA[this.type]?.width ?? '60%'
    },
    formType () {
      return MODAL_DATA[this.type]?.formType
    },
    formData () {
      return MODAL_DATA[this.type]?.formData
    },
    btns () {
      return MODAL_DATA[this.type]?.btns ?? [{
        targetName: 'close',
        name: '取消'
      },
      {
        targetName: 'confirm',
        name: '提交',
        isSubmit:true
      }]
    }
  },
  mounted () {

  },
  methods: {
    ...mapActions(['close', 'open', 'confirm']),
    btnHandler (action, isSubmit) {
      if(isSubmit){
        this.submitForm(this.type)
        return
      }
      this[action] && this[action]()
    },
    submitForm () {
      if (!this.formType) {
        return false
      }
      let refForm = this.$refs['form']
      refForm.$refs['elForm'].validate(async (valid) => {
        if (valid) {
          try {
            await this.$api({ type: this.formType, data: refForm.form })
            this.close()
            if (this.needUpdate) {
              this.$EventBus.$emit('updateView')
            }
          } catch (err) {
            refForm.$refs['elForm'].resetFields()
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

