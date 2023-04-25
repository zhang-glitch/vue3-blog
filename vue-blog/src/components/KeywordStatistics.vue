<template>
  <div class="keyword-statistics">
    <div class="keyword-statistics-wrapper container">
      <div class="row">
        <!-- 996px无 -->
        <!-- 右侧总体统计 -->
        <div class="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
          <el-card shadow="always" class="statistic-charts">
            <template #header>
              <div class="keyword-header">搜索关键词分析</div>
            </template>
            <div class="total-article-chart">
              <vue-echarts :option="keywordStatisticsOption"></vue-echarts>
            </div>
          </el-card>
        </div>
        <!-- 左侧分析 -->
        <div class="col-0 col-sm-0 col-md-0 col-lg-3 col-xl-3">
          <el-card shadow="always" class="keyword-list">
            <template #header>
              <div class="keyword-header">用户搜索关键词</div>
            </template>
            <div class="keyword-items">
              <el-tag
                class="keyword-item"
                style="cursor: pointer"
                :type="item.typeColor"
                v-for="item in keywordList"
                :key="item.id"
                @click="handleToSearch(item)"
                >{{ item.keyword }}</el-tag
              >
            </div>
          </el-card>
          <el-card
            shadow="always"
            class="keyword-list"
            style="margin-top: 20px"
          >
            <template #header>
              <div class="keyword-header">统计分析</div>
            </template>
            <div class="keyword-items">
              <div>
                通过数据分析，
                <el-tag
                  class="keyword-item"
                  :type="item.color"
                  v-for="item in types"
                  :key="item.type"
                >
                  {{ item.name }}类文章 被查询 {{ item.value }} 次
                </el-tag>
                我们发现用户更倾向查看
                <strong style="color: #eb5858">{{ maxLike }}</strong> 类文章。
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import request from '../http/request'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    // 获取搜索词列表
    const keywordList = ref([])
    const chartData = ref({
      name: '热门搜索分析',
      children: [],
    })
    const types = ref([
      {
        type: 1,
        value: 0,
        name: '技术',
        color: 'success',
      },
      {
        type: 2,
        value: 0,
        name: '摄影',
        color: 'danger',
      },
      {
        type: 3,
        value: 0,
        name: '生活',
        color: 'warning',
      },
    ])
    const maxLike = ref('')
    const getKeywordList = async () => {
      const _getKeywordList = await store.dispatch('getKeywordList')
      const data = _getKeywordList.keywordList
      const typesClor = ['success', 'info', 'warning', 'danger']

      // 数据处理
      for (let i = 0; i < data.length; i++) {
        data[i].typeColor = typesClor[i % typesClor.length]
        data[i].articles = []
        const article_ids = data[i].article_ids?.split(',')
        const type_ids = data[i].type_ids && data[i].type_ids.split(',')
        if (article_ids.length > 0) {
          for (const articleId of article_ids) {
            // 请求各个关键字列表文章
            const articleRes = await request({
              url: `/getArticleById?id=${articleId}`,
              method: 'get',
            })
            data[i].articles.push({ ...articleRes, name: articleRes?.title })
          }
        }

        // 统计分类
        if (type_ids && type_ids.length > 0) {
          for (const typeId of type_ids) {
            if (typeId == 1) {
              types.value[0].value++
            } else if (typeId == 2) {
              types.value[1].value++
            } else {
              types.value[2].value++
            }
          }
        }
        // console.log('types', types.value)

        const typeValues = [
          types.value[0].value,
          types.value[1].value,
          types.value[2].value,
        ]
        const maxType = typeValues.indexOf(Math.max(...typeValues))
        if (maxType + 1 == 1) {
          maxLike.value = '技术'
        } else if (maxType + 1 == 2) {
          maxLike.value = '摄影'
        } else if (maxType + 1 == 3) {
          maxLike.value = '生活'
        }
      }

      // 图标数据分析
      for (let item of data) {
        chartData.value.children.push({
          name: item.keyword,
          children: Array.isArray(item.articles) && [...item.articles], //title
        })
      }

      keywordList.value = data
    }

    getKeywordList()

    // 跳转到search页面
    const handleToSearch = function (item) {
      // 保存搜索关键词
      store.commit('getSearchValue', item.keyword)
      router.push(`/search?searchVal=${item.keyword}`)
    }

    const keywordStatisticsOption = ref({
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
      },
      series: [
        {
          type: 'tree',
          data: [chartData.value],
          left: '2%',
          right: '2%',
          top: '8%',
          bottom: '20%',
          symbol: 'emptyCircle',
          orient: 'vertical',
          expandAndCollapse: true,
          label: {
            position: 'top',
            rotate: 0,
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 9,
          },
          leaves: {
            label: {
              position: 'bottom',
              rotate: -90,
              verticalAlign: 'middle',
              align: 'left',
            },
          },
          animationDurationUpdate: 750,
        },
      ],
    })

    return {
      keywordList,
      handleToSearch,
      keywordStatisticsOption,
      types,
      maxLike,
    }
  },
})
</script>
<style  scoped lang="scss">
@import 'assets/config.scss';
.keyword-statistics {
  margin-top: 220px;
  width: 100%;
  /* height: 100%; */

  .keyword-statistics-wrapper {
    justify-content: space-between;

    .total-article-chart {
      width: 100%;
      height: 330px;
      .echarts {
        width: 100%;
        height: 100%;
      }
    }

    .keyword-header {
      font-size: 16px;
      color: $primary-color;
      font-weight: 600;
      letter-spacing: 2px;
    }
    .keyword-items {
      display: flex;
      flex-wrap: wrap;
      /* justify-content: space-between; */
      margin-right: 10px;
    }
    .keyword-item {
      margin-bottom: 10px;
      font-size: 14px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      margin-right: 15px;
    }
  }
}
</style>