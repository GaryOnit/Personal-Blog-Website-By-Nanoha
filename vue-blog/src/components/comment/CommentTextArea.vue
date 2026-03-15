<template>
  <el-card>
    <div class="blog-comment blog-comment--editor">
      <textarea ref="textarea"
                class="blog-comment--input"
                v-model="commentVal"
                name="comment"
                autofocus></textarea>
      <el-button type="primary"
                 @click="submitComment">提交</el-button>
    </div>
  </el-card>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'CommentTextArea',
  inject: ['getArticleById'],         //inject 调用父组件的 getArticleById方法
  props: {
    aid: {
      type: String
    }
  },
  data () {
    return {
      commentVal: ''
    };
  },
  computed:{
    ...mapState(['uid'])
  },
  mounted () {
    this.$EventBus.$on('focusTextarea', () => {
      this.focusTextarea()
    })
  },
  methods: {
    focusTextarea(){
      this.$refs['textarea']?.focus()
    },
    async submitComment () {
      if (this.commentVal.trim().length === 0) {
        this.$notify.info({
          title: '请填写评论内容',
        })
        this.focusTextarea()
        return
      }
      try {
        await this.$api({ type: 'postComment', data: { aid: this.aid, content: this.commentVal, uid: this.uid } })
        this.$notify.success({
          title: '评论成功',
        })
        this.commentVal = ''
        this.getArticleById()
      } catch (err) {
        this.$notify.error({
          title: '评论失败',
          message: err.message
        })
      }
    }
  },
};
</script>

<style lang="stylus">
@import '~@/assets/css/base.styl'
.blog-comment-card
  margin 20px 0
.blog-comment--editor
  display flex
  flex-direction column
  justify-content space-between
  text-align center
  height 200px
  &>textarea
    padding padding-space
    height 120px
    resize none
    margin-bottom 20px
</style>