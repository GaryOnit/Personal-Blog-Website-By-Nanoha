<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-10-04 15:46:37
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-10-05 17:46:52
 * @FilePath: \vue-blog\src\views\ColumnPage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="blog-column-words">
    <WordCloud :data="columnWords"
               nameKey="name"
               :fontSize="[80,120]"
               valueKey="value"
               :color="['#1f77b4', '#629fc9', '#94bedb', '#c9e0ef']"
               :showTooltip="false"
               :wordClick="wordClickHandler">
    </WordCloud>
  </div>
</template>

<script>
import WordCloud from 'vue-wordcloud'
export default {
  name: 'ColumnPage',
  components: { WordCloud },
  data () {
    return {
      columns: []
    };
  },
  created () {
    this.getColumns()
  },
  computed: {
    columnWords () {
      return this.columns.map(item => {
        return {
          name: item.name,
          value: item.aids.length || 0,
          id: item.id
        }
      })
    }
  },
  mounted () {
    this.$EventBus.$on('updateView', () => {
      this.getColumns()
    })
  },

  methods: {
    wordClickHandler (name) {
      let columnId = this.columns.find(item => {
        return item.name === name
      })?.id
      this.$router.push({ name: 'index', query: { columnId } })
    },
    async getColumns () {
      try {
        let columns = await this.$api({ type: 'columns' })
        this.columns = columns.list
      } catch (err) {
        console.log(err)
      }
    }
  },
};
</script>

<style lang="stylus">
.blog-column-words svg
  user-select none
  & text
    cursor pointer
</style>