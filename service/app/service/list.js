'use strict';


const { Service } = require('egg');

class List extends Service {

  // 获取总文章数
  async getAllAcrticleCount () {
    const { ctx } = this;
    const { count } = await ctx.model.List.findAndCountAll();
    return count;
  }

  // 全部文章最新列表
  async getAllNewArticleList (params) {
    const { ctx, app } = this;
    let _params = {};
    if (params.pageSize) {
      _params = {
        limit: +params.pageSize, // 5
        offset: (+params.pageNum - 1) * params.pageSize,
      };
    }
    const res = await ctx.model.List.findAll({
      ..._params,
      include: [
        {
          model: app.model.Type,
          as: 'type',
        },
      ],
      order: [
        ['addTime', 'DESC'],
      ],
    });
    return res;
  }

  // 全部文章最新列表
  async getAllHeatArticleList (params) {
    const { ctx, app } = this;
    const res = await ctx.model.List.findAll({
      limit: +params.pageSize, // 5
      offset: (+params.pageNum - 1) * params.pageSize,
      include: [
        {
          model: app.model.Type,
          as: 'type',
        },
      ],
      order: [
        ['view_count', 'DESC'],
      ],
    });
    return res;
  }

  // 获取分类文章总数
  async getArticleCount (id) {
    const { ctx } = this;
    const { count } = await ctx.model.List.findAndCountAll({
      where: {
        type_id: +id,
      },
    });
    return count;
  }

  // 根据id最新列表
  async getNewArticleList (params) {
    const { ctx, app } = this;
    const res = await ctx.model.List.findAll({
      where: {
        type_id: +params.id,
      },
      limit: +params.pageSize, // 5
      offset: (+params.pageNum - 1) * params.pageSize,
      include: [
        {
          model: app.model.Type,
          as: 'type',
        },
      ],
      order: [
        ['addTime', 'DESC'],
      ],
    });
    return res;
  }
  // 根据id热度列表
  async getHeatArticleList (params) {
    const { ctx, app } = this;
    const res = await ctx.model.List.findAll({
      where: {
        type_id: +params.id,
      },
      limit: +params.pageSize, // 5
      offset: (+params.pageNum - 1) * params.pageSize,
      include: [
        {
          model: app.model.Type,
          as: 'type',
        },
      ],
      order: [
        ['view_count', 'DESC'],
      ],
    });
    return res;
  }

  // 获取文章的总访问量和总文章量和总点赞数
  async getStarCount () {
    const { ctx } = this;
    const _allArticle = await ctx.model.List.findAndCountAll();
    const allViewCount = await ctx.model.List.sum('view_count');
    const allStar = await ctx.model.List.sum('star');
    return {
      allArticle: _allArticle.count,
      allViewCount,
      allStar,
    };
  }
}

module.exports = List;
