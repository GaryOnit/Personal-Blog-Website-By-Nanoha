<template>
  <van-card class="blog-m-item"
            :desc="article.title"
            :thumb="article.cover">
    <template #title>
      <h3 class=" van-ellipsis blog-m-item--title">{{article.title}}</h3>
    </template>
    <template #desc>
      <p class="van-ellipsis">
        {{nickname}}
      </p>
    </template>
    <template #num>
      <p>{{article.date}}</p>
    </template>
  </van-card>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object
    }
  },
  data () {
    return {

    };
  },
  mounted () {

  },
  methods: {

  },
  computed: {
    content () {
      let content = this.article.content.match(/>([^<>]+)</)?.[1]
      return content || '默认内容'
    },
    nickname () {
      return this.article.author?.nickname || '默认昵称'
    }
  }
};
</script>


<style lang="stylus" >
.blog-m-item
  margin-top 2px
  & p
    padding 4px 2px
.blog-m-item--title
  font-size 18px
</style>