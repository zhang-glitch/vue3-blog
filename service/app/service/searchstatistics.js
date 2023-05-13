'use strict'

const { Service } = require('egg')
const fs = require('fs')

class SearchStatistics extends Service {
  // 更新文章查询
  async updateSearchKeyword(params) {
    const { ctx } = this
    // const { like } = app.Sequelize.Op

    const res = await ctx.model.Searchstatistics.findOne({
      where: {
        // 模糊查询
        // keyword: {
        //   [like]: `%${params.keyWord}%`
        // }
        keyword: params.keyword
      }
    })
    if (res) {
      // 更新
      res.update({
        search_count: res.search_count + 1,
        article_ids: params.article_ids,
        article_count: params.article_count,
        type_ids: params.type_ids
      })
    } else {
      // 创建
      await ctx.model.Searchstatistics.create({
        ...params,
        search_count: 1
      })
    }
    return res
  }

  // 查询查询的关键词，做数据分析
  async getKeywordStatistics() {
    const { ctx } = this
    const res = await ctx.model.Searchstatistics.findAll({
      order: [[ 'search_count', 'DESC' ]]
    })
    if (res) {
      for (let i = 0; i < res.length; i++) {
        res[i].dataValues.articles = [ ]
        const article_ids = res[i].article_ids.split(',')
        if (article_ids.length > 0) {
          // 并发请求文章标题
          const articleRes = await Promise.all(article_ids.map(articleId => ctx.service.list.getArticleNameById(articleId)))

          if (articleRes) {
            res[i].dataValues.articles = articleRes
          }
        }
      }
    }
    return res
  }
}

module.exports = SearchStatistics
