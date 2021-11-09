
'use strict';


const { Service } = require('egg');

class Search extends Service {
  // 最新排列
  async getSearchNewList (params) {
    const { ctx, app } = this;
    const { like } = app.Sequelize.Op;
    console.log('params', params);
    const res = await ctx.model.List.findAll({
      where: {
        // 模糊查询
        title: {
          [like]: `%${params.keyWord}%`,
        },
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
    console.log('res', res);
    return res;
  }

  // 热度排列
  async getSearchHeatList (params) {
    const { ctx, app } = this;
    const { like } = app.Sequelize.Op;

    const res = await ctx.model.List.findAll({
      where: {
        // 模糊查询
        title: {
          [like]: `%${params.keyWord}%`,
        },
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

  async getSearchArticleCount (keyWord) {
    const { ctx, app } = this;
    const { like } = app.Sequelize.Op;
    const { count } = await ctx.model.List.findAndCountAll({
      where: {
        // 模糊查询
        title: {
          [like]: '%' + keyWord + '%',
        },
      },
    });
    return { count };
  }
}

module.exports = Search;
