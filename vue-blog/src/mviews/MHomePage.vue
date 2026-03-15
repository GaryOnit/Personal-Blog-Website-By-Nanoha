<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-11-30 14:40:26
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-11-30 15:59:02
 * @FilePath: \vue-blog\src\mviews\MHomePage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="blog-m-page">
    <Header />
    <div class="blog-m-content">
      <router-view></router-view>
    </div>
    <FootBar />
    <BaseDialog />
  </div>
</template>

<script>
import Header from '@/mviews/HeaderBar'
import FootBar from '@/mviews/FootBar'
import BaseDialog from '@/components/mobile/BaseDialog'
export default {
  name: 'MHomePage',
  components: {
    Header,
    FootBar,
    BaseDialog
  },
  data () {
    return {}
  }
}
</script>
<style lang="stylus" >
.blog-m-content
  overflow hidden
  overflow-y auto
  height calc(100vh - 105px)
  background-color #f1f1f1
</style>
