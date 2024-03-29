'use strict'

const { Service } = require('egg')

class List extends Service {
  // 获取总文章数
  async getAllAcrticleCount() {
    const { ctx } = this
    const { count } = await ctx.model.List.findAndCountAll()
    return count
  }

  // 全部文章最新列表
  async getAllNewArticleList(params) {
    const { ctx, app } = this
    let _params = {}
    if (params.pageSize) {
      _params = {
        limit: +params.pageSize, // 5
        offset: (+params.pageNum - 1) * params.pageSize
      }
    }
    const res = await ctx.model.List.findAll({
      ..._params,
      attributes: { exclude: [ 'article_content' ] },
      include: [
        {
          model: app.model.Type,
          as: 'type'
        },
        {
          model: app.model.File,
          as: 'file'
        }
      ],
      order: [[ 'addTime', 'DESC' ]]
    })
    return res
  }

  // 全部文章最新列表
  async getAllHeatArticleList(params) {
    const { ctx, app } = this
    const res = await ctx.model.List.findAll({
      limit: +params.pageSize, // 5
      offset: (+params.pageNum - 1) * params.pageSize,
      attributes: { exclude: [ 'article_content' ] },
      include: [
        {
          model: app.model.Type,
          as: 'type'
        },
        {
          model: app.model.File,
          as: 'file'
        }
      ],
      order: [[ 'view_count', 'DESC' ]]
    })
    return res
  }

  // 获取分类文章总数
  async getArticleCount(id) {
    const { ctx } = this
    const { count } = await ctx.model.List.findAndCountAll({
      where: {
        type_id: +id
      }
    })
    return count
  }

  // 根据id最新列表
  async getNewArticleList(params) {
    const { ctx, app } = this
    const res = await ctx.model.List.findAll({
      where: {
        type_id: +params.id
      },
      limit: +params.pageSize, // 5
      offset: (+params.pageNum - 1) * params.pageSize,
      attributes: { exclude: [ 'article_content' ] },
      include: [
        {
          model: app.model.Type,
          as: 'type'
        },
        {
          model: app.model.File,
          as: 'file'
        }
      ],
      order: [[ 'addTime', 'DESC' ]]
    })
    return res
  }
  // 根据id热度列表
  async getHeatArticleList(params) {
    const { ctx, app } = this
    const res = await ctx.model.List.findAll({
      where: {
        type_id: +params.id
      },
      limit: +params.pageSize, // 5
      offset: (+params.pageNum - 1) * params.pageSize,
      attributes: { exclude: [ 'article_content' ] },
      include: [
        {
          model: app.model.Type,
          as: 'type'
        },
        {
          model: app.model.File,
          as: 'file'
        }
      ],
      order: [[ 'view_count', 'DESC' ]]
    })
    return res
  }

  // 获取文章的总访问量和总文章量和总点赞数
  async getStarCount() {
    const { ctx } = this
    const _allArticle = await ctx.model.List.findAndCountAll()
    const allViewCount = await ctx.model.List.sum('view_count')
    const allStar = await ctx.model.List.sum('star')
    return {
      allArticle: _allArticle.count,
      allViewCount,
      allStar
    }
  }

  // 根据文章id查找文章
  async getArticleById(id) {
    const { ctx } = this
    const res = await ctx.model.List.findByPk(id)
    return res
  }

  // 获取文章名称
  async getArticleNameById(id) {
    const { ctx } = this
    const res = await ctx.model.List.findOne({
      // 如果模板数据全部列出字段，我们只能通过exclude排除。不能通过include来指定获取字段
      attributes: { exclude: [ 'article_content', 'slogan', 'image' ] },
      where: { id }
    });
    return res
  }
}

module.exports = List
