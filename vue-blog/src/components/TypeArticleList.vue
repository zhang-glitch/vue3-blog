<template>
  <div class="article-list">
    <div class="article-wrapper container">
      <div class="row">
        <div class="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
          <el-card class="list-card">
            <template #header>
              <div class="list-menu-wrapper row">
                <!-- 文章tabs标题menu -->
                <div class="card-header-left col-md-8">
                  <el-menu
                    class="list-menu"
                    :default-active="listActiveIndex"
                    mode="horizontal"
                    @select="handleSelect"
                  >
                    <el-menu-item
                      v-for="item in tabsTitle"
                      :key="item.id"
                      :index="item.id + ''"
                    >
                      <i :class="item.iconName"></i>
                      <span class="item-tab-title">{{ item.tab }}</span>
                    </el-menu-item>
                  </el-menu>
                </div>
                <!-- 切换文章列表排序按钮 -->
                <div class="card-header-right col-md-4">
                  <i class="iconfont iconqiehuan"></i>
                  <span class="change-rank-way" @click="handleRankWay">{{
                    rankTitle
                  }}</span>
                </div>
              </div>
            </template>
            <!-- 列表部分 -->
            <template v-if="articleList.length">
              <article-list-item
                v-for="item in articleList"
                :key="item.id"
                :article="item"
              ></article-list-item>
              <load-more
                @handleLoadMore="handleLoadMore"
                :isLoadMore="isLoadMore"
              ></load-more>
            </template>
            <!-- 没有数据 -->
            <el-empty
              v-else
              image="/empty.png"
              description="暂无数据"
            ></el-empty>
          </el-card>
        </div>
        <div class="col-0 col-sm-0 col-md-0 col-lg-3 col-xl-3 asist-bar" v-if="!isMobile()">
          <blog-author></blog-author>
          <School />
          <Advert />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import BlogAuthor from './BlogAuthor.vue'
import ArticleListItem from './ArticleListItem.vue'
import School from './School.vue'
import Advert from './Advert.vue'
import LoadMore from './LoadMore.vue'
import isMobile from '../util/isMobile'

export default defineComponent({
  name: 'ArticleList',
  components: {
    BlogAuthor,
    ArticleListItem,
    School,
    Advert,
    LoadMore,
  },
  setup() {
    // 列表tab栏活跃下标
    const listActiveIndex = ref(0)
    const tabsTitle = reactive([
      {
        id: 0,
        tab: '全部',
        iconName: '',
      },
      {
        id: 1,
        tab: '技术',
        iconName: 'el-icon-monitor',
      },
      {
        id: 2,
        tab: '摄影',
        iconName: 'el-icon-camera',
      },
      {
        id: 3,
        tab: '生活',
        iconName: 'el-icon-hot-water',
      },
    ])

    // 当tab栏改变时。
    const size = ref(5)
    const num = ref(1)
    const handleSelect = (index) => {
      // 改变活跃下标
      listActiveIndex.value = index
      // 每次切换tab栏时，显示加载更多按钮
      isLoadMore.value = true
    }

    // 监听listActiveIndex的变化，来请求对应的数据
    watch(listActiveIndex, (index) => {
      // 切换tab时，重置num值
      num.value = 1
      if (index == 0) {
        // 请求全部数据
        getArticleList('getAllNewArticleList', {
          pageSize: size.value,
          pageNum: num.value,
        })
      } else {
        // 根据id来请求对应的最新数据
        getArticleList('getNewArticleList', {
          pageSize: size.value,
          id: index,
          pageNum: num.value,
        })
      }
    })

    // 请求数据
    const articleList = ref([])
    const store = useStore()
    const getArticleList = async (dispatchName, params) => {
      const _articleList = await store.dispatch(dispatchName, params)
      articleList.value = _articleList.articleData

      // 判断是否有加载更多
      if(_articleList?.articleData?.length < size.value) {
        isLoadMore.value = false
      }else {
        isLoadMore.value = true
      }
    }

    // 获取第一次的请求
    const route = useRoute()
    listActiveIndex.value = route.query.type
    getArticleList('getNewArticleList', {
      pageSize: size.value,
      pageNum: num.value,
      id: route.query.type,
    })

    // 加载更多的数据请求
    const getMoreArticleList = async (dispatchName, params) => {
      const _articleList = await store.dispatch(dispatchName, params)

      // 将最后一条数据插入到文章列表中
      articleAllCount.value > articleList.value.length &&
        articleList.value.push(..._articleList.articleData)

      // 判断是否有加载更多
      if(_articleList?.articleData?.length < size.value) {
        isLoadMore.value = false
      }else {
        isLoadMore.value = true
      }
    }

    // 改变列表排列方式,默认为最新排列，为0
    const rankIndex = ref(0)
    const rankTitle = ref('切换为热门排序')
    const handleRankWay = () => {
      // 每次切换tab栏时，显示加载更多按钮
      // isLoadMore.value = true
      // 切换排序方式时，重置num值
      num.value = 1
      // rankIndex 0 最新
      // rankIndex 1 热门
      if (rankIndex.value == 0) {
        // rankTitle.value = '切换为热门排序'
        rankTitle.value = '切换为时间排序'
        rankIndex.value = 1
        // // 这里请求会有问题，因为用了if判断。用watch
        // if (listActiveIndex.value === 0) {
        //   getArticleList('getAllNewArticleList', {
        //     pageSize: size.value,
        //     pageNum: num.value,
        //   })
        // } else {
        //   getArticleList('getNewArticleList', {
        //     pageSize: size.value,
        //     id: listActiveIndex.value,
        //     pageNum: num.value,
        //   })
        // }
      } else {
        // rankTitle.value = '切换为时间排序'
        rankTitle.value = '切换为热门排序'
        rankIndex.value = 0
        // if (listActiveIndex.value === 0) {
        //   console.log('=========全部数据的热门请求')
        //   getArticleList('getAllHeatArticleList', {
        //     pageSize: size.value,
        //     pageNum: num.value,
        //   })
        // } else {
        //   console.log(
        //     '=========全部数据的热门请求3333333333',
        //     listActiveIndex.value
        //   )
        //   getArticleList('getHeatArticleList', {
        //     pageSize: size.value,
        //     id: listActiveIndex.value,
        //     pageNum: num.value,
        //   })
        // }
      }
    }

    // 用watch来监听排序的变化，请求相应的数据(这个想法好牛逼)
    watch(rankIndex, (index) => {
      if (listActiveIndex.value == 0) {
        // 这里是请求全部的文章列表.这里只要不等于1,2,3就行
        if (index == 0) {
          getArticleList('getAllNewArticleList', {
            pageSize: size.value,
            pageNum: num.value,
          })
        } else {
          getArticleList('getAllHeatArticleList', {
            pageSize: size.value,
            pageNum: num.value,
          })
        }
      } else {
        // 这里是请求分类的文章列表
        if (index == 0) {
          console.log("======", index, "最新")
          getArticleList('getNewArticleList', {
            pageSize: size.value,
            id: listActiveIndex.value,
            pageNum: num.value,
          })
        } else {
          getArticleList('getHeatArticleList', {
            pageSize: size.value,
            id: listActiveIndex.value,
            pageNum: num.value,
          })
        }
      }
    })

    // 路由守卫
    const router = useRouter()
    router.beforeEach((to, from, next) => {
      // 切换tab时，重置num值
      num.value = 1
      // 是list-tab和上面的tab栏联动
      listActiveIndex.value = to.query.type
      getArticleList('getNewArticleList', {
        pageSize: size.value,
        pageNum: num.value,
        id: to.query.type,
      })
      next()
    })

    // 获取文章总数
    const articleAllCount = computed(() => store.state.count)
    const isLoadMore = ref(true)

    // 处理加载更多
    const handleLoadMore = () => {
      num.value = num.value + 1
      // 发送请求，处理数据,全部文章
      if (listActiveIndex.value == 0) {
        if (rankIndex.value == 0) {
          // 0表示最新，1表示热度
          // 加载最新列表
          getMoreArticleList('getAllNewArticleList', {
            pageSize: size.value,
            pageNum: num.value,
          })
        } else {
          // 加载热度列表
          getMoreArticleList('getAllHeatArticleList', {
            pageSize: size.value,
            pageNum: num.value,
          })
        }
      } else {
        // 处理分类文章
        if (rankIndex.value == 0) {
          // 加载最新列表
          getMoreArticleList('getNewArticleList', {
            pageSize: size.value,
            pageNum: num.value,
            id: listActiveIndex.value,
          })
        } else {
          // 加载热度列表
          getMoreArticleList('getHeatArticleList', {
            pageSize: size.value,
            pageNum: num.value,
            id: listActiveIndex.value,
          })
        }
      }

      // // 如果文章总数大于文章列表总数。则加载更多。否者不显示
      // if (articleAllCount.value > articleList.value.length) {
      //   isLoadMore.value = true
      // } else {
      //   isLoadMore.value = false
      // }
    }

    return {
      listActiveIndex,
      tabsTitle,
      handleSelect,
      handleRankWay,
      rankTitle,
      articleList,
      handleLoadMore,
      isLoadMore,
      isMobile
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
    .list-card {
      .el-empty__description {
        letter-spacing: 5px;
      }

      .list-menu-wrapper {
        .card-header-left {
          .list-menu {
            &.el-menu--horizontal {
              border-bottom: 0px;

              .el-menu-item.is-active {
                border-bottom: 0px !important;
                font-weight: 600;
                color: rgb(235, 88, 88);
              }
            }

            .el-menu-item {
              font-size: 16px;
              margin-bottom: -17px;
              border-bottom: 0px !important;

              .item-tab-title {
                margin-top: 1px;
              }
            }
          }
        }

        .card-header-right {
          padding-top: 8px;
          text-align: end;
          padding-right: 30px;
          line-height: 46px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s;
          color: #909399;
          .change-rank-way {
            margin-left: 10px;
          }
          &:hover {
            color: #40a9ff;
          }
        }
      }
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
