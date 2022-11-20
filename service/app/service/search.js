'use strict'

const { Service } = require('egg')

class Search extends Service {
  // 最新排列
  async getSearchNewList(params) {
    const { ctx, app } = this
    const { like } = app.Sequelize.Op
    console.log('params', params)
    const res = await ctx.model.List.findAll({
      where: {
        // 模糊查询
        title: {
          [like]: `%${params.keyWord}%`
        }
      },
      limit: +params.pageSize, // 5
      offset: (+params.pageNum - 1) * params.pageSize,
      include: [
        {
          model: app.model.Type,
          as: 'type'
        }
      ],
      order: [['addTime', 'DESC']]
    })
    const article_ids = []
    const type_ids = []
    if (res && res.length > 0) {
      for (const artileItem of res) {
        article_ids.push(artileItem.id)
        type_ids.push(artileItem.type_id)
      }
    }
    // 这里统计一下用户搜索的关键词次数，然后做数据分析
    await ctx.service.searchstatistics.updateSearchKeyword({
      keyword: params.keyWord,
      article_ids: article_ids.join(','),
      article_count: res.length,
      type_ids: type_ids.join(',')
    })
    console.log('res', res)
    return res
  }

  // 热度排列
  async getSearchHeatList(params) {
    const { ctx, app } = this
    const { like } = app.Sequelize.Op

    const res = await ctx.model.List.findAll({
      where: {
        // 模糊查询
        title: {
          [like]: `%${params.keyWord}%`
        }
      },
      limit: +params.pageSize, // 5
      offset: (+params.pageNum - 1) * params.pageSize,
      include: [
        {
          model: app.model.Type,
          as: 'type'
        }
      ],
      order: [['view_count', 'DESC']]
    })
    return res
  }

  async getSearchArticleCount(keyWord) {
    const { ctx, app } = this
    const { like } = app.Sequelize.Op
    const { count } = await ctx.model.List.findAndCountAll({
      where: {
        // 模糊查询
        title: {
          [like]: '%' + keyWord + '%'
        }
      }
    })
    return { count }
  }
}

module.exports = Search
