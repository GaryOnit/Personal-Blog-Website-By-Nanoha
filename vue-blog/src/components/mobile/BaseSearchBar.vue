<template>
  <van-search v-model="value"
              shape="round"
              show-action
              @search="onSearch"
              placeholder="请输入搜索关键词">
    <template #action>
      <span @click="onSearch">搜索</span>
    </template>
  </van-search>
</template>

<script>
export default {
  name: 'BaseSearchBar',

  data () {
    return {
      value: '',
    };
  },
  mounted () {

  },
  methods: {
    onSearch () {
      this.$EventBus.$emit('search-article', this.value)
      this.value = ''
    }
  },
};
</script>

<style lang="scss" scoped>
</style>