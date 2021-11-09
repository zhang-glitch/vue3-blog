<template>
  <div class="total-chart">
    <div class="total-article-chart">
      <vue-echarts :option="articleOption"></vue-echarts>
    </div>
    <div class="comment-response-chart">
      <vue-echarts :option="commentResponseOption"></vue-echarts>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import request from '../http/request'
export default defineComponent({
  name: 'TotalChart',
  setup() {
    const articleOption = ref({})
    const commentResponseOption = ref({})
    const getTotalChartData = async () => {
      const _data = await request({
        url: '/admin/totalChartCount',
        method: 'get',
      })

      const articleData = [
        {
          value: _data.skillArticleCount,
          name: '技术类文章数',
        },
        {
          value: _data.photographyArticleCount,
          name: '摄影类文章数',
        },
        {
          value: _data.lifeArticleCount,
          name: '生活类文章数',
        },
      ]

      articleOption.value = {
        title: [
          {
            text: 'H-M网站统计',
            subtext: '文章部分',
            left: 'center',
          },
          {
            text: `文章总数`,
            subtext: _data.articleCount,
            textStyle: {
              fontSize: 14,
              color: '#999',
            },
            subtextStyle: {
              fontSize: 28,
              color: '#000',
              fontWeight: 700,
            },
            //文字水平方向的对齐方式
            textAlign: 'center',
            textVerticalAlign: 'middle',
            x: '49.5%',
            y: '47.5%',
          },
        ],
        tooltip: {
          trigger: 'item',
        },
        legend: {
          type: 'scroll',
          // 竖直排列
          orient: 'vertical',
          right: 80,
          top: 110,
          // 每一个label间距
          itemGap: 20,
        },
        series: [
          {
            name: '网站统计',
            type: 'pie',
            radius: ['20%', '40%'],
            avoidLabelOverlap: false,
            // 图形上的文本标签，可用于说明图形的一些数据信息
            label: {
              show: true,
              position: 'outter',
              formatter: (params) => {
                return params.data.name
              },
            },
            labelLine: {
              show: true,
            },
            itemStyle: {
              borderWidth: 4,
              // 每一项的边框，设置白色即是障眼法
              borderColor: '#fff',
            },
            data: articleData,
          },
        ],
      }
    }

    getTotalChartData()

    const getTotalCommentData = async () => {
      const _data = await request({
        url: '/admin/getCommentResponseCountByArticleId',
        method: 'get',
      })

      const { commentCount, responseCount } = await request({
        url: '/admin/totalChartCount',
        method: 'get',
      })
      // 处理数据
      // 评论数据
      const _commentData = _data.commentCount
      const commentData = []
      for (let i in _commentData) {
        if (_commentData[i].type_id === 1) {
          commentData[0] = _commentData[i].commentCount
        } else if (_commentData[i].type_id === 2) {
          commentData[1] = _commentData[i].commentCount
        } else if (_commentData[i].type_id === 3) {
          commentData[2] = _commentData[i].commentCount
        }
        commentData[3] = commentCount
      }
      // 评论回复
      const _responseData = _data.responseCount
      const responseData = []
      for (let i in _responseData) {
        if (_responseData[i].type_id === 1) {
          responseData[0] = _responseData[i].responseCount
        } else if (_responseData[i].type_id === 2) {
          responseData[1] = _responseData[i].responseCount
        } else if (_responseData[i].type_id === 3) {
          responseData[2] = _responseData[i].responseCount
        }
        responseData[3] = responseCount
      }

      commentResponseOption.value = {
        title: {
          text: 'H-M网站统计',
          subtext: '文章评论',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: ['评论', '回复'],
          type: 'scroll',
          right: 80,
          top: 20,
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '10%',
          top: '10%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: ['技术', '摄影', '生活', '评论回复总数'],
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
        },
        series: [
          {
            name: '评论',
            type: 'bar',
            data: commentData,
          },
          {
            name: '回复',
            type: 'bar',
            data: responseData,
          },
        ],
      }
    }

    getTotalCommentData()
    return {
      articleOption,
      commentResponseOption,
    }
  },
})
</script>

<style lang="scss">
.total-chart {
  width: 100%;
  height: 100%;
  display: flex;

  .total-article-chart {
    width: 50%;
    height: 100%;
  }

  .comment-response-chart {
    width: 50%;
    height: 100%;
  }
}
</style>
