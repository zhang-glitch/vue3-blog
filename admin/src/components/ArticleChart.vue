<template>
  <div class="article-chart">
    <vue-echarts :option="lineOption"
                 class="line-option"></vue-echarts>
    <vue-echarts :option="calendarOption"
                 class="calendar-chart"></vue-echarts>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import * as echarts from 'echarts'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'ArticleChart',
  setup() {
    const calendarOption = ref({})
    const lineOption = ref({})
    const store = useStore()
    const getArticleList = async () => {
      const data = await store.dispatch('getArticleList', {})
      // console.log('data', data)
      const articleData = []
      for (let i in data.articleData) {
        articleData.push([
          echarts.format.formatTime('yyyy-MM-dd', data.articleData[i].addTime),
          data.articleData[i].view_count,
        ])
      }

      calendarOption.value = {
        calendar: [
          {
            top: 50,
            left: 80,
            right: 40,
            bottom: 10,
            // 必填，日历坐标的范围
            range: [`2021-01-01`, `2021-12-31`],
            // 设置日历坐标分隔线的样式。
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgb(127, 127, 127)',
              },
            },
            // 设置日历坐标中 年的样式
            yearLabel: { show: false },
            // 设置日历坐标中 星期轴的样式。即竖轴（y轴）
            dayLabel: {
              color: 'rgb(127, 127, 127)',
              fontSize: 18,
            },
            // 设置日历坐标中 月份轴的样式。即横轴（x轴）
            monthLabel: {
              color: 'rgb(127, 127, 127)',
              fontSize: 18,
            },
            // 设置日历格的样式
            itemStyle: {
              // 日历图标的整体颜色
              color: 'rgb(48, 48, 48)',
              // 日历项的边框宽度
              borderWidth: 1,
              // 边框颜色
              borderColor: 'rgb(48, 48, 48)',
            },
          },
        ],
        series: [
          {
            // 散点图
            type: 'scatter',
            // 该系列使用的坐标系默认为二维坐标系（cartesian2d）
            coordinateSystem: 'calendar',
            // 二维数组。[[日期, 值]]
            data: articleData,
            // 散点的大小。val表示data中的数据值
            symbolSize: function (val) {
              // console.log("val", val)
              return val[1] / 600
            },
            // 散点的样式
            itemStyle: {
              color: 'rgb(208,248,138)',
            },
          },
          {
            // 突出散点图。
            type: 'effectScatter',
            coordinateSystem: 'calendar',
            // 表示突出的数据项
            data: articleData
              .sort(function (a, b) {
                return b[1] - a[1]
              })
              .slice(0, 12),
            symbolSize: function (val) {
              return val[1] / 50
            },
            // 配置何时显示特效。
            showEffectOn: 'render',
            // 涟漪特效相关配置。
            rippleEffect: {
              // 波纹的绘制方式
              brushType: 'stroke',
            },
            hoverAnimation: true,
            // 散点图样式
            itemStyle: {
              color: 'rgb(208,248,138)',
              shadowBlur: 10,
              shadowColor: '#333',
            },
            // zlevel大的部分会放在zlevel小的上面
            zlevel: 1,
          },
        ],
      }

      lineOption.value = {
        title: {
          text: 'H-M网站统计',
          subtext: '文章统计日历',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          formatter(params) {
            return `访问量: ${params[0].value[1]}`
          },
        },
        dataset: { source: articleData },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            encode: { x: 0, y: 1 },
            type: 'line',
            smooth: true,
          },
        ],
      }
    }
    getArticleList()

    return {
      calendarOption,
      lineOption,
    }
  },
})
</script>

<style lang="scss">
.article-chart {
  width: 100%;
  height: 100%;
  .line-option {
    width: 100%;
    height: 50%;
  }
  .calendar-chart {
    width: 100%;
    height: 40%;
  }
}
</style>
