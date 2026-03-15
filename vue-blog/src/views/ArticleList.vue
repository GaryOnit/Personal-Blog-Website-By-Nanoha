<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-09-27 15:56:06
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-10-09 17:11:17
 * @FilePath: \vue-blog\src\views\ArticleList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="article-wrap">
    <div v-if="hasArticle">
      <el-card class="blog-content--item"
               v-for="item in articles"
               :key="item.id">
        <router-link :to="{name:'article', params:{id:item.id}}"
                     class="read-more-link">
          阅读全文 →
        </router-link>
        <CardArticleItemVue :article="item" />
      </el-card>
    </div>
    <article v-else
         class="blog-content--item blog-content-never" >
        <h3 class="blog-item--title ">很遗憾 没有找到对应的文章</h3>
        <el-button type="primary"
                 @click="routeEditor">去写一篇把</el-button>
    </article>
  </div>

</template>

<script>
import CardArticleItemVue from '@/components/card/CardArticleItem.vue';
import QS from 'qs'

export default {
  name:'ArticleList',
  inject: ['closeLoadClock'],
  data() {
    return {
      articles:[],
      page: 1,
      size: 4,
      scrollTop: 0,
      q:''
    };
  },
  props:{
    loading:{
      type:Boolean
    },
    columnId:{
      type: String
    }
  },
  components:{
    CardArticleItemVue
  },
  computed:{
    hasArticle () {
      return this.articles.length > 0
    }
  },
  watch:{
    loading (load) {
      if (load) {
        this.getArticles()
      }
    }
  },
  created(){
    this.getArticles()
  },
  mounted() {
    this.$EventBus.$on('activeSearch', (q) => {
      this.q = q     
      this.resetArticles()
      this.getArticles()
    })
  },
  activated(){ //再次回到当前页面时激活
    if(this.scrollTop){
      this.$refs['scrollView'].scrollTo({y: this.scrollTop},0)
    }
  },
  methods: {
    routeEditor(){
      let columnId = this.columnId   //等同于this.$route.query.columnId
      this.$router.push({ name: 'editor', query: { columnId } })
    },
    getQuery () {
      let column = this.$route.query?.columnId
      let q = this.q || undefined
      let query = JSON.parse(JSON.stringify({
        column, q
      }))
      return query
    },
    resetArticles () {
      this.page = 1
      this.articles = []
    },
    getArticles () {
      let data = { size: this.size, page: this.page }
      let query = this.getQuery()
      
      if (Object.entries(query).length > 0) {
        data.query = QS.stringify(query)
      }
      this.$api({ type: 'articles', data }).then(result => {
        if (this.articles.length >= result.total) {
          console.log('没有更多了')//没有更多了
          return
        }
        this.articles.push(...result.list)
        this.closeLoadClock() //调用父组件provide传递的关闭load锁方法
        this.page++
      }).catch(err => {
        this.$notify.success({
          title: '获取失败',
          message: err.message
        })
      })
    }
  },
};
</script>

<style lang="stylus">
.article-wrap
  overflow hidden
  height 100%
.read-more-link {
  color: #1890ff;
  text-decoration: none;
  font-weight: 500;
}
.read-more-link:hover {
  color: #40a9ff;
  text-decoration: underline;
}
.blog-item--title
  padding: 20px
</style>