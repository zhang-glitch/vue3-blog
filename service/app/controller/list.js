'use strict';

const BaseController = require('./baseController');

class List extends BaseController {

  // 获取全部文章，最新列表
  async getAllNewArticleList () {
    const { ctx } = this;
    // 参数 pageSize ，  id。点击加载更多，pageSize加一
    const data = await ctx.service.list.getAllNewArticleList(ctx.query);
    const count = await ctx.service.list.getAllAcrticleCount(ctx.query.id);
    this.success({ articleData: data, count });
  }

  // 获取全部文章，热度列表
  async getAllHeatArticleList () {
    const { ctx } = this;
    // 参数 pageSize ，  id。点击加载更多，pageSize加一
    const data = await ctx.service.list.getAllHeatArticleList(ctx.query);
    const count = await ctx.service.list.getAllAcrticleCount(ctx.query.id);
    this.success({ articleData: data, count });
  }


  // 获取最新列表,默认是按着最新排行
  async getNewArticleList () {
    const { ctx } = this;
    // 参数 pageSize ，  id。点击加载更多，pageSize加一
    console.log('query', ctx.query);
    const data = await ctx.service.list.getNewArticleList(ctx.query);
    const count = await ctx.service.list.getArticleCount(ctx.query.id);
    this.success({ articleData: data, count });
  }

  // 热度列表
  async getHeatArticleList () {
    const { ctx } = this;
    // 参数 pageSize ，  id。点击加载更多，pageSize加一
    const data = await ctx.service.list.getHeatArticleList(ctx.query);
    const count = await ctx.service.list.getArticleCount(ctx.query.id);
    this.success({ articleData: data, count });
  }

  // 获取文章的总访问量和总文章量和总点赞数
  async getStarCount () {
    const { ctx } = this;
    const data = await ctx.service.list.getStarCount();
    this.success(data);
  }

}

module.exports = List;
