'use strict';


const { Service } = require('egg');

class Response extends Service {
  async getResponseList (id) {
    const { ctx } = this;
    const res = await ctx.model.Response.findAll({
      where: {
        // 评论id
        comment_id: +id,
      },
    });
    return res;
  }

  async addResponse (params) {
    console.log()
    const { ctx } = this;
    const res = await ctx.model.Response.create(params);
    return res;
  }
}

module.exports = Response;
