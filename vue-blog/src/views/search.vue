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
                <div class="search-header">
                  <p class="search-result">
                    <i class="el-icon-search"></i>
                    搜索结果
                  </p>
                  <p class="search-operate">
                    <i class="iconfont iconqiehuan"></i>
                    <span class="change-rank-way"
                          @click="handleRankWay">{{rankTitle}}</span>
                  </p>
                </div>
              </template>
              <template v-if="searchArticleList.length">
                <article-list-item :article="item"
                                   v-for="item in searchArticleList"
                                   :key="item.id"
                                   :searchVal="route.query.searchVal"></article-list-item>
                <load-more @handleLoadMore="handleLoadMore"
                           :isLoadMore="isLoadMore"></load-more>
              </template>
              <el-empty image="/empty.png"
                        description="亲，暂时还没有文章哦 ~"
                        v-else></el-empty>

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
import { defineComponent, ref, watch, computed } from 'vue'
import TopImage from 'components/TopImage.vue'
import LayOut from 'components/LayOut.vue'
import ArticleListItem from 'components/ArticleListItem.vue'
import BlogAuthor from 'components/BlogAuthor.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import LoadMore from '../components/LoadMore.vue'

export default defineComponent({
  name: 'search',
  components: {
    LayOut,
    TopImage,
    ArticleListItem,
    BlogAuthor,
    LoadMore,
  },
  setup() {
    const store = useStore()
    const searchArticleList = ref([])
    const route = useRoute()
    // 请求条数约束
    const size = ref(5)
    const num = ref(1)
    // 获取搜索到的文章
    const getArticleList = async (dispatchName) => {
      // 最新排列
      const _article = await store.dispatch(dispatchName, {
        keyWord: route.query.searchVal,
        pageSize: size.value,
        pageNum: num.value,
      })

      searchArticleList.value = _article.articleData
    }
    getArticleList('getSearchNewList')

    // 加载更多的数据请求
    const getMoreArticleList = async (dispatchName) => {
      const _articleList = await store.dispatch(dispatchName, {
        keyWord: route.query.searchVal,
        pageSize: size.value,
        pageNum: num.value,
      })
      // 将最后一条数据插入到文章列表中
      _articleList.count > searchArticleList.value.length &&
        searchArticleList.value.push(..._articleList.articleData)
    }

    // 发送请求，获取文章。关键字变化，重新请求
    watch(
      () => route.query.searchVal,
      () => {
        getArticleList('getSearchNewList')
      }
    )

    // 改变列表排列方式,默认为最新排列
    const rankIndex = ref(1)
    const rankTitle = ref('切换为热门排序')
    const handleRankWay = () => {
      // 切换时,修改isLoadMore为true
      isLoadMore.value = true
      // 切换排列方式时，重置num值
      num.value = 1
      if (rankIndex.value == 0) {
        rankTitle.value = '切换为热门排序'
        rankIndex.value = 1
        // 请求最新数据
        getArticleList('getSearchNewList')
      } else {
        rankTitle.value = '切换为时间排序'
        rankIndex.value = 0
        // 请求热门
        getArticleList('getSearchHeatList')
      }
    }

    // 获取文章总数
    const articleAllCount = computed(() => store.state.count)
    const isLoadMore = ref(true)

    // 处理加载更多
    const handleLoadMore = () => {
      num.value = num.value + 1
      // 发送请求，处理数据
      if (rankIndex.value == 0) {
        // 加载最新列表
        getMoreArticleList('getSearchNewList')
      } else {
        // 加载热度列表
        getMoreArticleList('getSearchHeatList')
      }

      // 如果文章总数大于文章列表总数。则加载更多。否者不显示
      if (articleAllCount.value > searchArticleList.value.length) {
        isLoadMore.value = true
      } else {
        isLoadMore.value = false
      }
    }

    return {
      searchArticleList,
      handleRankWay,
      rankTitle,
      handleLoadMore,
      isLoadMore,
      route,
    }
  },
})
</script>

<style lang="scss">
@import 'assets/config.scss';
.search-page {
  margin-bottom: 80px;

  .search-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search-result {
      font-size: 16px;
      font-weight: 600;
      color: $primary-color;
      i {
        padding-right: 3px;
        padding-left: 5px;
      }
    }

    .search-operate {
      padding-right: 20px;
      cursor: pointer;
      transition: all 0.3s;
      color: #909399;
      font-size: 14px;
      .change-rank-way {
        margin-left: 10px;
      }
      &:hover {
        color: #40a9ff;
      }
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
