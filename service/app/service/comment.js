'use strict';


const { Service } = require('egg');

class Comment extends Service {
  async getCommentList (id) {
    const { ctx } = this;
    const res = await ctx.model.Comment.findAll({
      where: {
        // 文章id
        article_id: +id,
      },
    });
    return res;
  }

  // 添加评论
  async addComment (params) {
    const { ctx } = this;
    const res = await ctx.model.Comment.create(params);
    return res;
  }
}

module.exports = Comment;
