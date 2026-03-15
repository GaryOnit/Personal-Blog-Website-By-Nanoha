<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-09-21 16:21:16
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-11-09 19:57:47
 * @FilePath: \黄俊霖_vue_20250921\vue-blog\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  created() {
    if (this.$route.path !== '/index'){
      this.$router.replace('/index')
    }  
  },
  mounted() {    
    if(this._isMobile() ){
      this.$router.replace('/m')
    }
    else if(this.$route.path !== '/index'){
      this.$router.replace('/index')
    }
  },
  methods: {
    _isMobile () {
      return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/)
    }
  }
}
</script>

<style lang="stylus">
html, body
  overflow hidden
  height 100vh
</style>
