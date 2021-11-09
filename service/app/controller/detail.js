'use strict';

const BaseController = require('./baseController');

class Detail extends BaseController {
  async getArticleById () {
    const { ctx } = this;
    const data = await ctx.service.detail.getArticleById(ctx.params.id);
    this.success(data);
  }

}

module.exports = Detail;
