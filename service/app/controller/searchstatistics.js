'use strict'

const BaseController = require('./baseController')

class SearchStatistics extends BaseController {
  // 对于用户搜索文章的统计用户喜爱
  async getSearchStatistics() {
    const { ctx } = this
    const keywordList =
      await ctx.service.searchstatistics.getKeywordStatistics()
    this.success({
      keywordList
    })
  }
}

module.exports = SearchStatistics
