'use strict'

const { Service } = require('egg')
const { col, fn } = require('sequelize')

class Admin extends Service {
  // 登录
  async login(params) {
    const { ctx } = this
    // 如果有则登录成功，没有将直接添加然后登录
    const res = await ctx.model.Login.findOne({
      where: {
        userName: params.username,
        password: params.password
      }
    })
    if (!res) {
      // 查找用户名
      const res1 = await ctx.model.Login.findOne({
        where: {
          userName: params.username
        }
      })
      if (!res1) {
        // 用户名没有查到才会去创建
        return await ctx.model.Login.create({
          userName: params.username,
          password: params.password,
          createTime: new Date().getTime()
        })
      }
    }
    return res
  }

  // 创建文章
  async createArticle(params) {
    const { ctx } = this
    const res = await ctx.model.List.create(params)
    return res
  }

  // 编辑文章
  async updateArticle(params) {
    // console.log('编辑文章', params)
    const { ctx } = this
    const res = await ctx.model.List.update(params, {
      where: {
        id: params.id
      }
    })
    return res
  }

  // 删除文章
  async deleteArticle(id) {
    const { ctx } = this
    const res = await ctx.model.List.destroy({
      where: {
        id
      }
    })
    return res
  }

  // 删除评论
  async deleteComment(id) {
    const { ctx } = this
    // 删除评论
    await ctx.model.Comment.destroy({
      where: {
        id
      }
    })
    // 删除留言
    await ctx.model.Response.destroy({
      where: {
        comment_id: id
      }
    })
  }
  // 删除回复
  async deleteResponse(id) {
    const { ctx } = this
    const res = await ctx.model.Response.destroy({
      where: {
        id
      }
    })
    return res
  }

  // 留言列表
  async getMessageList(params) {
    const { ctx } = this
    const res = await ctx.model.Comment.findAll({
      limit: +params.pageSize, // 5
      offset: (+params.pageNum - 1) * params.pageSize,
      order: [[ 'commentTime', 'DESC' ]]
    })
    return res
  }

  // 获取留言总数
  async getAllMessageCount() {
    const { ctx } = this
    const { count } = await ctx.model.Comment.findAndCountAll()
    return count
  }

  // 文章总体统计
  async totalChartCount() {
    const { ctx } = this
    const _articleCount = await ctx.model.List.findAndCountAll()
    const viewCount = await ctx.model.List.sum('view_count')
    const starCount = await ctx.model.List.sum('star')
    const _responseCount = await ctx.model.Response.findAndCountAll()
    const _commentCount = await ctx.model.Comment.findAndCountAll()
    const _skillArticleCount = await ctx.model.List.findAndCountAll({
      where: {
        type_id: 1
      }
    })
    const _photographyArticleCount = await ctx.model.List.findAndCountAll({
      where: {
        type_id: 2
      }
    })
    const _lifeArticleCount = await ctx.model.List.findAndCountAll({
      where: {
        type_id: 3
      }
    })
    return {
      articleCount: _articleCount.count,
      viewCount,
      starCount,
      responseCount: _responseCount.count,
      commentCount: _commentCount.count,
      skillArticleCount: _skillArticleCount.count,
      photographyArticleCount: _photographyArticleCount.count,
      lifeArticleCount: _lifeArticleCount.count
    }
  }

  // 通过类别文章分类评论数据
  // 根据文章id分组获取评论数
  async getCommentCountByTypeId() {
    const { ctx } = this
    const idArr = await ctx.model.Comment.findAll({
      attributes: [ 'type_id', [ fn('count', col('type_id')), 'commentCount' ]],
      group: 'type_id',
      raw: true
    })
    return idArr
  }
  // 根据文章id分组获取评论数
  async getResponseCountByTypeId() {
    const { ctx } = this
    const idArr = await ctx.model.Response.findAll({
      attributes: [ 'type_id', [ fn('count', col('type_id')), 'responseCount' ]],
      group: 'type_id',
      raw: true
    })
    return idArr
  }
}

module.exports = Admin
