<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-12-06 16:51:07
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-12-06 18:31:50
 * @FilePath: \vue-blog\src\components\mobile\BaseForm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <van-form ref="form">
    <van-field v-for="item in formData"
               v-model="form[item['query']]"
               name="用户名"
               :readonly="type === 'userInfo' && item['query'] === 'username'"
               :key="item['query']"
               :type="item['type']"
               :label="item['label']"
               :placeholder="item['placeholder']"
               :rules="validates[item['query']] | formatRuleTrigger" />
  </van-form>
</template>

<script>
import FORM_DATA from '@/config/form.config'
import VALIDATE_DATA from '@/config/validate.config'

import { padStart, capitalize } from 'loadsh'
export default {
  name: 'BaseForm',
  props:{
    type: {
      type: String
    }
  },
  data () {
    return {
      testVal: '',
      form: {}
    };
  },

  created () {
    if (this.type === 'userInfo') {
      //筛选排除 vuex中userInfo里不存在 form.config['userInfo']中的项
      this.form = Object.fromEntries(Object.entries(this.$store.getters.userInfo).filter(([key]) => {
        return FORM_DATA['userInfo'].find(item => {
          return key == item['query']
        })
      }))
    }
  },
  computed: {
    formData () {
      return FORM_DATA[this.type].filter(item => {
        return item.query !== 'avatar'    //去掉avatar
      })
    },
    validates () {
      return VALIDATE_DATA
    },
    userFileAction () {
      return process.env.VUE_APP_USER_UPLOAD_PATH
    }
  },
  filters: {
    formatRuleTrigger (rules) {
      // 'blur' = > 'onBlur'
      return rules?.map(item => {
        // capitalize('blur') => 'Blur'
        // padStart('Blur',6,'on') => 'onBlur'
        item.trigger = padStart(capitalize(item.trigger), 6, 'on')
        return item
      })
    }
  },
  watch: {
    type () {
      this.initForm()
    }
  },
  methods: {
    initForm () {
      this.form = {}
      this.resetForm()
    },

  },
};
</script>

<style lang="stylus" ></style>