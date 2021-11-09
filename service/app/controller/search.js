'use strict';

const BaseController = require('./baseController');

class Search extends BaseController {
  // 最新排列
  async getSearchNewList () {
    const { ctx } = this;
    const data = await ctx.service.search.getSearchNewList(ctx.query);
    const count = await ctx.service.search.getSearchArticleCount(ctx.query.keyWord);

    this.success({ articleData: data, count });
  }

  // 最新排列
  async getSearchHeatList () {
    const { ctx } = this;
    const data = await ctx.service.search.getSearchHeatList(ctx.query);
    const count = await ctx.service.search.getSearchArticleCount(ctx.query.keyWord);

    this.success({ articleData: data, count });
  }

}

module.exports = Search;
