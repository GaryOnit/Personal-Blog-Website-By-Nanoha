<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-11-30 16:28:29
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-11-30 16:41:21
 * @FilePath: \vue-blog\src\components\mobile\ArticleComment.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class=" blogm-article--comment">
    <van-cell-group>
      <template #title>
        <h3 class="blogm-article--head">评论区</h3>
      </template>
      <div v-if="hasComment">
        <div class="blogm-article--padline"
             v-for="comment in comments"
             :key="comment.id">
          <van-cell :title="comment.uid.nickname"
                    :value="comment.date" />
          <van-cell :value="comment.content" />
        </div>
      </div>
      <van-empty v-else
               description="暂无评论" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name:'ArticleComment',
  data() {
    return {};
  },
  props:{
    comments:{
      type: Array
    }
  },
  computed:{
    hasComment () {
      return this.comments?.length
    }
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="stylus">
.blogm-article--padline
  border-bottom 3px solid #f1f1f1
.blogm-article--head
  padding 8px
  font-size 1.6em
  color #888
  font-weight 600
  text-align center
</style>