<template>
  <div class="keyword-statistics">
    <div class="total-article-chart">
      <vue-echarts :option="keywordStatisticsOption"></vue-echarts>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import request from '../http/request'

export default defineComponent({
  setup() {
    const store = useStore()
    // 获取搜索词列表
    const keywordList = ref([])
    const chartData = ref({
      name: '热门搜索分析',
      children: [],
    })

    const getKeywordList = async () => {
      const _getKeywordList = await store.dispatch('getKeywordList')
      const data = _getKeywordList.keywordList
      const typesClor = ['success', 'info', 'warning', 'danger']

      // 数据处理
      for (let i = 0; i < data.length; i++) {
        data[i].typeColor = typesClor[i % typesClor.length]
        data[i].articles = []
        const article_ids = data[i].article_ids?.split(',')
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
            position: 'left',
            rotate: 0,
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 14,
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
      keywordStatisticsOption,
    }
  },
})
</script>
<style  scoped lang="scss">
@import '../assets/config.scss';
.keyword-statistics {
  width: 100%;
  height: 100%;
  position: relative;
  margin-top: 20px;

  .total-article-chart {
    position: absolute;
    width: 100%;
    height: 100%;
    .echarts {
      width: 100%;
      height: 100%;
    }
  }
}
</style>