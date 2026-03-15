<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-11-23 20:21:11
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-12-06 17:43:58
 * @FilePath: \vue-blog\src\mviews\FootBar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <van-tabbar v-model="active"
              route>
    <van-tabbar-item icon="home-o"
                     :to='{name:"mArticleList"}'>首页</van-tabbar-item>
    <van-tabbar-item icon="search"
                     :to='{name:"mColumn"}'>分类</van-tabbar-item>
    <van-tabbar-item icon="friends-o"
                     :to='{name:"mUser"}'>我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'FootBar',
  data () {
    return {
      active: 0
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