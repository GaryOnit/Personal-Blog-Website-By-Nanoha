<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-09-22 19:14:58
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-10-02 17:15:56
 * @FilePath: \vue-blog\src\views\Article.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <ArticleContentVue :article="article" />
    <CommentTextAreaVue :aid="article.id" />
    <CommentListVue :comments="article.comments" />
  </div>
</template>

<script>
import ArticleContentVue from '@/components/article/ArticleContent.vue';
import CommentListVue from '@/components/comment/CommentList.vue';
import CommentTextAreaVue from '@/components/comment/CommentTextArea.vue';

export default {
  name:'ArticlePage',
  data() {
    return {
      id:'',
      article:{}
    };
  },
  components:{
    ArticleContentVue,CommentListVue,CommentTextAreaVue
  },
  provide () {
    return {
      getArticleById: this.getArticleById
    }
  },
  created(){
    this.id = this.$route.params.id
    this.getArticleById()
  },
  mounted() {},
  methods: {
    async getArticleById () {
      try {
        this.article = await this.$api({ type: 'getArticleById', data: { id: this.id } })
      } catch (err) {
        this.$notify.success({
          title: '获取失败',
          message: err.message
        })
      }
    }
  },
};
</script>

<style>
</style>