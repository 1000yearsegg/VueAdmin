<!-- 图书新增 -->
<template>
  <article-detail :is-edit="false" />
</template>

<script>
import ArticleDetail from './components/Detail'

export default {
    name: 'CreateBook',
    components: { ArticleDetail }
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>
