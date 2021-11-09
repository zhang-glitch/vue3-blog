<template>
  <div class="new-article-list">
    <div v-if="!isEmpty">
      <!-- 这里传入的item有问题 -->
      <article-list-item :article="item" v-for="item in articleList" :key="item.id"></article-list-item>
    </div>
    <el-empty image="/empty.png" description="亲，暂时还没有文章哦 ~" v-else></el-empty>

    <!-- 点击加载更多 -->
    <div class="more" v-if="isAppearMore">
      <el-button plain v-if="isMore" @click="onLoadMore">加载更多</el-button>
      
      <el-divider class="more-divider" v-else>亲, 暂时只有这么多了</el-divider>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import {useStore} from 'vuex'
import ArticleListItem from '../ArticleListItem.vue'
import useLoadMore from 'hooks/useLoadMore.js'
import useAppearMore from 'hooks/useAppearMore.js'

export default defineComponent({
  name: 'NewArticleList',
  components: {
    ArticleListItem
  },
  setup() {
    // 判断加载更多是否显示
    const isMore = ref(true);
    //  判断是否有数据
    const isEmpty = ref(true);
    // 是否出现加载更多和文字说明
    const isAppearMore = ref(false)
    const newSize = ref(5);
    // 获取文章总数
    const store = useStore();
    let articleList = ref([])
    const articleTotal = computed(() => store.state.articleTotal); 
    // 获取最新文章
    store.dispatch('getNewArticleList', {size: newSize.value}).then(res => {
      articleList.value = res;
      if(res.length) {
        isEmpty.value = false
      }else {
        isEmpty.value = true
      }

      
      const {appearMore} = useAppearMore(isEmpty, articleList, newSize)
      isAppearMore.value = appearMore.value
    })
    

    // 判断是否有加载更多按钮
    // const onLoadMore = async () => {
    //   newSize.value++;
    //   articleList.value = await store.dispatch('getNewArticleList', {size: newSize.value})
    //   // 当请求的条数大于文章总数时，隐藏
    //   if(newSize.value >= articleTotal.value) {
    //     isMore.value = false
    //   }else {
    //     isMore.value = true
    //   }
    // }
    const onLoadMore = useLoadMore(articleList, "getNewArticleList", articleTotal, isMore, {size: newSize})
    return {
      articleList,
      isEmpty,
      onLoadMore,
      isMore,
      isAppearMore
    }
  }
})
</script>

<style lang="scss">
  
</style>