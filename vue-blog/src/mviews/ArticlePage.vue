<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-11-23 21:15:25
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-12-06 18:39:25
 * @FilePath: \vue-blog\src\mviews\ArticlePage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="blogm-article--wrap">
    <ArticleContent :article="article"
                    v-if="article.id" />
    <ArticleComment :comments="article.comments"/>
    <van-action-sheet v-model="showComment"
                      title="评论">
      <div class="blogm-action--content">
        <van-divider />
        <van-field v-model="comment"
                   style="min-height:120px"
                   rows="2"
                   type="textarea"
                   size="large"
                   maxlength="100"
                   autosize
                   placeholder="请输入留言"
                   show-word-limit />
        <van-button type="info"
                    @click="onSubmitComment"
                    block>提交</van-button>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import ArticleComment from '@/components/mobile/ArticleComment'
import ArticleContent from '@/components/mobile/ArticleContent'
import {mapState, createNamespacedHelpers} from 'vuex'
import { Notify } from 'vant'
const { mapActions } = createNamespacedHelpers("like");
export default {
  name: 'ArticlePage',
  components: {
    ArticleContent, ArticleComment
  },
  data () {
    return {
      id: '',
      article: {},
      comment: '',
      showComment: false
    };
  },
  computed: {
    ...mapState(['uid'])
  },
  created () {
    this.id = this.$route.params.id
    this.getArticleById()

    this.$EventBus.$on('show-comment-action', this.showCommentAction) //监听eventBus
  },
  beforeDestroy () {
    this.$EventBus.$off('show-comment-action', this.showCommentAction)  //解除监听eventBus
  },
  methods: {
    async getArticleById () {
      try {
        this.article = await this.$api({ type: 'getArticleById', data: { id: this.id } })

        let likeUsers = this.article?.like_users || []
        let uid = this.$store.getters.userInfo?._id
        let aid = this.article?.id
        if (likeUsers.includes(uid)) {
          this.pushLike({ aid })
        }
      } catch (err) {
        Notify({
          type: 'warning',
          message: err.message
        })
      }
    },
    showCommentAction () {
      //检查用户是否已经登录,是否有评论权限
      if(!this.$store.state.token){
        Notify({ type: 'warning', message: '请先登录' })
        this.$EventBus.$emit('dialog-show', 'login')
        return false
      }

      console.log(this.id, 'id')
      this.showComment = true
    },
    async onSubmitComment(){
      if(this.comment.trim().length === 0){
        Notify({type: 'warning', message: '请输入评论内容'})
        return false
      }
      try{
        await this.$api({type: 'postComment', data: {aid: this.id, content: this.comment, uid: this.uid}})
        Notify({type: 'success', message: '评论成功'})

      }catch(err){
        Notify({type: 'warning', message: '评论失败'})
      }
      this.resetComment()
    },
    resetComment () {
      this.showComment = false
      this.comment = ''
    },
    ...mapActions(["pullLike", "pushLike", "sendLikes"])
  },
};
</script>
<style lang="stylus" >
.blogm-action--content
  padding 20px 10px 20px
</style>

