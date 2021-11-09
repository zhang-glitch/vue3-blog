<template>
  <lay-out>
    <div class="wrap clear">
      <!-- 头部背景 -->
      <top-image></top-image>
      <!-- 文章主体 -->
      <type-article-list></type-article-list>
    </div>
  </lay-out>
</template>

<script>
import { defineComponent } from 'vue'
import TopImage from 'components/TopImage.vue'
import LayOut from 'components/LayOut.vue'
import TypeArticleList from 'components/TypeArticleList.vue'

export default defineComponent({
  name: 'list',
  components: {
    LayOut,
    TopImage,
    TypeArticleList,
  },
})
</script>

<style lang="scss">
@import 'assets/config.scss';
</style>
