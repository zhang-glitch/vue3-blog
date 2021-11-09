<template>
  <lay-out>
    <div class="wrap clear">
      <!-- 头部背景 -->
      <top-image></top-image>
      <!-- 文章主体 -->
      <type-article-list
        :tabsTitle="tabsTitle"
      ></type-article-list>
    </div>
  </lay-out>
</template>

<script>
import { defineComponent, reactive  } from "vue";
import TopImage from 'components/TopImage.vue'
import LayOut from 'components/LayOut.vue'
import TypeArticleList from 'components/TypeArticleList.vue'

export default defineComponent({
  name: 'list',
  components: {
    LayOut,
    TopImage,
    TypeArticleList
  },
  setup() {
    const tabsTitle = reactive([
      {
        id: '0',
        tab: "全部",
      },
      {
        id: '1',
        tab: '技术', 
      },
      {
        id: '2',
        tab: '摄影',
      },
      {
        id: '3',
        tab: '生活',
      },
    ])

    return {
      tabsTitle
    }
  }

})
</script>

<style lang="scss">
  @import 'assets/config.scss';

</style>