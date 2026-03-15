<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-10-02 16:19:23
 * @LastEditors: kusachan 3253975221@qq.com
 * @LastEditTime: 2026-03-15 12:18:46
 * @FilePath: \vue-blog\src\components\article\ArticleBarInfo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="blog-article--info">
    <span class="blog-info--item">
      作者: {{info.nickname}}
    </span>
    <span class="blog-info--item">
      <i class="el-icon-time"></i> {{info.date}}
    </span>
    <div class="hidden-xs-only">
      <span class="blog-info--item"
            @click="like">
        <i class="el-icon-star-on blog-info-like"
           :class="{active:isLike}"></i> {{likeNum}}
      </span>
      <span class="blog-info--item">
        <i class="el-icon-view"></i> {{info.hit_num}}
      </span>
      <span class="blog-info--item">
        <i class="el-icon-edit-outline"></i> {{info.comment_num}}
      </span>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'    //命名空间辅助函数
const { mapGetters, mapActions } = createNamespacedHelpers('like')
export default {
  name: 'ArticleBarInfo',
  props: {
    info: {
      type: Object
    },
    id:{
      type: String
    }
  },
  data () {
    return {
      initLike: false //初始点赞状态
    };
  },
  computed:{
    isLike () {
      let aid = this.id
      return this.checkLike(aid)      //判断当前文章是否已经被点赞
    },
    likeNum () {
      let temp = this.isLike? 0 : -1 
      return Math.max(this.info.like_num + !this.initLike + temp, 0)
    },
    ...mapGetters({
      checkLike: 'isLike'
    })
  },
  created() {
    
  },
  mounted () {
    this.initLike = this.isLike
  },
  methods: {
    like () {
      if (!localStorage.getItem("ua_token")) {
        this.$notify.warning({
          title: "通知",
          message: "请先登录",
        });
        return; // 直接返回，不执行点赞操作
      }
      this[this.isLike ? 'pullLike' : 'pushLike']({ aid: this.id })
      this.sendLikes({ aid: this.id })
    },
    ...mapActions(['pullLike', 'pushLike', 'sendLikes'])    //本地取消点赞,本地增加点赞,发送点赞
  },
};
</script>

<style lang="stylus">
.blog-info-like.active
  color #409EFF
</style>