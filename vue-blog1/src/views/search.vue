<template>
  <lay-out>
    <div class="wrap">
      <!-- 头部背景 -->
      <top-image imgUrl="/detail-bg.jpg">
      </top-image>

      <div class="search-page wrap container">
        <div class="row">
          <div class="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
            <el-card>
              <template #header>
                <p class="search-result">
                  <i class="el-icon-search"></i>
                  搜索结果
                </p>
              </template>
              <div v-if="!isEmpty">
                <!-- 这里传入的item有问题 -->
                <article-list-item :article="item"
                                   v-for="item in searchArticleList"
                                   :key="item.id"></article-list-item>
              </div>
              <el-empty image="/empty.png"
                        description="亲，暂时还没有文章哦 ~"
                        v-else></el-empty>

              <!-- 点击加载更多 -->
              <div class="more"
                   v-if="isAppearMore">
                <el-button plain
                           v-if="isMore"
                           @click="onLoadMore">加载更多</el-button>

                <el-divider class="more-divider"
                            v-else>亲, 暂时只有这么多了</el-divider>
              </div>
            </el-card>
          </div>
          <div class="col-0 col-sm-0 col-md-0 col-lg-3 col-xl-3 asist-bar">
            <blog-author></blog-author>
          </div>
        </div>
      </div>
    </div>
  </lay-out>
</template>

<script>
import { computed, defineComponent, ref, watch } from 'vue'
import TopImage from 'components/TopImage.vue'
import LayOut from 'components/LayOut.vue'
import ArticleListItem from 'components/ArticleListItem.vue'
import BlogAuthor from 'components/BlogAuthor.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import useLoadMore from 'hooks/useLoadMore.js'
import useAppearMore from 'hooks/useAppearMore.js'

export default defineComponent({
  name: 'search',
  components: {
    LayOut,
    TopImage,
    ArticleListItem,
    BlogAuthor,
  },
  setup() {
    const store = useStore()
    const searchArticleList = ref([])
    const route = useRoute()
    // 请求条数约束
    const searchSize = ref(5)
    // 是否显示加载更多
    const isMore = ref(true)
    //  判断是否有数据
    const isEmpty = ref(true)
    // 是否出现加载更多和文字说明
    const isAppearMore = ref(false)
    // 获取搜索到的文章总数
    const searchArticleCount = computed(() => store.state.searchArticleCount)
    // 发送请求，获取文章
    watch(
      () => route.query.searchVal,
      () => {
        store
          .dispatch('getSearchArticleList', {
            searchVal: route.query.searchVal,
            size: searchSize.value,
          })
          .then((res) => {
            searchArticleList.value = res
            // 判断文章是否为空
            if (res && res.length) {
              isEmpty.value = false
            } else {
              isEmpty.value = true
            }

            const { appearMore } = useAppearMore(
              isEmpty,
              searchArticleList,
              searchSize
            )
            isAppearMore.value = appearMore.value
          })
      }
    )

    // 加载更多
    // const onLoadMore = async () => {
    //   // 增加请求条数
    //   searchSize.value++;

    //   searchArticleList = await store.dispatch("getSearchArticleList", {searchVal: route.query.searchVal, size: searchSize.value})

    //   if(searchSize.value >= searchArticleCount.value) {
    //     isMore.value = false
    //   }else {
    //     isMore.value = true
    //   }
    // }
    const onLoadMore = useLoadMore(
      searchArticleList,
      'getSearchArticleList',
      searchArticleCount,
      isMore,
      { searchVal: route.query.searchVal, size: searchSize }
    )

    return {
      searchArticleList,
      onLoadMore,
      isMore,
      isEmpty,
      isAppearMore,
    }
  },
})
</script>

<style lang="scss">
@import 'assets/config.scss';
.search-page {
  margin-bottom: 80px;
  .search-result {
    font-size: 16px;
    font-weight: 600;
    color: $primary-color;
    i {
      padding-right: 3px;
      padding-left: 5px;
    }
  }

  // 加载更多
  .more {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 50px;
  }
}

// 当小于992px时，隐藏侧边栏
@media screen and (max-width: 992px) {
  .asist-bar {
    display: none;
  }
}
</style>
