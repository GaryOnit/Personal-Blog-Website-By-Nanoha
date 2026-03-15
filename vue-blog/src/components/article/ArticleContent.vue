<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-10-02 16:17:56
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-10-02 17:32:25
 * @FilePath: \vue-blog\src\components\article\ArticleContent.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-card>
    <div class="blog-article typo">
      <h3 class="blog-article--title">{{article.title}}</h3>
      <ArticleBarInfoVue   v-if="article.id && info" 
                          :info="info" 
                          :id="article.id" />
      <div class="blog-article--content"
           v-html="article.content">
      </div>
    </div>
  </el-card>
</template>

<script>
import ArticleBarInfoVue from './ArticleBarInfo.vue';

export default {
  name:'ArticleContent',
  data() {
    return {};
  },
  props:{
    article: {
      type: Object,
      default: function () {
        return {
          title: '默认标题',
          date: "默认日期",
          like_num: 0,
          hit_num: 0,
          comment_num: 0,
          content: ''
        }
      }
    }
  },
  computed:{
    info(){
      let { like_num, hit_num, comment_num, date } = this.article
      return {
        like_num, hit_num, comment_num, date, nickname: this.nickname
      }
    },
    nickname(){
      return this.article?.author?.nickname || '默认名称'
    },

  },
  components:{
    ArticleBarInfoVue
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="stylus">
@import '~@/assets/css/typo.styl'
@import '~@/assets/css/base.styl'
.blog-article
  font-size 16px
  background-color line-modifier-color
  border-radius radius-theme-size
.blog-article--title
  font-size 22px
  line-height 26px
  margin 0
  word-break break-word
.blog-article--info
  padding padding-space * 2
  background-color #f7f8fc
  display flex
  justify-content space-between
  color #999
  @media screen and (max-width 768px)
    flex-direction column
    height 120px
.blog-info--item
  padding 0 6px
.blog-article--content
  padding padding-space * 2 0
.blog-article img
  display block
  width 50%
  margin 10px auto
</style>