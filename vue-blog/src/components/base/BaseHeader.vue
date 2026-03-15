<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-09-28 16:07:25
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-11-08 19:25:39
 * @FilePath: \vue-blog\src\components\base\BaseHeader.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-row class="blog-header--wrap"
          type="flex"
          justify="flex-wrap"
          align="center">
    <el-col :span="2"
            :offset="1"
            :xs="{span:24}"
            class="blog-logo--wrap">
      <div class="blog-head--logo">
        <el-image :src="require('@/assets/img/logo.png')"
                  fit="cover"></el-image>
      </div>
    </el-col>
    <el-col class="hidden-xs-only"
            :span="10"
            :offset="2">
      <el-menu class="blog-head--menu"
               mode="horizontal"
               background-color="#2d2f33"
               text-color="#fff"
               active-text-color="#fff"
               default-active="/index"
               ref="navMenu"
               router>
        <el-menu-item index="/index">首页</el-menu-item>
        <el-menu-item index="/column">分类</el-menu-item>
        <el-menu-item index="/album">相册</el-menu-item>
        <el-menu-item index="/socket">聊天室</el-menu-item>
        <el-menu-item v-if="$store.state.userInfo.nickname"
                      index="/user">个人信息</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="4"
            class="hidden-xs-only">
      <el-input class="blog-input--search"
                placeholder="搜索文章"
                v-model="searchVal"
                @keydown.native.enter="activeSearch">
        <i slot="suffix"
           class="el-input__icon el-icon-search"
           @click="activeSearch"></i>
      </el-input>
    </el-col>
    <el-col :span="2"
            :offset="2"
            class="hidden-xs-only">
      <component :is="loginComponent"></component>
    </el-col>
  </el-row>
</template>

<script>
import UserImgAvatarVue from '@/components/user/UserImgAvatar'
import UserLoginHeadVue from '@/components/user/UserLoginHead'
import { mapGetters } from 'vuex'
export default {
  name: 'BaseHeader',
  components: {
    UserImgAvatarVue, UserLoginHeadVue
  },
  data () {
    return {
      searchVal:''
    }
  },
  created () {
    let isLogin = this.$store.state.token
    let nickname = this.userInfo?.nickname
    if (isLogin && !nickname) {
      this.$store.dispatch('getUserInfo')
    }
  },
  watch:{
    $route (newVal) {
      this.$refs['navMenu'].activeIndex = `/${newVal.name}`
    }
  },
  computed: {
    loginComponent () {
      return this.$store.state.token ? 'UserImgAvatarVue' : 'UserLoginHeadVue'
    },
    ...mapGetters(['userInfo'])
  },
  methods:{
    activeSearch () {
      this.$EventBus.$emit('activeSearch', this.searchVal)
      this.searchVal = ''
    }
  }
};
</script>

<style lang="stylus" >
@import '~@/assets/css/base.styl'
.blog-header
  background-color bg-reverse-color
.blog-header--wrap
  display flex
  align-items center
  height 60px
.blog-head--logo
  width 40px
  height 40px
.blog-head--logo
  overflow hidden
  border-radius 50%
  text-align center
  & img
    display block
    width auto
    height 40px
.el-menu.el-menu--horizontal.blog-head--menu
  height 60px
  border-bottom-color bg-reverse-color
.blog-header--login
  display flex
  align-items center
  color line-reverse-color
.blog-header .blog-input--search
  max-width 240px
  & :focus
    border-color transparent
    box-shadow 0 0 8px #ccc inset
</style>