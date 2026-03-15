<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-09-22 19:13:51
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-11-09 16:29:25
 * @FilePath: \vue-blog\src\views\HomePage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="blog-page">
    <el-container class="blog-container">
      <el-header class="blog-header">
        <BaseHeaderVue />
      </el-header>
      <el-container class="blog-middle">
        <el-row class="blog-middle--wrap"
                type="flex"
                justify="flex-wrap"
                align="center">
          
          <el-col :span="6"
                  class="hidden-md-and-down">
            <BaseAsideVue v-if="$store.state.token" />
          </el-col>
          <el-col :span="24"
                  :lg="{span:18}">
            <el-main class="blog-main">
                <Scroll ref="scrollView"
                        @handle-scroll="loadMore">
                  <router-view  v-if="isRouteLoading"
                                :loading="loading"></router-view>
                </Scroll>
            </el-main>
          </el-col>
          <el-col :span="2"
                  v-if="circleMenuList.length > 0">
            <BaseCircleMenuVue :circleMenuList="circleMenuList" />
          </el-col>
        </el-row>
      </el-container>
    </el-container>
    <BaseModalVue />

    <!-- <Live2DVue /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import BaseModalVue from '@/components/base/BaseModal'
import BaseHeaderVue from '@/components/base/BaseHeader.vue'
import BaseAsideVue from '@/components/base/BaseAside.vue';
import BaseCircleMenuVue from '@/components/base/BaseCircleMenu'
import Live2DVue from '@/components/Live2D.vue';
import circleMenuConfig from '@/config/circleMenu.config'
import _ from 'loadsh'


const TH = 200;
export default {
  name:'HomePage',
  data() {
    return {
      loading: false,
      circleMenuList: [],
      isRouteLoading: true
    };
  },
  components: {
    BaseModalVue,BaseHeaderVue,BaseAsideVue, BaseCircleMenuVue, 
  },
  created () {
    this.circleMenuList = circleMenuConfig['index']?.() || []

  },
  provide () {
    return {
      'closeLoadClock': this.closeLoadClock
    }
  },
  computed: {
    
  },
  watch:{
    $route (to) {
      //根据对应路由切换菜单的内容
      this.circleMenuList = circleMenuConfig[to.name]?.() || []
      this.loading = true
      this.reload()
    }
  },
  methods: {
    closeLoadClock () {
      this.loading = false
    },
    reload(){
      this.isRouteLoading = false
      this.$nextTick(function(){
        this.isRouteLoading = true
      })
    },
    loadMore: _.throttle(function (vertical, horizontal, nativeEvent) {
      this.scrollTop = vertical.scrollTop
      if (this.loading) {
        return
      }
      let st = vertical.scrollTop
      let sh = nativeEvent.srcElement.scrollHeight - nativeEvent.srcElement.clientHeight
      if (st + TH > sh) {
        console.log('加载更多')
        this.loading = true
      }
    }, 500, false)
  }
};
</script>

<style lang="stylus">
.blog-container
  overflow hidden
  height 100%
.blog-middle
  padding 20px
  height calc(100vh - 60px)
  background-color #f1f1f1
.el-main.blog-main
  padding 0 20px
  height 100%
.blog-middle--wrap
  max-width 1440px
  margin 0 auto
  width 100%
.blog-footer
  height 10vh
  background-color #2D2F33
</style>