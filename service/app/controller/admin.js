
'use strict';

const BaseController = require('./baseController');

class Admin extends BaseController {

  async useJwt (username) {
    const { ctx, app } = this;

    // 使用jwt
    const token = app.jwt.sign({
      username,
    }, app.config.jwt.secret);
    // 设置session，判断用户是否登录。保存用户登录状态
    ctx.session[username] = token;
    return token;
  }

  // 在需要登录的时候，在header中携带token。 header.token
  async login () {
    const { ctx } = this;
    // const username = ctx.request.body.username;
    const res = await ctx.service.admin.login(ctx.request.body);
    if (res) {
      // 使用jwt
      const token = await this.useJwt(res.userName);
      this.success({
        token,
        isSuccess: true,
      });
    } else {
      this.success({
        isSuccess: false,
      });
    }
  }

  // 退出接口
  async logout () {
    const { ctx } = this;
    // 清空session
    // 在前端删除所有的localStorage选项。
    // localStorage.clear()
    try {
      ctx.session[ctx.username] = null;
      this.success('ok');
    } catch (error) {
      this.error('退出登录失败');
    }
  }

  // 创建文章
  async createArticle () {
    const { ctx } = this;
    await ctx.service.admin.createArticle(ctx.request.body);
    this.success('创建成功');
  }

  // 编辑文章
  async updateArticle () {
    const { ctx } = this;
    await ctx.service.admin.updateArticle(ctx.request.body);
    this.success('编辑成功');
  }

  // 删除文章
  async deleteArticle () {
    const { ctx } = this;
    // 文章id
    await ctx.service.admin.deleteArticle(ctx.request.body.id);
    this.success('文章删除成功');
  }

  // 删除评论
  async deleteComment () {
    const { ctx } = this;
    // 文章id
    await ctx.service.admin.deleteComment(ctx.request.body.id);
    this.success('评论删除成功');
  }

  // 删除回复
  async deleteResponse () {
    const { ctx } = this;
    // 文章id
    await ctx.service.admin.deleteResponse(ctx.request.body.id);
    this.success('回复删除成功');
  }

  // 留言列表
  async getMessageList () {
    const { ctx } = this;
    // 文章id
    const data = await ctx.service.admin.getMessageList(ctx.query);
    const count = await ctx.service.admin.getAllMessageCount();
    this.success({ messageData: data, count });
  }

  // 网站的总体统计
  async totalChartCount () {
    const { ctx } = this;
    const data = await ctx.service.admin.totalChartCount();
    this.success(data);
  }


  async getCommentResponseCountByArticleId () {
    const { ctx } = this;
    const commentCount = await ctx.service.admin.getCommentCountByTypeId();
    const responseCount = await ctx.service.admin.getResponseCountByTypeId();
    this.success({
      commentCount,
      responseCount,
    });
  }

}

module.exports = Admin;
