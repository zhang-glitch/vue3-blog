'use strict';

const BaseController = require('./baseController');

class Response extends BaseController {
  async getResponseList () {
    const { ctx } = this;
    const data = await ctx.service.response.getResponseList(ctx.params.id);
    this.success(data);
  }

  // post请求
  async addResponse () {
    const { ctx } = this;
    // 查询字符串传参
    const data = await ctx.service.response.addResponse(ctx.request.body);
    if (data) {
      this.success({ data, isSuccess: true });
    } else {
      ctx.body = { isSuccess: false };
    }
  }
}

module.exports = Response;
