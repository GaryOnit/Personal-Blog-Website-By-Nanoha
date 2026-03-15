<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-11-23 20:15:36
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-12-04 16:25:02
 * @FilePath: \vue-blog\src\mviews\ArticleList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="blog-m-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        offset="100"
        finished-text="没有更多了"
        error-text="获取失败，点击重新加载"
        @load="onLoad"
      >
        <router-link
          v-for="item in articleList"
          :key="item.id"
          :to="{ name: 'mArticle', params: { id: item.id } }"
        >
          <ArticleItem :article="item" />
        </router-link>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from "@/components/mobile/ArticleItem.vue";
import QS from "qs";

export default {
  name: "ArticleList",
  components: { ArticleItem },
  data() {
    return {
      articleList: [],
      columnArticleCache: [],
      loading: false,
      finished: false,
      refreshing: false,
      size: 4,
      page: 1,
      query: "",
    };
  },
  props: {
    columnId: {
      //根据columnId渲染对应的文章列表
      type: String,
    },
  },
  mounted() {
    this.$EventBus.$off("search-article", this.searchArticle);
    this.$EventBus.$on("search-article", this.searchArticle);
  },
  watch:{
    columnId(newId,oldId){    //columnId切换且非空值
      if(newId.trim().length === 0){
        return false
      }
      if(this.columnArticleCache[newId]){
        this.articleList = this.columnArticleCache[newId]     //缓存中已经有这一分类的文章列表
        return false
      }
      this.refreshing = true
      this.onRefresh()
      return true
    }
  },
  methods: {
    onLoad() {
      this.getArticles();
    },
    onRefresh() {
      this.resetParams();
      this.onLoad();
    },
    resetParams() {
      this.page = 1;
      this.finished = false;
      this.loading = true; //文章列表进入加载
    },
    searchArticle(value) {
      this.query = value;
      this.refreshing = true; //进入加载状态
      this.onRefresh(); //搜索的同时要刷新页面
    },
    cacheColumnList() {
      if (this.columnId) {
        this.columnArticleCache[this.columnId] = JSON.parse(
          JSON.stringify(this.articleList)
        );
      }
    },
    getQuery() {
      let column = this.columnId || undefined; //对应的columnId
      let q = this.query || undefined; //要查询的内容
      let query = JSON.parse(
        JSON.stringify({
          column,
          q,
        })
      ); //创建一个克隆对象
      return query;
    },
    getArticles() {
      let data = {
        page: this.page,
        size: this.size,
      };
      
      //带上搜索功能
      let query = this.getQuery();
      if (Object.entries(query).length > 0) {
        data.query = QS.stringify(query);
      }

      this.$api({ type: "articles", data })
        .then((result) => {
          if (this.refreshing) {
            this.articleList = [];
            this.refreshing = false;
          }
          if (this.articleList.length >= result.total) {
            this.finished = true; //没有更多了
            return;
          }
          this.articleList.push(...result.list);
          this.cacheColumnList();
          this.loading = false;
          this.page++;
        })
        .catch((err) => err);
    },
  },
};
</script>
