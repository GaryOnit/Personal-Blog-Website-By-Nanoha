<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-09-26 18:12:32
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-09-26 20:59:00
 * @FilePath: \vue-blog\src\components\user\UserLoginHead.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="blog-header--login">
    <span @click="refreshModal('login')">登录</span>/ <span @click="refreshModal('register')">注册</span>
  </div>
</template>

<script>
import MIXIN from '@/core/mixin'
export default {
  name: 'UserLoginHead',
  mixins: [MIXIN],
  data () {
    return {
    };
  },
  mounted () {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
</style>