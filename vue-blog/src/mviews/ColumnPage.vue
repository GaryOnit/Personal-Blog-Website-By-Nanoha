<template>
  <div>
    <van-sticky :offset-top="45">
      <van-tabs v-model="columnId">
        <van-tab
          v-for="tab in columnList"
          :key="tab.id"
          :title="tab.name"
          :name="tab.id"
        >
        </van-tab>
      </van-tabs>
    </van-sticky>
    <ArticleList v-if="columnId" :columnId="columnId" />
  </div>
</template>

<script>
import ArticleList from '@/mviews/ArticleList'

export default {
  name: "ColumnPage",
  data() {
    return {
      columnId: '',
      columnList: []
    };
  },
  components: {
    ArticleList
  },
  created() {
    this.getColumns()
  },
  methods: {
    async getColumns(){
      try{
        let result = await this.$api({type: 'columns'})
        this.columnList = result.list
        this.columnId = this.columnList[0].id
      }catch(err){
        console.log(err)
      }
    }
  },
};
</script>

<style>
</style>