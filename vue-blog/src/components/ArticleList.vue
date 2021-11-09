<template>
  <div class="article-list">
    <div class="article-wrapper container">
      <div class="row">
        <div class="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
          <el-card shadow="always">
            <el-tabs @tab-click="onTabClick"
                     v-model="navIndex">
              <el-tab-pane :label="item.tab"
                           v-for="item in tabsTitle"
                           :key="item.id">
                <article-list-item v-for="element in articleList"
                                   :key="element?.id"
                                   :article="element"></article-list-item>
                <load-more @handleLoadMore="handleLoadMore"
                           :isLoadMore="isLoadMore"></load-more>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
        <div class="col-0 col-sm-0 col-md-0 col-lg-3 col-xl-3 asist-bar">
          <blog-author></blog-author>
          <School />
          <Advert />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import ArticleListItem from './ArticleListItem.vue'
import BlogAuthor from './BlogAuthor.vue'
import School from './School.vue'
import Advert from './Advert.vue'
import LoadMore from './LoadMore.vue'

export default defineComponent({
  name: 'ArticleList',
  props: {
    tabsTitle: {
      type: Array,
      default() {
        return ['最新', '热门']
      },
    },
  },
  components: {
    ArticleListItem,
    BlogAuthor,
    School,
    Advert,
    LoadMore,
  },

  setup() {
    // 每页最多限制
    const size = ref(5)
    // 页码
    const num = ref(1)
    const articleList = ref([])
    const store = useStore()
    // 保存当前tab栏活跃下表
    const activeIndex = ref('0')

    // 请求数据
    const getArticleList = async (dispatchName) => {
      const _articleList = await store.dispatch(dispatchName, {
        pageSize: size.value,
        pageNum: num.value,
      })
      articleList.value = _articleList.articleData
    }

    // 先发送请求，防止数据缺失
    getArticleList('getAllNewArticleList')

    // 加载更多的数据请求
    const getMoreArticleList = async (dispatchName) => {
      const _articleList = await store.dispatch(dispatchName, {
        pageSize: size.value,
        pageNum: num.value,
      })

      // 将最后一条数据插入到文章列表中
      articleAllCount.value > articleList.value.length &&
        articleList.value.push(..._articleList.articleData)
    }
    const onTabClick = async (val) => {
      // 每次切换tab栏时，显示加载更多按钮
      isLoadMore.value = true
      // 切换tab时，重置num值
      num.value = 1
      // 拿到选项卡的当前实例index
      const { index } = val // 0, 1
      activeIndex.value = index
      if (index === '0') {
        // 当index===0时，渲染最新的列表组件
        //请求
        getArticleList('getAllNewArticleList')
      } else if (index === '1') {
        // 当index===1时，渲染热度排序的列表组件
        //请求
        getArticleList('getAllHeatArticleList')
      }
    }

    // 获取文章总数
    const articleAllCount = computed(() => store.state.count)
    const isLoadMore = ref(true)

    // 处理加载更多
    const handleLoadMore = () => {
      num.value = num.value + 1
      // 发送请求，处理数据
      if (activeIndex.value == 0) {
        // 加载最新列表
        getMoreArticleList('getAllNewArticleList')
      } else {
        // 加载热度列表
        getMoreArticleList('getAllHeatArticleList')
      }

      // 如果文章总数大于文章列表总数。则加载更多。否者不显示
      if (articleAllCount.value > articleList.value.length) {
        isLoadMore.value = true
      } else {
        isLoadMore.value = false
      }
    }
    return {
      onTabClick,
      articleList,
      handleLoadMore,
      isLoadMore,
    }
  },
})
</script>

<style lang="scss">
@import 'assets/config.scss';
.article-list {
  margin-top: 20px;
  margin-bottom: 100px;

  .article-wrapper {
    .more {
      text-align: center;
      .el-divider--horizontal {
        width: 70%;
        margin: 70px auto 30px;
        .el-divider__text {
          color: $text-color-secondary;
        }
      }
    }
    .el-tabs__active-bar {
      display: none !important;
    }

    .el-tabs__item {
      font-size: 16px;
    }
    .el-tabs__item:hover {
      font-weight: bold;
    }
    .el-tabs__item.is-active {
      font-weight: bold;
    }
  }
}

// 当小于992px时，隐藏侧边栏
@media screen and (max-width: 992px) {
  .asist-bar {
    display: none;
  }
}
</style>
