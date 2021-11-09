'use strict';

const BaseController = require('./baseController');

class Comment extends BaseController {
  async getCommentList () {
    const { ctx } = this;
    const data = await ctx.service.comment.getCommentList(ctx.params.id);
    this.success(data);
  }

  // post请求
  async addComment () {
    const { ctx } = this;
    // 查询字符串传参
    const data = await ctx.service.comment.addComment(ctx.request.body);
    if (data) {
      this.success({ data, isSuccess: true });
    } else {
      ctx.body = { isSuccess: false };
    }
  }

}

module.exports = Comment;
