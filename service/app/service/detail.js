'use strict';


const { Service } = require('egg');

class Type extends Service {
  async getArticleById (id) {
    const { ctx } = this;
    const res = await ctx.model.Detail.findOne({
      where: {
        id: +id,
      },
    });

    // 每次访问都增加view_count的值。
    await ctx.model.List.update(
      {
        view_count: +res.view_count + 1,
      },
      {
        where: {
          id: +id,
        },
      });
    return res;
  }
}

module.exports = Type;
