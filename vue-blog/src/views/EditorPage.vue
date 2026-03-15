<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-10-03 18:13:27
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-12-04 15:24:52
 * @FilePath: \vue-blog\src\views\EditorPage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-card class="blog-editor">
    <h3 class="blog-editor-title">标题</h3>
    <el-input ref="title"
              v-model="title"
              class="blog-editor-input"
              size="medium"
              placeholder="文章标题"></el-input>
    <h3 class="blog-editor-title">内容</h3>
    
    <div id="blog-editor-textarea">

    </div>
    
    <div class="blog-editor-tags">
      <h3 class="blog-editor-title">分类选择</h3>
      <el-radio-group v-model="column"><!-- 单选框可以直接绑定变量 -->
        <el-radio-button v-for="(item) in columns"
                         :key="item.id"
                         :label="item.id">{{item.name}}</el-radio-button>
      </el-radio-group>
    </div>
    
    <div class="blog-editor-button">
      <el-button type="primary"
                 @click="submitEditor">提交</el-button>
      <el-button type="primary"
                 @click="cancelEditor">重置</el-button>
    </div>
  </el-card>
</template>

<script>
import wangEditor from 'wangeditor'
//const COLUMN_ID = '68594a8622dd59547c2b8abe'
export default {
  name:'EditorPage',
  data() {
    return {
      editor: null,
      title: '',
      content:'',
      columns:[],
      column:''
    };
  },
  created(){
    this.getColumns()
  },
  mounted() {
    const editor = new wangEditor('#blog-editor-textarea')
    editor.config.onchange = (newHtml) => {
      this.content = newHtml
    }
    editor.config.uploadImgServer = process.env.VUE_APP_FILE_UPLOAD_PATH
    editor.config.uploadImgMaxSize = 5 * 1024 * 1024 // 5M
    editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
    editor.config.uploadImgMaxLength = 5
    editor.config.uploadFileName = 'file'
    editor.config.uploadImgHeaders = {
      'Authorization': `Bearer ${this.$store.state.token}`,
    }
    editor.create()
    this.editor = editor
  },
  beforeDestroy(){  //销毁编辑器实例
    this.editor.destroy()
    this.editor = null
  },
  methods: {
    async getColumns(){
      try {
        let columns = (await this.$api({type:'columns'})).list
        this.columns = columns.map(item =>{
          return{
            id: item.id,
            name: item.name
          }
        })
        if(this.$route.query.columnId){
          this.column = this.$route.query.columnId
          return
        }
        this.column = this.columns[0]?.id
      } catch (error) {
        console.error(error)
      }
    },
    submitEditor() {
      if(!this.validateEditor()){ //判断编辑器的内容是否有效
        return
      }
      this.postEditorData() //提交文章
    },
    cancelEditor(){
      this.editor.txt.clear()
    },
    validateEditor(){
      if(this.title.trim().length === 0){
        this.$notify.error({
          title:'错误',
          message:'标题不能为空'
        })
        this.$refs['title'].focus()
        return false
      }
      if(this.content.trim().length === 0){
        this.$notify.error({
          title:'错误',
          message:'内容不能为空'
        })
        return false
      }
      return true
    },
    async postEditorData(){
      let postData = {
        title: this.title,
        content: this.content,
        column: this.column,
        cover: this.content.match(/<img src="([^'"]*)"/)?.[1] || undefined  //选取第一张图片作为封面
      }
      try{
        this.$api({type:'postArticle', data:JSON.parse(JSON.stringify(postData))})
        this.$notify.success({
          title:'成功',
          message:'文章提交成功'
        })
        this.$router.push('/index')
      }catch(err){
        this.$notify.error({
          title: '错误',
          message: '提交失败'
        })
      }
    }
  },
};
</script>

<style lang="stylus">
.blog-editor-title
  padding 12px 0
  font-size 16px
.el-input--medium.blog-editor-input
  font-size 18px
  line-height 38px
  height 38px
.blog-editor-tags
  margin 20px 0
  & .el-tag+.el-tag
    margin-left 12px
.blog-editor-button
  padding-top 20px
  display flex
  justify-content space-around
  & button
    flex 1
    line-height 22px
    font-size 18px
</style>