<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-11-23 20:21:44
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-11-23 21:32:33
 * @FilePath: \vue-blog\src\mviews\HeaderBar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="blog-m-header">
    <component :is="headType"
               :title="title"
               :button="button"
               :handler="buttonHandler"></component><!-- 通过is动态决定使用哪个组件 -->
  </div>
</template>

<script>
import NavBar from '@/components/mobile/BaseNavBar'
import SearchBar from '@/components/mobile/BaseSearchBar'

export default {
  name: 'HeaderBar',
  data () {
    return {
      headType: 'SearchBar',  //to.meta中有headType
      title: '默认标题',
      button: '',
      buttonHandler: ''
    };
  },
  components:{
    NavBar, SearchBar
  },
  mounted () {

  },
  watch: {
    $route(to){
      this.button = ''
      this.buttonHandler = ''
      Object.assign(this, to.meta)  //把to.meta中的信息取过来
    }
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
</style>